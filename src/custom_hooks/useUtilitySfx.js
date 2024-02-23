import { useRef } from 'react';
import useSound from 'use-sound';

import blade_sound_sfx from "../assets/audio/utility_sfx.mp3";


/* Reference use-sound library for more details -> https://github.com/joshwcomeau/use-sound */
export default function useUtilitySfx() {

    const utilitySfxRef = useRef(null);

    const utilitySfxSprite = {
        std_button_press:[0,500],
        open_guide_sfx: [600, 500],
        close_guide_sfx: [1200, 500],
    }

    const [play, exposedData] = useSound(blade_sound_sfx, {sprite: utilitySfxSprite, volume:0.5});

    function playButtonSound() {
        play({id: 'std_button_press'});
    }

    utilitySfxRef.current = {playButtonSound};


    return utilitySfxRef;

}