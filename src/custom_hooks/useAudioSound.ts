import { useRef } from 'react';
import { Howl } from 'howler';
//@ts-ignore
import useSound from 'use-sound';

interface AudioRef {
  play: (options?: { id?: string }) => void;
  stop: (id?: number) => void;
  pause: (id?: number) => void;
  duration: number | null;
  sound: Howl | null;
}

/* Reference use-sound library for more details -> https://github.com/joshwcomeau/use-sound */
export default function useAudioSound(audio_file: string, sprite: any) {
  const audioRef = useRef<AudioRef | null>(null);

  const [play, { sound, stop, pause, duration }] = useSound(audio_file, { sprite, volume: 0.5 });

  audioRef.current = { play, stop, pause, duration, sound };

  return audioRef;
}