function colorConverter(color, targetFormat) {
    // 将十六进制颜色转换为 RGB 格式
    function hexToRgb(hex) {
      hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
  
    // 将 RGB 颜色转换为十六进制格式
    function rgbToHex(rgb) {
      return '#' + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
    }
  
    // 将 RGB 颜色转换为 HSL 格式
    function rgbToHsl(rgb) {
      const r = rgb.r / 255;
      const g = rgb.g / 255;
      const b = rgb.b / 255;
  
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
  
      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
  
      return { h: h * 360, s: s * 100, l: l * 100 };
    }
  
    // 将 HSL 颜色转换为 RGB 格式
    function hslToRgb(hsl) {
      const h = hsl.h / 360;
      const s = hsl.s / 100;
      const l = hsl.l / 100;
      let r, g, b;
  
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
  
      return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    }
  
    // 格式转换
    switch (targetFormat) {
      case 'hex':
        if (color.startsWith('#')) {
          return color.toUpperCase();
        } else {
          const { r, g, b } = hexToRgb(color);
          return rgbToHex({ r, g, b }).toUpperCase();
        }
      case 'rgb':
        if (color.startsWith('#')) {
          const { r, g, b } = hexToRgb(color);
          return `rgb(${r}, ${g}, ${b})`;
        } else {
          return color;
        }
      case 'hsl':
        if (color.startsWith('#')) {
          const { r, g, b } = hexToRgb(color);
          const { h, s, l } = rgbToHsl({ r, g, b });
          return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
        } else {
          const { r, g, b } = color.match(/\d+/g).map(Number);
          const { h, s, l } = rgbToHsl({ r, g, b });
          return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
        }
      default:
        return 'Invalid target format';
    }
  }
  
  // 示例用法
  const colorHex = '#ff0000';
  console.log(colorConverter(colorHex, 'rgb')); // 输出：rgb(255, 0,
  