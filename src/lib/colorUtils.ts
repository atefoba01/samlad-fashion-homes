import type { ColorInfo } from '../types';

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 0, g: 0, b: 0 };
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function getContrastColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff';
}

export function generateMatchingColors(baseHex: string): ColorInfo[] {
  const { r, g, b } = hexToRgb(baseHex);

  const toHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const fromHsl = (h: number, s: number, l: number) => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
  };

  const { h, s, l } = toHsl(r, g, b);

  const complementary = fromHsl((h + 180) % 360, s, l);
  const triadic1 = fromHsl((h + 120) % 360, s, l);
  const triadic2 = fromHsl((h + 240) % 360, s, l);
  const analogous1 = fromHsl((h + 30) % 360, s, l);
  const lighter = fromHsl(h, Math.max(s - 20, 0), Math.min(l + 20, 95));
  const darker = fromHsl(h, s, Math.max(l - 20, 5));

  const makeColor = (hex: string, name: string): ColorInfo => ({
    hex,
    rgb: hexToRgb(hex),
    name,
  });

  return [
    makeColor(baseHex, 'Your Color'),
    makeColor(complementary, 'Complementary'),
    makeColor(triadic1, 'Triadic 1'),
    makeColor(triadic2, 'Triadic 2'),
    makeColor(analogous1, 'Analogous'),
    makeColor(lighter, 'Light Tint'),
    makeColor(darker, 'Deep Shade'),
  ];
}

export function colorDistance(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

export function findNearestColorName(hex: string): string {
  const namedColors: Record<string, string> = {
    '#FF0000': 'Red', '#CC0000': 'Dark Red', '#FF6B6B': 'Coral Red',
    '#FF8C00': 'Dark Orange', '#FFA500': 'Orange', '#FFD700': 'Gold',
    '#FFFF00': 'Yellow', '#9ACD32': 'Yellow Green', '#00FF00': 'Lime',
    '#006400': 'Dark Green', '#008000': 'Green', '#2E8B57': 'Sea Green',
    '#00FFFF': 'Cyan', '#008B8B': 'Dark Cyan', '#4169E1': 'Royal Blue',
    '#0000FF': 'Blue', '#00008B': 'Dark Blue', '#000080': 'Navy',
    '#800080': 'Purple', '#4B0082': 'Indigo', '#EE82EE': 'Violet',
    '#FF69B4': 'Hot Pink', '#FFB6C1': 'Light Pink', '#FFC0CB': 'Pink',
    '#FFFFFF': 'White', '#000000': 'Black', '#808080': 'Gray',
    '#C0C0C0': 'Silver', '#A52A2A': 'Brown', '#8B4513': 'Saddle Brown',
    '#D2691E': 'Chocolate', '#F5F5DC': 'Beige', '#FFFACD': 'Lemon',
    '#E6E6FA': 'Lavender', '#C9A84C': 'Gold', '#4A1020': 'Burgundy',
    '#6B0F1A': 'Deep Burgundy', '#064E3B': 'Emerald Green',
  };

  let minDist = Infinity;
  let nearest = 'Custom Color';
  for (const [colorHex, name] of Object.entries(namedColors)) {
    const dist = colorDistance(hex, colorHex);
    if (dist < minDist) {
      minDist = dist;
      nearest = name;
    }
  }
  return nearest;
}
