export function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Gold orb - top right (blur reduzido para performance) */}
      <div
        className="absolute w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full opacity-20 -top-64 -right-40 animate-orb"
        style={{
          background: "#e8d9a8",
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />

      {/* Warm orb - bottom left */}
      <div
        className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full opacity-15 -bottom-52 -left-40 animate-orb-reverse"
        style={{
          background: "#d4c5a9",
          filter: "blur(100px)",
          willChange: "transform",
        }}
      />

      {/* Scan line - hidden on mobile */}
      <div
        className="hidden md:block absolute top-0 left-0 right-0 h-px opacity-5 animate-scan"
        style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }}
      />
    </div>
  )
}
