// Folded-ribbon "S" mark. `id` namespaces the gradient defs so the logo can
// appear more than once on a page without duplicate ids.
export default function Logo({ size = 40, id = "rb", animate = true }) {
  const fold = (name) =>
    animate ? { animation: `${name} 4.5s cubic-bezier(.6,0,.3,1) infinite` } : undefined;

  return (
    <svg
      width={size}
      height={size}
      viewBox="8 4 112 104"
      className={animate ? "logo-mark logo-mark-pop" : "logo-mark"}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}1`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffb454" />
          <stop offset="1" stopColor="#ff6a45" />
        </linearGradient>
        <linearGradient id={`${id}2`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff5540" />
          <stop offset="1" stopColor="#e6303c" />
        </linearGradient>
        <linearGradient id={`${id}3`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d4256b" />
          <stop offset="1" stopColor="#b3186f" />
        </linearGradient>
      </defs>
      <path
        className="logo-fold"
        d="M96 24 C96 12 74 8 56 14 C36 21 34 40 54 48 L96 40 Z"
        fill={`url(#${id}1)`}
        style={fold("foldA")}
      />
      <path
        className="logo-fold"
        d="M54 48 C74 56 96 60 93 78 L34 86 C30 74 36 56 54 48 Z"
        fill={`url(#${id}2)`}
        style={fold("foldB")}
      />
      <path
        className="logo-fold"
        d="M93 78 C90 98 58 104 40 92 C33 87 30 80 34 72 L60 76 C70 78 82 78 93 78 Z"
        fill={`url(#${id}3)`}
        style={fold("foldC")}
      />
    </svg>
  );
}
