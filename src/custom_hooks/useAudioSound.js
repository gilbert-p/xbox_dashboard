import { useRef } from 'react';
import useSound from 'use-sound';


/* A wrapper function to assist in separating audio files into separate categories */
/* Reference use-sound library for more details -> https://github.com/joshwcomeau/use-sound */
export default function useAudioSound(audio_file, sprite) {

    const audioRef = useRef(null);

    const [play, exposedData] = useSound(audio_file, {sprite, volume:0.5});

    audioRef.current = {play, exposedData};


    return audioRef;

}