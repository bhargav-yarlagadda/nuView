import React from "react"

type DotGridBackgroundProps = {
  dotSize?: number
  gap?: number
  fade?: boolean
}

export default function DotGridBackground({ dotSize = 1.5, gap = 24, fade = true }: DotGridBackgroundProps) {
  const backgroundSize = `${gap}px ${gap}px`
  const dotColor = `oklch(from var(--border) l c h / 0.4)`

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize*1.4}px, transparent ${dotSize}px)`,
          backgroundSize,
          backgroundPosition: "0 0",
        }}
      />
      {fade && (
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(70% 50% at 50% 50%, black 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(70% 50% at 50% 50%, black 60%, transparent 100%)",
            background:
              "linear-gradient(to bottom, oklch(from var(--background) l c h / 0.2), transparent 40%, transparent 60%, oklch(from var(--background) l c h / 0.2))",
          }}
        />)
      }
    </div>
  )
}
