'use client';
import { useEffect, useRef, useState } from 'react';
import { getSocket } from '@/lib/socket';
import type { Vehicle } from '@/lib/types';

export function usePlaybackController(onTick?: (updates: Vehicle[]) => void) {
  const socket = getSocket();
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1); // 1x, 2x, 5x, 10x
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Keep latest onTick callback reference
  const onTickRef = useRef(onTick);
  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  // Helper to clear interval
  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup any previous interval before starting new one
    clearTimer();

    if (isPlaying) {
      const ms = 2000 / speed;
      console.log(`▶️ Starting playback at ${speed}x (${ms}ms interval)`);

      intervalRef.current = setInterval(() => {
        socket.timeout(1000).emit('request_tick', null, (err: any, updates: Vehicle[]) => {
          if (err) {
            console.warn('⏳ Tick timeout or backend not responding');
            return;
          }
          if (onTickRef.current) onTickRef.current(updates);
        });
      }, ms);
    } else {
      console.log('⏸ Playback paused, clearing interval');
    }

    return clearTimer;
  }, [isPlaying, speed, socket]);

  return {
    isPlaying,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    speed,
    setSpeed,
  };
}
