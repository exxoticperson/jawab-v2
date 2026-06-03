import {Easing, interpolate} from 'remotion';

export const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

export const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: easeOut});

export const out = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [1, 0], {...clamp, easing: easeInOut});

export const between = (
  frame: number,
  start: number,
  end: number,
  fadeFrames = 10,
) =>
  fade(frame, start, start + fadeFrames) * out(frame, end - fadeFrames, end);

export const rise = (frame: number, start: number, end: number, distance = 42) =>
  interpolate(frame, [start, end], [distance, 0], {
    ...clamp,
    easing: easeOut,
  });

export const scaleIn = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0.96, 1], {
    ...clamp,
    easing: easeOut,
  });
