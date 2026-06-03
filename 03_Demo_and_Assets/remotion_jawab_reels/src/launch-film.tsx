import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Flash, ScanLines} from './components';
import {between, clamp, fade} from './motion';
import {font, palette} from './style';

const S = 30;

const layer = (zIndex: number) => ({position: 'absolute' as const, zIndex});

const t = (seconds: number) => seconds * S;

const sceneOpacity = (frame: number, start: number, end: number, feather = 12) =>
  between(frame, start, end, feather);

const Background = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, t(60)], [0, -95], clamp);
  const glow = interpolate(Math.sin(frame / 27), [-1, 1], [0.28, 0.52]);
  return (
    <AbsoluteFill style={{background: '#030303', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 70% 10%, rgba(216,179,95,0.12), transparent 36%), radial-gradient(circle at 38% 52%, rgba(143,184,199,0.08), transparent 42%), linear-gradient(180deg, #050506, #020202)',
        }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={`wall-${i}`}
          style={{
            ...layer(0),
            top: -80,
            left: 80 + i * 230 + drift * (0.1 + i * 0.04),
            width: 1,
            height: 1320,
            transform: `skewX(${-10 + i * 2}deg)`,
            background:
              'linear-gradient(180deg, transparent, rgba(255,255,255,0.09), transparent)',
            opacity: 0.28,
          }}
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={`floor-${i}`}
          style={{
            ...layer(0),
            left: -160 + i * 210,
            top: 1320 + i * 68,
            width: 1120,
            height: 2,
            transform: `rotate(${-11 - i * 4}deg)`,
            background: `linear-gradient(90deg, transparent, rgba(216,179,95,${glow}), transparent)`,
            boxShadow: '0 0 34px rgba(216,179,95,0.18)',
          }}
        />
      ))}
      <div
        style={{
          ...layer(0),
          left: 70,
          right: 70,
          bottom: 170,
          height: 360,
          transform: 'perspective(900px) rotateX(66deg)',
          transformOrigin: 'bottom',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.045), rgba(0,0,0,0.6))',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      />
      <ScanLines opacity={0.16} />
    </AbsoluteFill>
  );
};

const MarbleShard = ({
  top,
  left,
  scale,
  rotate,
  from,
  until,
}: {
  top: number;
  left: number;
  scale: number;
  rotate: number;
  from: number;
  until: number;
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, from, until);
  const y = interpolate(frame, [from, until], [0, -42], clamp);
  return (
    <div
      style={{
        ...layer(2),
        left,
        top: top + y,
        width: 420 * scale,
        height: 260 * scale,
        opacity,
        transform: `rotate(${rotate}deg)`,
        clipPath: 'polygon(7% 22%, 68% 0%, 100% 28%, 78% 100%, 18% 82%, 0% 48%)',
        background:
          'linear-gradient(135deg, #343330, #101010 42%, #4A4842 58%, #0A0A0A), repeating-linear-gradient(118deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 36px)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.62), inset 0 0 0 1px rgba(255,255,255,0.08)',
      }}
    />
  );
};

const GoldLoop = ({from, until}: {from: number; until: number}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, from, until);
  const pulse = interpolate(Math.sin(frame / 12), [-1, 1], [0.78, 1.08]);
  return (
    <div
      style={{
        ...layer(12),
        left: 88,
        bottom: 230,
        width: 230,
        height: 230,
        opacity,
        transform: `scale(${pulse})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid rgba(216,179,95,0.45)',
          borderRadius: '50%',
          boxShadow: '0 0 40px rgba(216,179,95,0.16)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 58,
          top: 64,
          width: 78,
          height: 64,
          border: `3px solid ${palette.gold}`,
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 108,
          top: 64,
          width: 78,
          height: 64,
          border: `3px solid ${palette.gold}`,
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 83,
          top: 126,
          color: palette.goldSoft,
          fontFamily: font.display,
          fontSize: 22,
        }}
      >
        Never miss.
      </div>
    </div>
  );
};

const JawabWordmark = ({from, until, large = false}: {from: number; until: number; large?: boolean}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, from, until);
  const y = interpolate(frame, [from, from + 24], [40, 0], clamp);
  return (
    <div
      style={{
        ...layer(18),
        left: large ? 95 : 76,
        top: large ? 305 : 82,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontFamily: font.display,
          color: palette.text,
          fontSize: large ? 78 : 36,
          letterSpacing: large ? 18 : 0,
          fontWeight: large ? 340 : 720,
        }}
      >
        Jawab
      </div>
      <div
        style={{
          marginTop: large ? 0 : -6,
          fontFamily: font.arabic,
          color: palette.text,
          fontSize: large ? 58 : 26,
          letterSpacing: large ? 14 : 0,
        }}
      >
        جواب
      </div>
      {large ? (
        <div style={{marginTop: 55, fontFamily: font.display, color: palette.gold, fontSize: 31}}>
          AI-Powered Conversations.
          <br />
          <span style={{color: palette.text}}>Real Patient Results.</span>
        </div>
      ) : null}
    </div>
  );
};

const MiniChart = ({type = 'line'}: {type?: 'line' | 'bars'}) => {
  if (type === 'bars') {
    return (
      <div style={{display: 'flex', alignItems: 'end', gap: 14, height: 94, marginTop: 22}}>
        {[34, 58, 43, 63, 78, 105].map((h, i) => (
          <div
            key={i}
            style={{
              width: 18,
              height: h,
              background: `linear-gradient(180deg, ${palette.goldSoft}, rgba(216,179,95,0.12))`,
              opacity: 0.55 + i * 0.06,
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <svg width="260" height="92" viewBox="0 0 260 92" style={{marginTop: 24, overflow: 'visible'}}>
      <path
        d="M4 64 C34 42, 48 68, 74 51 S124 78, 154 54 S204 36, 254 22"
        fill="none"
        stroke={palette.gold}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.78"
      />
      <path d="M4 88 L254 88" stroke="rgba(255,255,255,0.08)" />
    </svg>
  );
};

const MetricPanel = ({
  from,
  until,
  top,
  left,
  rotate,
  label,
  value,
  sub,
  type,
}: {
  from: number;
  until: number;
  top: number;
  left: number;
  rotate: number;
  label: string;
  value: string;
  sub: string;
  type?: 'line' | 'bars';
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, from, until);
  const y = interpolate(frame, [from, from + 24], [70, 0], clamp);
  return (
    <div
      style={{
        ...layer(14),
        left,
        top: top + y,
        width: 330,
        minHeight: 245,
        padding: 28,
        borderRadius: 30,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.018))',
        boxShadow: '0 35px 85px rgba(0,0,0,0.42)',
        opacity,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div style={{fontFamily: font.display, color: palette.text, fontSize: 22}}>{label}</div>
      <div
        style={{
          fontFamily: font.display,
          color: palette.goldSoft,
          fontSize: 56,
          fontWeight: 620,
          marginTop: 12,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
      <div style={{fontFamily: font.display, color: palette.muted, fontSize: 18}}>{sub}</div>
      <MiniChart type={type} />
    </div>
  );
};

const PhoneHero = ({from, until, mode = 'inbox'}: {from: number; until: number; mode?: 'inbox' | 'handoff' | 'report'}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, from, until);
  const y = interpolate(frame, [from, from + 30], [110, 0], clamp);
  const rot = interpolate(frame, [from, until], [-4.5, -1.5], clamp);
  const rows =
    mode === 'handoff'
      ? [
          ['Name', 'Mariam Khaled'],
          ['Service', 'Veneers consultation'],
          ['Urgency', 'This week'],
          ['Language', 'Arabic'],
          ['Next action', 'Call after 5 PM'],
        ]
      : mode === 'report'
        ? [
            ['Detected', '12 inquiries'],
            ['Recovered', '8 conversations'],
            ['Qualified', '5 leads routed'],
            ['Booked', '3 consults'],
            ['At-risk value', 'AED 45,000'],
          ]
        : [
            ['مريم خالد', 'مرحبا، هل يوجد وقت اليوم للحجز؟'],
            ['Ahmed Hassan', 'I need cleaning + whitening.'],
            ['سارة علي', 'كم تكلفة ابتسامة هوليوود؟'],
            ['Fatima M.', 'Confirmed. Thank you.'],
          ];
  return (
    <div
      style={{
        ...layer(16),
        right: mode === 'inbox' ? 92 : mode === 'handoff' ? -28 : 18,
        top: (mode === 'inbox' ? 210 : mode === 'handoff' ? 490 : 360) + y,
        width: 462,
        height: 930,
        borderRadius: 74,
        border: '1px solid rgba(255,255,255,0.18)',
        background: '#050506',
        boxShadow: '0 60px 150px rgba(0,0,0,0.72), inset 0 0 0 9px rgba(255,255,255,0.025)',
        opacity,
        transform: `rotate(${rot}deg) scale(${mode === 'handoff' ? 0.82 : mode === 'report' ? 0.9 : 1})`,
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'absolute', left: 153, top: 26, width: 158, height: 38, borderRadius: 25, background: '#000'}} />
      <div style={{padding: '92px 36px 0'}}>
        <div style={{fontFamily: font.display, color: palette.text, fontSize: 36, fontWeight: 650}}>
          {mode === 'inbox' ? 'Conversations' : mode === 'handoff' ? 'Staff Handoff' : 'Weekly Intelligence'}
        </div>
        <div style={{height: 1, background: 'rgba(255,255,255,0.1)', margin: '24px 0'}} />
        {rows.map((row, i) => {
          const rowOpacity = fade(frame, from + 18 + i * 8, from + 30 + i * 8);
          return (
            <div
              key={`${row[0]}-${i}`}
              style={{
                opacity: rowOpacity,
                marginBottom: 16,
                padding: mode === 'inbox' ? '18px 20px' : '16px 18px',
                minHeight: mode === 'inbox' ? 82 : 62,
                borderRadius: 22,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.022))',
                border: '1px solid rgba(255,255,255,0.055)',
                fontFamily: font.display,
              }}
            >
              <div style={{color: mode === 'inbox' ? palette.text : palette.goldSoft, fontSize: mode === 'inbox' ? 22 : 20, fontWeight: 620}}>
                {row[0]}
              </div>
              <div style={{color: palette.muted, fontSize: mode === 'inbox' ? 20 : 22, marginTop: 6, lineHeight: 1.16}}>
                {row[1]}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 110,
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.86))',
        }}
      />
    </div>
  );
};

const QuotePanel = ({from, until}: {from: number; until: number}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, from, until);
  const y = interpolate(frame, [from, from + 20], [52, 0], clamp);
  return (
    <div
      style={{
        ...layer(15),
        right: 76,
        top: 132 + y,
        width: 360,
        padding: 34,
        borderRadius: 30,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.035)',
        opacity,
        transform: 'rotate(6deg)',
      }}
    >
      <div style={{fontFamily: font.display, color: palette.goldSoft, fontSize: 28, lineHeight: 1.25}}>
        Every conversation is an opportunity.
        <br />
        We make sure you never miss one.
      </div>
    </div>
  );
};

const Headline = ({
  from,
  until,
  eyebrow,
  title,
  body,
  gold,
  top = 240,
}: {
  from: number;
  until: number;
  eyebrow?: string;
  title: string;
  body?: string;
  gold?: string;
  top?: number;
}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, from, until);
  const y = interpolate(frame, [from, from + 22], [54, 0], clamp);
  const parts = gold
    ? title.split(gold).flatMap((part, i, arr) =>
        i < arr.length - 1
          ? [
              part,
              <span key={`${gold}-${i}`} style={{color: palette.goldSoft}}>
                {gold}
              </span>,
            ]
          : [part],
      )
    : title;
  return (
    <div
      style={{
        ...layer(30),
        left: 76,
        right: 98,
        top,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {eyebrow ? (
        <div
          style={{
            fontFamily: font.mono,
            color: palette.gold,
            fontSize: 22,
            letterSpacing: 3.2,
            textTransform: 'uppercase',
            marginBottom: 22,
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <div
        style={{
          fontFamily: font.display,
          color: palette.text,
          fontSize: 72,
          lineHeight: 0.96,
          fontWeight: 780,
          maxWidth: 820,
        }}
      >
        {parts}
      </div>
      {body ? (
        <div
          style={{
            marginTop: 28,
            fontFamily: font.display,
            color: palette.muted,
            fontSize: 32,
            lineHeight: 1.22,
            maxWidth: 760,
          }}
        >
          {body}
        </div>
      ) : null}
    </div>
  );
};

const ProcessRail = ({from, until}: {from: number; until: number}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, from, until);
  const steps = [
    ['01', 'Detect', 'missed call, slow WhatsApp, unread DM'],
    ['02', 'Recover', 'instant Arabic/English follow-up'],
    ['03', 'Qualify', 'service, urgency, language, callback time'],
    ['04', 'Handoff', 'staff receives the next action'],
  ];
  return (
    <div style={{...layer(25), left: 80, right: 80, top: 690, opacity}}>
      {steps.map((step, i) => {
        const rowOpacity = fade(frame, from + i * 12, from + 16 + i * 12);
        return (
          <div
            key={step[1]}
            style={{
              opacity: rowOpacity,
              display: 'grid',
              gridTemplateColumns: '76px 180px 1fr',
              alignItems: 'center',
              gap: 20,
              padding: '22px 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              fontFamily: font.display,
            }}
          >
            <div style={{color: palette.gold, fontFamily: font.mono, fontSize: 26}}>{step[0]}</div>
            <div style={{color: palette.text, fontSize: 34, fontWeight: 720}}>{step[1]}</div>
            <div style={{color: palette.muted, fontSize: 27}}>{step[2]}</div>
          </div>
        );
      })}
    </div>
  );
};

const Pen = ({from, until}: {from: number; until: number}) => {
  const frame = useCurrentFrame();
  const opacity = sceneOpacity(frame, from, until);
  const x = interpolate(frame, [from, until], [0, 38], clamp);
  return (
    <div
      style={{
        ...layer(9),
        right: 16 + x,
        bottom: 175,
        width: 360,
        height: 26,
        opacity,
        borderRadius: 16,
        transform: 'rotate(-18deg)',
        background: 'linear-gradient(90deg, #312716, #F4D99B 18%, #4C381B 52%, #F4D99B 82%, #111)',
        boxShadow: '0 18px 36px rgba(0,0,0,0.58)',
      }}
    />
  );
};

const LaunchAudio = () => (
  <>
    <Audio src={staticFile('assets/jawab-launch-bed.wav')} volume={0.58} />
    {[0, 96, 210, 360, 540, 780, 1020, 1320, 1560].map((f) => (
      <Sequence key={`impact-${f}`} from={f}>
        <Audio src={staticFile('assets/impact-low.wav')} volume={0.46} />
      </Sequence>
    ))}
    {[152, 284, 418, 616, 904, 1192, 1478].map((f) => (
      <Sequence key={`tick-${f}`} from={f}>
        <Audio src={staticFile('assets/tick-high.wav')} volume={0.32} />
      </Sequence>
    ))}
  </>
);

export const JawabLaunchFilm = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: palette.black}}>
      <Background />
      <LaunchAudio />
      <MarbleShard from={0} until={t(60)} top={-30} left={-115} scale={1.25} rotate={-8} />
      <MarbleShard from={0} until={t(60)} top={1420} left={790} scale={0.92} rotate={12} />
      <Pen from={t(0)} until={t(60)} />

      <JawabWordmark from={0} until={t(9)} large />
      <QuotePanel from={t(1)} until={t(8.5)} />
      <PhoneHero from={t(1.5)} until={t(14)} />
      <MetricPanel from={t(2.3)} until={t(14)} top={165} left={395} rotate={8} label="Response Time" value="18s" sub="vs last 30 days" />
      <MetricPanel from={t(2.8)} until={t(14)} top={510} left={330} rotate={8} label="Conversations" value="128" sub="vs last 7 days" type="bars" />
      <MetricPanel from={t(3.4)} until={t(14)} top={875} left={274} rotate={8} label="Booked Appointments" value="42" sub="vs last 7 days" />
      <GoldLoop from={t(1)} until={t(15)} />

      <Headline
        from={t(9)}
        until={t(17)}
        eyebrow="The leak"
        title="Premium clinics lose patients before the first appointment."
        body="Missed calls. Slow WhatsApp. Post-consult silence. Broken booking paths."
        gold="lose"
        top={230}
      />
      <MetricPanel from={t(10.5)} until={t(18)} top={760} left={92} rotate={-4} label="At-risk value" value="AED 45k" sub="weekly opportunity detected" />

      <Headline
        from={t(17)}
        until={t(26)}
        eyebrow="What Jawab is"
        title="A revenue recovery layer for premium clinics."
        body="Not a chatbot. Not a receptionist replacement. A system that catches demand and routes it back before it disappears."
        gold="recovery"
        top={210}
      />
      <PhoneHero from={t(18)} until={t(28)} mode="handoff" />

      <Headline
        from={t(26)}
        until={t(38)}
        eyebrow="How it works"
        title="Detect. Recover. Qualify. Handoff."
        body="Arabic and English patient recovery, staff summaries, and clear next actions."
        gold="Recover"
        top={180}
      />
      <ProcessRail from={t(28)} until={t(38)} />

      <Headline
        from={t(38)}
        until={t(49)}
        eyebrow="Owner visibility"
        title="Every week, you see what was caught."
        body="Detected inquiries. Recovered conversations. Qualified leads. Consult bookings. Bottlenecks your team can fix."
        gold="caught"
        top={190}
      />
      <PhoneHero from={t(40)} until={t(51)} mode="report" />
      <MetricPanel from={t(41)} until={t(51)} top={730} left={86} rotate={-3} label="Recovery rate" value="67%" sub="first intelligence view" />

      <Headline
        from={t(49)}
        until={t(60)}
        eyebrow="Launch"
        title="The future of clinic communication starts before reception answers."
        body="72-hour setup. Weekly intelligence. Built for dental, aesthetic, dermatology, and premium medical clinics."
        gold="before"
        top={205}
      />
      <div
        style={{
          ...layer(40),
          left: 82,
          bottom: 265,
          opacity: sceneOpacity(frame, t(53), t(60), 14),
          border: '1px solid rgba(216,179,95,0.48)',
          borderRadius: 999,
          padding: '24px 34px',
          color: palette.goldSoft,
          fontFamily: font.display,
          fontSize: 32,
          fontWeight: 720,
          background: 'rgba(5,5,6,0.72)',
          boxShadow: '0 0 42px rgba(216,179,95,0.16)',
        }}
      >
        Reply AUDIT for a free leak check.
      </div>
      <Flash frames={[0, t(3.2), t(9), t(17), t(26), t(38), t(49), t(56)]} />
    </AbsoluteFill>
  );
};
