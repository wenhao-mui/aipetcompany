import type { Member } from "./team";

type CatProps = {
  member: Member;
};

export function CatFigure({ member }: CatProps) {
  if (member.pose === "back") return <BackCat member={member} />;
  if (member.pose === "profile") return <ProfileCat member={member} />;
  return <FrontCat member={member} />;
}

export function FrontCat({ member }: CatProps) {
  const { coat, belly, accent, ear, stripe, accessory } = member;

  return (
    <svg viewBox="0 0 160 176" aria-hidden="true">
      <ellipse className="shadow" cx="80" cy="164" rx="38" ry="7" />
      <path className="tail" d="M34 128 Q12 108 28 84" />
      <ellipse cx="80" cy="124" rx="46" ry="34" fill={coat} />
      {accessory === "stripes" && (
        <g fill="none" stroke={stripe} strokeWidth="5" strokeLinecap="round">
          <path d="M48 116 Q80 106 112 116" />
          <path d="M50 128 Q80 120 110 128" />
        </g>
      )}
      <ellipse cx="80" cy="132" rx="26" ry="18" fill={belly} />
      <circle cx="80" cy="66" r="34" fill={coat} />
      <path d="M50 50 L54 16 L74 46 Z" fill={coat} />
      <path d="M110 50 L106 16 L86 46 Z" fill={coat} />
      <path d="M56 46 L60 28 L70 44 Z" fill={ear} />
      <path d="M104 46 L100 28 L90 44 Z" fill={ear} />
      {accessory === "stripes" && (
        <g fill={stripe}>
          <ellipse cx="80" cy="42" rx="7" ry="4" />
          <ellipse cx="64" cy="50" rx="6" ry="3.5" transform="rotate(-18 64 50)" />
          <ellipse cx="96" cy="50" rx="6" ry="3.5" transform="rotate(18 96 50)" />
        </g>
      )}
      {accessory === "headphones" && (
        <g fill="#24282d" stroke="#24282d">
          <path d="M52 58 Q80 28 108 58" fill="none" strokeWidth="5" />
          <rect x="44" y="56" width="12" height="18" rx="4" />
          <rect x="104" y="56" width="12" height="18" rx="4" />
        </g>
      )}
      <ellipse className="eye" cx="66" cy="68" rx="6" ry="7" fill="#2b241c" />
      <ellipse className="eye" cx="94" cy="68" rx="6" ry="7" fill="#2b241c" />
      <circle cx="68" cy="66" r="2" fill="#fff" />
      <circle cx="96" cy="66" r="2" fill="#fff" />
      {accessory === "glasses" && (
        <g fill="none" stroke="#2b241c" strokeWidth="2">
          <circle cx="66" cy="68" r="10" />
          <circle cx="94" cy="68" r="10" />
          <path d="M76 68 H84" />
        </g>
      )}
      <path d="M80 76 L75 84 L85 84 Z" fill="#e7a0a4" />
      <path d="M62 80 H48 M62 86 H46 M98 80 H112 M98 86 H114" stroke="#2b241c" strokeWidth="1.2" opacity="0.45" />
      <path d="M80 84 Q73 92 66 86" fill="none" stroke="#2b241c" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M80 84 Q87 92 94 86" fill="none" stroke="#2b241c" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M54 98 Q80 114 106 98" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" />
      {accessory === "bow" && (
        <g>
          <path d="M80 104 L62 94 L64 112 Z" fill={accent} />
          <path d="M80 104 L98 94 L96 112 Z" fill={accent} />
          <circle cx="80" cy="104" r="4" fill="#8d6428" />
        </g>
      )}
      <g className="paws">
        <ellipse cx="58" cy="150" rx="14" ry="8" fill={coat} />
        <ellipse cx="102" cy="150" rx="14" ry="8" fill={coat} />
        <ellipse cx="54" cy="150" rx="3" ry="2" fill={ear} />
        <ellipse cx="62" cy="151" rx="3" ry="2" fill={ear} />
        <ellipse cx="98" cy="151" rx="3" ry="2" fill={ear} />
        <ellipse cx="106" cy="150" rx="3" ry="2" fill={ear} />
      </g>
    </svg>
  );
}

export function BackCat({ member }: CatProps) {
  const { coat, accent, ear, stripe, accessory } = member;

  return (
    <svg viewBox="0 0 160 176" aria-hidden="true">
      <ellipse className="shadow" cx="80" cy="164" rx="38" ry="7" />
      <path className="tail" d="M30 124 Q8 96 32 74" />
      <ellipse cx="80" cy="122" rx="48" ry="34" fill={coat} />
      {accessory === "stripes" && (
        <g fill="none" stroke={stripe} strokeWidth="6" strokeLinecap="round">
          <path d="M46 112 Q80 100 114 112" />
          <path d="M48 126 Q80 116 112 126" />
          <path d="M52 140 Q80 132 108 140" />
        </g>
      )}
      <circle cx="80" cy="64" r="34" fill={coat} />
      <path d="M50 48 L52 14 L74 44 Z" fill={coat} />
      <path d="M110 48 L108 14 L86 44 Z" fill={coat} />
      <path d="M56 44 L58 26 L70 42 Z" fill={ear} />
      <path d="M104 44 L102 26 L90 42 Z" fill={ear} />
      {accessory === "stripes" && (
        <g fill={stripe}>
          <ellipse cx="80" cy="40" rx="8" ry="4" />
          <ellipse cx="62" cy="50" rx="7" ry="3.5" transform="rotate(-16 62 50)" />
          <ellipse cx="98" cy="50" rx="7" ry="3.5" transform="rotate(16 98 50)" />
        </g>
      )}
      <path d="M52 96 Q80 112 108 96" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" />
      <circle cx="80" cy="104" r="4" fill="#f2d48a" />
      <g className="paws">
        <ellipse cx="62" cy="150" rx="14" ry="8" fill={coat} />
        <ellipse cx="98" cy="150" rx="14" ry="8" fill={coat} />
      </g>
    </svg>
  );
}

export function ProfileCat({ member }: CatProps) {
  const { coat, belly, accent, ear, accessory } = member;

  return (
    <svg viewBox="0 0 150 180" aria-hidden="true">
      <ellipse className="shadow" cx="78" cy="170" rx="34" ry="7" />
      <path className="tail" d="M46 132 Q16 118 30 82" />
      <ellipse cx="64" cy="128" rx="30" ry="34" fill={coat} />
      <ellipse cx="90" cy="112" rx="26" ry="30" fill={coat} />
      <ellipse cx="98" cy="118" rx="14" ry="16" fill={belly} />
      <circle cx="104" cy="58" r="30" fill={coat} />
      <path d="M84 44 L92 10 L116 42 Z" fill={coat} />
      <path d="M92 40 L98 22 L110 40 Z" fill={ear} />
      {accessory === "headphones" && (
        <g fill="#24282d" stroke="#24282d">
          <path d="M80 48 Q104 18 132 46" fill="none" strokeWidth="5" />
          <rect x="74" y="46" width="11" height="16" rx="4" />
          <rect x="126" y="44" width="11" height="16" rx="4" />
        </g>
      )}
      <ellipse cx="128" cy="66" rx="14" ry="11" fill={belly} />
      <circle cx="136" cy="66" r="3.2" fill="#e7a0a4" />
      <ellipse className="eye" cx="110" cy="54" rx="5.5" ry="6.5" fill="#2b241c" />
      <circle cx="112" cy="52" r="1.8" fill="#fff" />
      {accessory === "glasses" && (
        <g fill="none" stroke="#2b241c" strokeWidth="2">
          <circle cx="110" cy="54" r="9" />
          <circle cx="128" cy="64" r="8" />
          <path d="M118 58 H121" />
        </g>
      )}
      <path d="M124 74 H112 M126 80 H110" stroke="#2b241c" strokeWidth="1.1" opacity="0.4" />
      <path d="M82 86 Q98 102 116 88" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" />
      <g className="paws">
        <ellipse cx="118" cy="148" rx="16" ry="9" fill={coat} />
        <ellipse cx="132" cy="140" rx="12" ry="8" fill={coat} />
        <ellipse cx="126" cy="140" rx="2.4" ry="1.8" fill={ear} />
        <ellipse cx="134" cy="141" rx="2.4" ry="1.8" fill={ear} />
      </g>
    </svg>
  );
}
