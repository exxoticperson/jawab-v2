import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  Flash,
  FooterCTA,
  JawabLockup,
  MetricCard,
  ScanLines,
  SoundBed,
  SystemLine,
  TitleBlock,
} from './components';
import {between, clamp, fade} from './motion';
import {font, palette} from './style';

const ArchitecturalSpace = ({
  mood = 'dark',
}: {
  mood?: 'dark' | 'clinical' | 'map';
}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 840], [0, -80], clamp);
  const shimmer = interpolate(Math.sin(frame / 18), [-1, 1], [0.25, 0.58]);
  const clinical = mood === 'clinical';

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        background: clinical
          ? `linear-gradient(180deg, #DDE5E5 0%, #AEBBBB 48%, #101112 100%)`
          : `linear-gradient(180deg, ${palette.black} 0%, #080807 48%, #020202 100%)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            mood === 'map'
              ? 'radial-gradient(circle at 50% 28%, rgba(143,184,199,0.16), transparent 42%), radial-gradient(circle at 70% 62%, rgba(216,179,95,0.12), transparent 36%)'
              : 'radial-gradient(circle at 72% 18%, rgba(216,179,95,0.16), transparent 38%)',
        }}
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={`panel-${i}`}
          style={{
            position: 'absolute',
            top: -60,
            left: 120 + i * 190 + drift * (0.18 + i * 0.03),
            width: 2,
            height: 1320,
            background:
              'linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)',
            transform: `skewX(${-12 + i * 2}deg)`,
            opacity: clinical ? 0.28 : 0.2,
          }}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`light-${i}`}
          style={{
            position: 'absolute',
            left: -120 + i * 330 + drift * 0.22,
            top: 1180 + i * 70,
            width: 820,
            height: 2,
            background: `linear-gradient(90deg, transparent, rgba(216,179,95,${shimmer}), transparent)`,
            transform: `rotate(${-8 - i * 5}deg)`,
            boxShadow: '0 0 28px rgba(216,179,95,0.24)',
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: 60,
          right: 60,
          bottom: 220,
          height: 330,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.5))',
          transform: 'perspective(900px) rotateX(62deg)',
          transformOrigin: 'bottom',
        }}
      />
      <NoiseField />
    </AbsoluteFill>
  );
};

const NoiseField = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: frame % 2 === 0 ? 0.065 : 0.035,
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.055) 0px, rgba(255,255,255,0.055) 1px, transparent 1px, transparent 4px)',
        mixBlendMode: 'screen',
      }}
    />
  );
};

const ChairSilhouette = ({from, until}: {from: number; until: number}) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 12);
  const breathe = interpolate(Math.sin(frame / 22), [-1, 1], [0, 10]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 135,
        bottom: 320 + breathe,
        width: 520,
        height: 430,
        opacity,
        filter: 'drop-shadow(0 40px 65px rgba(0,0,0,0.6))',
        zIndex: 5,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 86,
          top: 120,
          width: 330,
          height: 118,
          borderRadius: '80px 120px 120px 80px',
          background: 'linear-gradient(145deg, #252422, #0B0B0C)',
          border: '1px solid rgba(255,255,255,0.08)',
          transform: 'rotate(-14deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 282,
          top: 40,
          width: 140,
          height: 170,
          borderRadius: 70,
          background: 'linear-gradient(145deg, #242322, #090909)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 245,
          top: 222,
          width: 40,
          height: 180,
          background: '#090909',
          borderRadius: 20,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 130,
          top: 378,
          width: 330,
          height: 18,
          background: `linear-gradient(90deg, transparent, ${palette.gold}, transparent)`,
          opacity: 0.38,
        }}
      />
    </div>
  );
};

const MapField = ({from, until}: {from: number; until: number}) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 12);
  const draw = fade(frame, from + 6, from + 44);
  const roads = [
    [120, 500, 980, 360, -6],
    [70, 720, 960, 900, 10],
    [180, 1050, 870, 610, -24],
    [270, 330, 760, 1220, 36],
    [80, 1280, 920, 1120, -9],
  ];

  return (
    <div style={{position: 'absolute', inset: 0, opacity, zIndex: 6}}>
      {roads.map(([left, top, width, y, rotate], index) => (
        <div
          key={`road-${index}`}
          style={{
            position: 'absolute',
            left,
            top,
            width: width * draw,
            height: 2,
            background:
              index % 2 === 0
                ? 'rgba(143,184,199,0.38)'
                : 'rgba(216,179,95,0.32)',
            transform: `translateY(${y - top}px) rotate(${rotate}deg)`,
            transformOrigin: 'left center',
            boxShadow: '0 0 22px rgba(216,179,95,0.16)',
          }}
        />
      ))}
      {[
        [760, 520, '1'],
        [290, 760, '2'],
        [560, 650, '3'],
      ].map(([left, top, label], index) => (
        <VisibilityPin
          key={label}
          from={from + 30 + index * 10}
          until={until}
          left={Number(left)}
          top={Number(top)}
          label={String(label)}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: 86,
          right: 86,
          top: 430,
          height: 780,
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 44,
          background: 'rgba(0,0,0,0.16)',
          boxShadow: 'inset 0 0 80px rgba(143,184,199,0.06)',
        }}
      />
    </div>
  );
};

const AbstractProductStage = ({from, until}: {from: number; until: number}) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 12);
  const y = interpolate(frame, [from, from + 24], [60, 0], clamp);

  return (
    <div style={{position: 'absolute', inset: 0, opacity, zIndex: 7}}>
      <div
        style={{
          position: 'absolute',
          left: 210,
          top: 420 + y,
          width: 445,
          height: 850,
          borderRadius: 68,
          border: '1px solid rgba(255,255,255,0.18)',
          background:
            'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015)), #050506',
          boxShadow:
            '0 60px 120px rgba(0,0,0,0.56), inset 0 0 0 8px rgba(255,255,255,0.025)',
          transform: 'rotate(-2deg)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 138,
            top: 22,
            width: 160,
            height: 36,
            borderRadius: 28,
            background: '#000',
          }}
        />
        {[
          ['Live conversations', '24'],
          ['Appointment recovery', '78%'],
          ['Response time', '18s'],
        ].map(([label, value], index) => (
          <div
            key={label}
            style={{
              position: 'absolute',
              left: 42,
              right: 42,
              top: 132 + index * 190,
              height: 142,
              borderRadius: 26,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.035)',
              padding: 24,
              fontFamily: font.display,
            }}
          >
            <div style={{color: palette.muted, fontSize: 22}}>{label}</div>
            <div
              style={{
                color: index === 2 ? palette.green : palette.goldSoft,
                fontSize: 54,
                fontWeight: 740,
                marginTop: 14,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={`float-${i}`}
          style={{
            position: 'absolute',
            right: 80,
            top: 500 + i * 235 + y * 0.45,
            width: 340,
            height: 135,
            borderRadius: 26,
            border: '1px solid rgba(216,179,95,0.22)',
            background: 'rgba(9,9,10,0.72)',
            boxShadow: '0 0 38px rgba(216,179,95,0.08)',
            padding: 26,
            color: palette.text,
            fontFamily: font.display,
          }}
        >
          <div style={{fontSize: 27, fontWeight: 650}}>
            {['Intelligent routing', 'Recovered revenue', 'AI agent'][i]}
          </div>
          <div style={{fontFamily: font.arabic, color: palette.gold, fontSize: 23}}>
            {['توجيه ذكي', 'استرداد الإيراد', 'المساعد الذكي'][i]}
          </div>
        </div>
      ))}
    </div>
  );
};

const phoneShell = {
  position: 'absolute' as const,
  width: 430,
  height: 820,
  right: 82,
  bottom: 250,
  borderRadius: 62,
  border: '1px solid rgba(255,255,255,0.18)',
  background:
    'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)), rgba(5,5,6,0.88)',
  boxShadow:
    '0 45px 90px rgba(0,0,0,0.48), inset 0 0 0 8px rgba(255,255,255,0.035)',
  overflow: 'hidden' as const,
};

const MessageStack = ({
  from,
  until,
  variant = 'recovery',
}: {
  from: number;
  until: number;
  variant?: 'recovery' | 'speed';
}) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 10);
  const active = fade(frame, from + 8, from + 28);
  const rows =
    variant === 'speed'
      ? [
          ['00:00', 'Missed call detected', palette.red],
          ['00:03', 'WhatsApp sent', palette.green],
          ['00:19', 'Patient qualified', palette.gold],
          ['01:10', 'Staff handoff ready', palette.text],
        ]
      : [
          ['Arabic', 'Emergency veneers inquiry', palette.gold],
          ['English', 'Prefers evening callback', palette.text],
          ['System', 'Routed to front desk', palette.green],
        ];

  return (
    <div
      style={{
        ...phoneShell,
        opacity,
        transform: `translateY(${interpolate(frame, [from, from + 20], [38, 0], clamp)}px) rotate(${interpolate(frame, [from, until], [-1.8, 1.6], clamp)}deg)`,
        zIndex: 21,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 148,
          top: 20,
          width: 134,
          height: 32,
          borderRadius: 22,
          background: '#000',
        }}
      />
      <div style={{padding: '86px 34px 0'}}>
        <div
          style={{
            color: palette.muted,
            fontFamily: font.mono,
            fontSize: 18,
            textTransform: 'uppercase',
            letterSpacing: 2.1,
          }}
        >
          Jawab Recovery
        </div>
        <div
          style={{
            color: palette.text,
            fontFamily: font.display,
            fontSize: 38,
            fontWeight: 720,
            marginTop: 14,
            lineHeight: 1.05,
          }}
        >
          Patient signal caught.
        </div>
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.12)',
            margin: '30px 0',
          }}
        />
        {rows.map(([tag, text, color], index) => {
          const rowOpacity = fade(frame, from + 14 + index * 10, from + 24 + index * 10);
          return (
            <div
              key={text}
              style={{
                marginBottom: 18,
                padding: 20,
                borderRadius: 22,
                border: `1px solid rgba(255,255,255,${0.08 + index * 0.025})`,
                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025))',
                opacity: rowOpacity * active,
              }}
            >
              <div style={{fontFamily: font.mono, fontSize: 18, color}}>
                {tag}
              </div>
              <div
                style={{
                  fontFamily: font.display,
                  color: palette.text,
                  fontSize: 26,
                  marginTop: 8,
                  lineHeight: 1.1,
                }}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SignalArc = ({from, until}: {from: number; until: number}) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 10);
  const progress = fade(frame, from, from + 35);
  return (
    <div
      style={{
        position: 'absolute',
        left: 140,
        top: 1110,
        width: 820,
        height: 360,
        opacity,
        zIndex: 19,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 120,
          width: `${progress * 720}px`,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${palette.gold}, transparent)`,
          boxShadow: '0 0 24px rgba(216,179,95,0.6)',
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 40 + i * 250,
            top: 106 - i * 18,
            width: 18,
            height: 18,
            borderRadius: 12,
            background: palette.gold,
            boxShadow: '0 0 24px rgba(216,179,95,0.72)',
            opacity: fade(frame, from + 8 + i * 10, from + 18 + i * 10),
          }}
        />
      ))}
    </div>
  );
};

export const SilentLeakA = () => {
  return (
    <AbsoluteFill style={{background: palette.black}}>
      <ArchitecturalSpace />
      <ChairSilhouette from={0} until={720} />
      <ScanLines opacity={0.14} />
      <SoundBed duration={720} />
      <JawabLockup from={0} until={720} />
      <TitleBlock
        label="Pattern interrupt"
        title="Luxury dies in silence."
        subtitle="The patient does not wait for your front desk to breathe."
        from={0}
        until={96}
        gold="silence"
      />
      <MetricCard
        label="Invisible leak"
        value="1 missed reply"
        tone="red"
        from={82}
        until={168}
        top={620}
      />
      <TitleBlock
        label="Escalation"
        title="While your clinic is still typing, someone else is booking."
        from={144}
        until={258}
        compact
        gold="booking"
      />
      <MessageStack from={235} until={474} />
      <SignalArc from={258} until={474} />
      <SystemLine from={306} until={410} top={640}>
        Missed call captured. WhatsApp sent. Language detected. Staff receives the handoff.
      </SystemLine>
      <TitleBlock
        label="Future reveal"
        title="The premium patient experience starts before reception answers."
        subtitle="Jawab turns silence into a routed conversation."
        from={414}
        until={604}
        gold="before"
      />
      <FooterCTA from={566} until={720} text="DM AUDIT. See what your clinic is leaking." />
      <TitleBlock
        title="The next standard is already moving."
        from={612}
        until={720}
        compact
        style={{top: 1170}}
        gold="moving"
      />
      <Flash frames={[0, 84, 144, 235, 414, 612]} />
    </AbsoluteFill>
  );
};

export const FastestClinicWins = () => {
  const frame = useCurrentFrame();
  const timer = Math.max(0, 240 - Math.floor(frame / 0.75));
  const minutes = Math.floor(timer / 60);
  const seconds = String(timer % 60).padStart(2, '0');
  return (
    <AbsoluteFill style={{background: palette.black}}>
      <ArchitecturalSpace />
      <SoundBed duration={540} />
      <JawabLockup from={0} until={540} />
      <ScanLines opacity={0.22} />
      <TitleBlock
        label="0.0 seconds"
        title="The fastest clinic wins."
        from={0}
        until={92}
        gold="fastest"
      />
      <div
        style={{
          position: 'absolute',
          left: 86,
          top: 560,
          fontFamily: font.display,
          fontSize: 178,
          fontWeight: 800,
          color: palette.goldSoft,
          fontVariantNumeric: 'tabular-nums',
          opacity: between(frame, 58, 216, 10),
          textShadow: '0 0 58px rgba(216,179,95,0.35)',
          zIndex: 24,
        }}
      >
        {minutes}:{seconds}
      </div>
      <SystemLine from={104} until={226} top={860}>
        A patient waits. Opens another profile. Sends the same message again.
      </SystemLine>
      <MetricCard
        label="Jawab response layer"
        value="3 sec"
        tone="green"
        from={226}
        until={358}
        top={660}
      />
      <MessageStack from={262} until={462} variant="speed" />
      <TitleBlock
        label="Authority"
        title="Speed is no longer a staffing advantage. It is infrastructure."
        from={360}
        until={488}
        compact
        gold="infrastructure"
      />
      <FooterCTA from={448} until={540} text="Some clinics will become impossible to ignore." />
      <Flash frames={[0, 58, 226, 360, 448]} />
    </AbsoluteFill>
  );
};

const VisibilityPin = ({
  from,
  until,
  left,
  top,
  label,
}: {
  from: number;
  until: number;
  left: number;
  top: number;
  label: string;
}) => {
  const frame = useCurrentFrame();
  const opacity = between(frame, from, until, 8);
  const scale = interpolate(frame, [from, from + 16], [0.2, 1], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        zIndex: 28,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 26,
          background: palette.red,
          color: palette.text,
          display: 'grid',
          placeItems: 'center',
          fontFamily: font.display,
          fontWeight: 760,
          fontSize: 24,
          boxShadow: '0 0 36px rgba(255,69,58,0.45)',
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const FutureStandard = () => {
  return (
    <AbsoluteFill style={{background: palette.black}}>
      <ArchitecturalSpace mood="map" />
      <SoundBed duration={840} />
      <JawabLockup from={0} until={840} />
      <TitleBlock
        label="Cold open"
        title="Your clinic can look premium and still disappear."
        subtitle="The new patient journey is not a waiting room. It is a search, a DM, a missed call, a choice."
        from={0}
        until={146}
        gold="disappear"
      />
      <MapField from={92} until={330} />
      <TitleBlock
        label="Hidden loss"
        title="If the system cannot find you, the patient will not wait to understand why."
        from={210}
        until={346}
        compact
        gold="cannot"
      />
      <AbstractProductStage from={330} until={620} />
      <MetricCard
        label="Weekly intelligence"
        value="12 detected"
        tone="gold"
        from={370}
        until={500}
        top={600}
      />
      <MetricCard
        label="Recovered conversations"
        value="8 routed"
        tone="green"
        from={430}
        until={590}
        top={850}
      />
      <TitleBlock
        label="Resolution"
        title="Jawab is the communication layer premium clinics will be judged by."
        from={590}
        until={758}
        gold="judged"
      />
      <FooterCTA from={720} until={840} text="The future of clinic communication has started." />
      <Flash frames={[0, 118, 210, 330, 590, 720]} />
    </AbsoluteFill>
  );
};
