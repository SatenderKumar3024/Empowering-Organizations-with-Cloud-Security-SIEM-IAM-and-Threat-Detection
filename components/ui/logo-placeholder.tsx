interface LogoPlaceholderProps {
  text: string
  bgColor?: string
  color?: string
  width?: string
  height?: string
  className?: string
}

export function LogoPlaceholder({
  text,
  bgColor = "#000000",
  color = "#FFFFFF",
  width = "100px",
  height = "40px",
  className = "",
}: LogoPlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center rounded ${className}`}
      style={{
        backgroundColor: bgColor,
        color: color,
        width: width,
        height: height,
        fontSize: Number.parseInt(height) * 0.4 + "px",
        fontWeight: "bold",
      }}
    >
      {text}
    </div>
  )
}
