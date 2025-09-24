export const interpolateColors = (start: string, end: string, steps: number) => {
    const hexToRgb = (hex: string) => {
        const bigint = parseInt(hex.slice(1), 16)
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
    }

    const rgbToHex = (r: number, g: number, b: number) =>
        `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`

    const startRgb = hexToRgb(start)
    const endRgb = hexToRgb(end)

    const colors = []
    for (let i = 0; i < steps; i++) {
        const r = Math.round(startRgb[0] + ((endRgb[0] - startRgb[0]) * i) / (steps - 1))
        const g = Math.round(startRgb[1] + ((endRgb[1] - startRgb[1]) * i) / (steps - 1))
        const b = Math.round(startRgb[2] + ((endRgb[2] - startRgb[2]) * i) / (steps - 1))
        colors.push(rgbToHex(r, g, b))
    }
    return colors
}