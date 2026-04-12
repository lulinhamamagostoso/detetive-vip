export function TopBar() {
  return (
    <div
      className="relative z-[1001] py-2.5 px-4 text-center text-[0.78rem] font-semibold tracking-wide border-b"
      style={{
        background: "linear-gradient(90deg, #fdfbf5, #faf5e8, #fdfbf5)",
        borderColor: "rgba(184, 150, 63, 0.15)",
        color: "var(--primary-dark)",
      }}
    >
      <span
        className="inline-block mr-1.5 px-2 py-0.5 rounded text-[0.68rem] uppercase tracking-widest font-bold"
        style={{ background: "var(--destructive)", color: "#fff" }}
      >
        OFERTA
      </span>
      Preço especial por tempo limitado. Garanta agora antes que acabe!
    </div>
  )
}
