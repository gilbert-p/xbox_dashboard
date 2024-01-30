import { useState, useEffect, useRef, useCallback } from 'react';
import useSound from 'use-sound';


/* A wrapper function to assist in separating audio files into separate categories */
export default function useAudioSound(audio_file, sprite) {

    const audioRef = useRef(null);

    const [play, exposedData] = useSound(audio_file, {sprite
    });

    return {play};

}