import type {CSSProperties} from 'react';

export const palette = {
  black: '#050506',
  graphite: '#0C0C0D',
  panel: 'rgba(12, 12, 13, 0.72)',
  line: 'rgba(255, 255, 255, 0.14)',
  text: '#F7F4EC',
  muted: '#A6A19A',
  dim: '#6D6861',
  gold: '#D8B35F',
  goldSoft: '#F0D99A',
  red: '#FF453A',
  green: '#25D366',
  clinical: '#EAF1F2',
  blue: '#8FB8C7',
};

export const font = {
  display:
    '"SF Pro Display", "Inter", "Helvetica Neue", Arial, "Segoe UI", sans-serif',
  mono:
    '"SF Mono", "Cascadia Mono", "Roboto Mono", Consolas, "Courier New", monospace',
  arabic: '"Tajawal", "Segoe UI", Arial, sans-serif',
};

export const fill: CSSProperties = {
  width: '100%',
  height: '100%',
};

export const safeText: CSSProperties = {
  position: 'absolute',
  left: 86,
  right: 118,
  top: 210,
  zIndex: 10,
};

export const labelStyle: CSSProperties = {
  fontFamily: font.mono,
  color: palette.gold,
  fontSize: 25,
  letterSpacing: 3.2,
  textTransform: 'uppercase',
};

export const h1: CSSProperties = {
  fontFamily: font.display,
  fontWeight: 760,
  color: palette.text,
  fontSize: 92,
  lineHeight: 0.95,
  letterSpacing: 0,
  margin: 0,
};

export const body: CSSProperties = {
  fontFamily: font.display,
  color: palette.muted,
  fontSize: 35,
  lineHeight: 1.22,
  margin: 0,
};
