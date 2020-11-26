---
layout: post
title: "Porting a C game to WebAssembly"
date: 2020-11-26 12:24
categories: code
---

Have you got an SDL game you want to port to WebAssembly? Maybe you even want touch controls
for mobile users? It's not too bad, but I'm documenting it here because a there are a few
curveballs.

The initial stuff:

You'll need to wrap your main loop (the one that is probably inside of a `while (!game.done)`, or something similar)
inside of `emscripten_set_main_loop`, mine looks like this:

```c
#ifdef __EMSCRIPTEN__
                emscripten_set_main_loop(main_game_loop, 0, 1);
#endif

#ifndef __EMSCRIPTEN__
                while (!game.done) {
                    main_game_loop();
                }
#endif
```

At the top of that file you'll need to import `emscripten.h` too:

```c
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif
```

That's the easy part. The next part may not be necessary for all audio formats,
but it is the intended order of SDL calls. Make sure that `Mix_OpenAudio` is
called _before_ `Mix_Init`.

The **bad** way:

```c
void load_and_play_music(Game* game)
{
    int flags = MIX_INIT_OGG;
    int initted = Mix_Init(flags);
    if ((initted & flags) != flags) {
        printf("Mix_Init: Failed to init required ogg support!\n");
        printf("Mix_Init: %s\n", Mix_GetError());
        // We can still continue without audio. :^(
    } else {

        if (Mix_OpenAudio(44100, MIX_DEFAULT_FORMAT, 2, 2048) == 0) {
            Mix_VolumeMusic(MUSIC_VOLUME);
            game->music = Mix_LoadMUS(MUSIC_INTRO_FILE);
            if (!Mix_PlayingMusic()) {
                Mix_PlayMusic(game->music, -1);
            }
        } else {
            SDL_LogError(SDL_LOG_CATEGORY_ERROR, "Error initializing SDL_mixer: %s\n", Mix_GetError());
            // No need to exit, we just play without sound.
        }
    }
}
```

The **good** way:

```c
void load_and_play_music(Game* game)
{

    if (Mix_OpenAudio(44100, MIX_DEFAULT_FORMAT, 2, 2048) == 0) {
        int flags = MIX_INIT_OGG;
        int initted = Mix_Init(flags);
        if ((initted & flags) != flags) {
            printf("Mix_Init: Failed to init required ogg support!\n");
            printf("Mix_Init: %s\n", Mix_GetError());
            // We can still continue without audio. :^(
        } else {
            Mix_VolumeMusic(MUSIC_VOLUME);
            game->music = Mix_LoadMUS(MUSIC_INTRO_FILE);
            if (!Mix_PlayingMusic()) {
                Mix_PlayMusic(game->music, -1);
            }
        }
    } else {
        SDL_LogError(SDL_LOG_CATEGORY_ERROR, "Error initializing SDL_mixer: %s\n", Mix_GetError());
        // No need to exit, we just play without sound.
    }
}
```

This is counter to how you'll be used to initializing most SDL libraries. If you run `Mix_Init` first,
you will get an `OGG Support Not Available` error.

And the last part (minus getting the right compile flags), is adding actual touch controls. You can
check [Basque](https://github.com/ryanpcmcquen/basque) directly for the full implementation
here, but here's the basic JS and HTML I'm using for 4 arrow keys:

```html

        <div class="controller">
            <button
                class="controls"
                style="width: 70%"
                data-key="ArrowUp"
                data-which="38"
            >
                ⇧
            </button>

            <button
                class="controls"
                style="width: 35%"
                data-key="ArrowLeft"
                data-which="37"
            >
                ⇦
            </button>
            <button
                class="controls"
                style="width: 35%"
                data-key="ArrowRight"
                data-which="39"
            >
                ⇨
            </button>

            <button
                class="controls"
                style="width: 70%"
                data-key="ArrowDown"
                data-which="40"
            >
                ⇩
            </button>
        </div>
```

```js

            // Thanks to @juj for some hints on this issue as to how to get this working:
            // https://github.com/emscripten-core/emscripten/issues/3614#issuecomment-142032269
            var create_and_fire_event = function (event, type) {
                var control_event = new Event(type, { bubbles: true });

                control_event.code = event.target.dataset.key;
                control_event.key = event.target.dataset.key;

                control_event.keyCode = event.target.dataset.which;
                control_event.which = event.target.dataset.which;

                Module.canvas.dispatchEvent(control_event);
            };

            Module.postRun.push(function () {
                var transform_multiplier = 0.75;
                var minimum_transform_multiplier = 0.6;
                while ((Module.canvas.width * transform_multiplier) > window.innerWidth && transform_multiplier > minimum_transform_multiplier) {
                    transform_multiplier = transform_multiplier - 0.05;
                }
                Module.canvas.parentNode.style.transform = `scale(${transform_multiplier})`;
                var margin_removal = (window.innerWidth * (transform_multiplier > minimum_transform_multiplier ? transform_multiplier - 0.1 : transform_multiplier)) / 2;
                Module.canvas.parentNode.style.margin = `-${margin_removal * 0.15}px -${margin_removal}px`;
                Array.from(document.querySelectorAll('.controls')).forEach(
                    function (control) {
                        if ('ontouchstart' in document.documentElement) {
                            // Mobile:
                            control.addEventListener('touchstart', function (
                                event
                            ) {
                                create_and_fire_event(event, 'keydown');
                            });
                            control.addEventListener('touchend', function (
                                event
                            ) {
                                create_and_fire_event(event, 'keyup');
                            });
                        } else {
                            // Desktop:
                            control.addEventListener('click', function (event) {
                                create_and_fire_event(event, 'keydown');
                                window.setTimeout(function () {
                                    create_and_fire_event(event, 'keyup');
                                }, 100);
                            });
                        }
                    }
                );
            });
```

There's some fancy canvas resizing in there to make things look OK on a variety of screens, but the key takeaways
are:

- Place everything in `Module.postRun`.
- Dispatch events to `Module.canvas`.
- Use a standard `Event` type, `KeyboardEvent` never seemed to work in my testing.

Lastly, here's my `make` command that I use for a release build:

```make
wasm: source/*
	$(EMCC) --shell-file wasm/$(TITLE)_shell.html -O3 --closure 1 -s USE_SDL=2 -s USE_SDL_IMAGE=2 -s SDL2_IMAGE_FORMATS='["png"]' -s USE_SDL_MIXER=2 -s SDL2_MIXER_FORMATS='["ogg"]' -s USE_SDL_TTF=2 -s ALLOW_MEMORY_GROWTH=1 -s INITIAL_MEMORY=$(WASM_TOTAL_MEMORY) -s TOTAL_STACK=$(WASM_STACK_MEMORY) -s WASM=2 --preload-file assets $(FLAGS) -I $${HOME}/code/emsdk/upstream/emscripten/system/include/ -I $${HOME}/work/$(TITLE)/$(TITLE)/emsdk/upstream/emscripten/system/include/ -I /builds/ryanpcmcquen/$(TITLE)/emsdk/upstream/emscripten/system/include/ source/$(TITLE).c -o wasm/$(TITLE).html
```

Happy hacking!
