import type {CSSProperties, ReactNode} from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {body, fill, font, h1, labelStyle, palette, safeText} from './style';
import {between, clamp, fade, rise, scaleIn} from './motion';

type CinematicImageProps = {
  src: string;
  start?: number;
  end?: number;
  zoom?: number;
  x?: number;
  y?: number;
  opacity?: number;
  darken?: number;
};

export const CinematicImage = ({
  src,
  start = 0,
  end,
  zoom = 1.08,
  x = 0,
  y = 0,
  opacity = 1,
  darken = 0.44,
}: CinematicImageProps) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const last = end ?? durationInFrames;
  const progress = interpolate(frame, [start, last], [0, 1], clamp);
  const imageScale = interpolate(progress, [0, 1], [zoom, zoom + 0.065]);
  const imageX = interpolate(progress, [0, 1], [x, x - 32]);
  const imageY = interpolate(progress, [0, 1], [y, y - 22]);

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, opacity}}>
      <div
        style={{
          ...fill,
          transform: `translate(${imageX}px, ${imageY}px) scale(${imageScale})`,
          transformOrigin: 'center',
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <AbsoluteFill
        style={{
          background:
            `linear-gradient(180deg, rgba(0,0,0,0.62), rgba(0,0,0,${darken}) 42%, rgba(0,0,0,0.86)), ` +
            'radial-gradient(circle at 70% 18%, rgba(216,179,95,0.2), transparent 34%)',
        }}
      />
      <Noise />
    </AbsoluteFill>
  );
};

export const Noise = () => {
  const frame = useCurrentFrame();
  const opacity = frame % 2 === 0 ? 0.075 : 0.045;
  return (
    <AbsoluteFill
      style={{
        opacity,
        mixBlendMode: 'screen',
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)',
      }}
    />
  );
};

export const ScanLines = ({opacity = 0.22}: {opacity?: number}) => (
  <AbsoluteFill
    style={{
      opacity,
      backgroundImage:
        'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
      backgroundSize: '72px 72px',
      maskImage: 'radial-gradient(circle at 50% 38%, black, transparent 74%)',
    }}
  />
);

type TitleBlockProps = {
  label?: string;
  title: string;
  subtitle?: string;
  from: number;
  until: number;
  gold?: string;
  compact?: boolean;
  style?: CSSProperties;
};

export const TitleBlock = ({
  label,
  title,
  subtitle,
  from,
  until,
  gold,
  compact = false,
  style,
}: TitleBlockProps) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 12);
  const y = rise(frame, from, from + 18, compact ? 22 : 56);
  const scale = scaleIn(frame, from, from + 18);

  const renderedTitle = gold
    ? title.split(gold).flatMap((part, index, arr) =>
        index < arr.length - 1
          ? [
              part,
              <span key={`${gold}-${index}`} style={{color: palette.goldSoft}}>
                {gold}
              </span>,
            ]
          : [part],
      )
    : title;

  return (
    <div
      style={{
        ...safeText,
        ...style,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      {label ? <div style={labelStyle}>{label}</div> : null}
      <h1
        style={{
          ...h1,
          fontSize: compact ? 66 : h1.fontSize,
          maxWidth: compact ? 790 : 900,
          marginTop: label ? 22 : 0,
        }}
      >
        {renderedTitle}
      </h1>
      {subtitle ? (
        <p
          style={{
            ...body,
            maxWidth: 760,
            marginTop: 32,
            color: compact ? palette.clinical : palette.muted,
          }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
};

export const JawabLockup = ({from = 0, until}: {from?: number; until: number}) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 12);
  const pulse = interpolate(Math.sin(frame / 9), [-1, 1], [0.8, 1.06]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 76,
        top: 82,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        opacity,
        zIndex: 30,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          border: `2px solid ${palette.gold}`,
          borderRadius: 28,
          boxShadow: `0 0 ${24 * pulse}px rgba(216,179,95,0.38)`,
        }}
      />
      <div>
        <div
          style={{
            fontFamily: font.display,
            color: palette.text,
            fontSize: 35,
            fontWeight: 650,
          }}
        >
          Jawab
        </div>
        <div
          style={{
            fontFamily: font.arabic,
            color: palette.gold,
            fontSize: 25,
            marginTop: -5,
          }}
        >
          جواب
        </div>
      </div>
    </div>
  );
};

type MetricProps = {
  label: string;
  value: string;
  from: number;
  until: number;
  top: number;
  tone?: 'gold' | 'red' | 'green' | 'white';
};

export const MetricCard = ({
  label,
  value,
  from,
  until,
  top,
  tone = 'gold',
}: MetricProps) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 10);
  const y = rise(frame, from, from + 14, 28);
  const color =
    tone === 'red'
      ? palette.red
      : tone === 'green'
        ? palette.green
        : tone === 'white'
          ? palette.text
          : palette.goldSoft;

  return (
    <div
      style={{
        position: 'absolute',
        left: 86,
        right: 118,
        top,
        padding: '30px 34px',
        border: `1px solid ${palette.line}`,
        background: palette.panel,
        backdropFilter: 'blur(20px)',
        borderRadius: 28,
        opacity,
        transform: `translateY(${y}px)`,
        zIndex: 20,
      }}
    >
      <div style={{fontFamily: font.mono, color: palette.muted, fontSize: 23}}>
        {label}
      </div>
      <div
        style={{
          fontFamily: font.display,
          color,
          fontSize: 74,
          fontWeight: 760,
          lineHeight: 1,
          marginTop: 12,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
    </div>
  );
};

export const SystemLine = ({
  from,
  until,
  children,
  top,
}: {
  from: number;
  until: number;
  children: ReactNode;
  top: number;
}) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 8);
  const width = interpolate(frame, [from, from + 20], [0, 1], {
    ...clamp,
    easing: (t) => t,
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 110,
        right: 140,
        top,
        opacity,
        zIndex: 22,
      }}
    >
      <div
        style={{
          height: 1,
          width: `${width * 100}%`,
          background: `linear-gradient(90deg, ${palette.gold}, rgba(255,255,255,0.1))`,
          marginBottom: 18,
        }}
      />
      <div
        style={{
          fontFamily: font.display,
          color: palette.text,
          fontSize: 34,
          lineHeight: 1.18,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const SoundBed = ({duration = 900}: {duration?: number}) => (
  <>
    <Audio src={staticFile('assets/jawab-tension-bed.wav')} volume={0.5} />
    {[0, 72, 132, 204, 288, 390, 510, 636, duration - 66].map((f) => (
      <Sequence key={`impact-${f}`} from={f}>
        <Audio src={staticFile('assets/impact-low.wav')} volume={0.45} />
      </Sequence>
    ))}
    {[34, 96, 168, 238, 314, 466, 588].map((f) => (
      <Sequence key={`tick-${f}`} from={f}>
        <Audio src={staticFile('assets/tick-high.wav')} volume={0.35} />
      </Sequence>
    ))}
  </>
);

export const Flash = ({frames}: {frames: number[]}) => {
  const frame = useCurrentFrame();
  const strength = frames.reduce((acc, f) => {
    const local = interpolate(Math.abs(frame - f), [0, 8], [0.42, 0], clamp);
    return Math.max(acc, local);
  }, 0);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        opacity: strength,
        background:
          'radial-gradient(circle at 50% 42%, rgba(255,255,255,0.9), rgba(216,179,95,0.28) 24%, transparent 56%)',
        mixBlendMode: 'screen',
        zIndex: 50,
      }}
    />
  );
};

export const FooterCTA = ({
  from,
  until,
  text,
}: {
  from: number;
  until: number;
  text: string;
}) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 10);
  return (
    <div
      style={{
        position: 'absolute',
        left: 86,
        right: 160,
        bottom: 278,
        opacity,
        zIndex: 40,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          border: `1px solid rgba(216,179,95,0.45)`,
          background: 'rgba(6,6,7,0.72)',
          borderRadius: 999,
          padding: '24px 31px',
          color: palette.goldSoft,
          fontFamily: font.display,
          fontSize: 31,
          fontWeight: 650,
          boxShadow: '0 0 34px rgba(216,179,95,0.16)',
        }}
      >
        {text}
      </div>
    </div>
  );
};
