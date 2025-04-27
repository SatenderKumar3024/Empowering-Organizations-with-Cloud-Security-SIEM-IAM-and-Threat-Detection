import Image from "next/image"

interface SplunkLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SplunkLogo({ size = "md", className = "" }: SplunkLogoProps) {
  const dimensions = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 48, height: 48 },
  }

  const { width, height } = dimensions[size]

  return (
    <div
      className={`relative flex items-center justify-center rounded-md overflow-hidden bg-gradient-to-r from-[#65A637] to-[#83BA44] ${className}`}
      style={{ width, height }}
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {"/splunk-logo.png" ? (
          <Image
            src="/splunk-logo.png"
            alt="Splunk Logo"
            width={width}
            height={height}
            className="object-contain p-1"
          />
        ) : (
          <span
            className="font-bold text-white"
            style={{ fontSize: size === "sm" ? "10px" : size === "md" ? "14px" : "18px" }}
          >
            SPLUNK
          </span>
        )}
      </div>
    </div>
  )
}
