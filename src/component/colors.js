export const colors = {
  error50: "#ffcccc",
  error500: "#cc0000",
};
const baseRed = 20;
const baseGreen = 20;
const baseBlue = 70;
const colorKeys = [
  "primary800",
  "primary700",
  "primary600",
  "primary500",
  "primary400",
  "primary300",
  "primary200",
  "primary100",
  "primary50",
];
const rgbToHex = (r, g, b) => {
  r = Math.min(255, Math.round(r));
  g = Math.min(255, Math.round(g));
  b = Math.min(255, Math.round(b));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const adjColor = () => {
  const steps = colorKeys.length;
  const gapRed = 255 - baseRed;
  const gapGreen = 255 - baseGreen;
  const gapBlue = 255 - baseBlue;
  for (let i = 0; i < steps; i++) {
    colors[colorKeys[i]] = rgbToHex(
      baseRed + (gapRed * i) / steps,
      baseGreen + (gapGreen * i) / steps,
      baseBlue + (gapBlue * i) / steps
    );
  }
};
adjColor();
