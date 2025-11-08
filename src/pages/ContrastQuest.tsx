import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

// WCAG relative luminance calculation
const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Convert hex to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// WCAG contrast ratio formula
const getContrastRatio = (fg: string, bg: string): number => {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  
  if (!fgRgb || !bgRgb) return 0;
  
  const fgLum = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
  const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  
  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Convert HSL to hex
const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const ContrastQuest = () => {
  const [foregroundColor, setForegroundColor] = useState("#111111");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [lightness, setLightness] = useState(100);
  const [contrastRatio, setContrastRatio] = useState(0);

  const passesAA = contrastRatio >= 4.5;
  const passesAAA = contrastRatio >= 7.0;

  // Update contrast ratio when colors change
  useEffect(() => {
    const ratio = getContrastRatio(foregroundColor, backgroundColor);
    setContrastRatio(ratio);
  }, [foregroundColor, backgroundColor]);

  // Update background color when lightness slider changes
  const handleLightnessChange = (value: number[]) => {
    const newLightness = value[0];
    setLightness(newLightness);
    const newBg = hslToHex(0, 0, newLightness);
    setBackgroundColor(newBg);
  };

  let statusMessage = "";
  if (passesAAA) statusMessage = "Passes many strict contrast recommendations (AAA-like range).";
  else if (passesAA) statusMessage = "Meets common contrast recommendations for body text.";
  else statusMessage = "May be hard to read for many users — try increasing contrast.";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
        <nav>
          <Link
            to="/arcade"
            className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tasks
          </Link>
        </nav>

        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Color & Text Contrast Check</h1>
          <p className="text-sm text-slate-600">
            Adjust your text and background colors to see how contrast affects readability.
            Higher contrast helps more people read your interface comfortably.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* Controls */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-900">
                Text color
              </Label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="h-10 w-16 cursor-pointer rounded border border-slate-300 bg-transparent"
                  aria-label="Choose text color"
                />
                <p className="font-mono text-xs text-slate-600">{foregroundColor}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-900">
                Background color
              </Label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="h-10 w-16 cursor-pointer rounded border border-slate-300 bg-transparent"
                  aria-label="Choose background color"
                />
                <p className="font-mono text-xs text-slate-600">{backgroundColor}</p>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-900">
                Background brightness
              </Label>
              <Slider
                value={[lightness]}
                onValueChange={handleLightnessChange}
                min={0}
                max={100}
                step={1}
                className="w-full mt-2"
                aria-describedby="bg-bright-help"
              />
              <p id="bg-bright-help" className="text-xs text-slate-600">
                Simulate lighter vs darker backgrounds to feel how contrast changes.
              </p>
            </div>

            <div
              className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
              role="status"
              aria-live="polite"
            >
              <p className="text-slate-900">
                Contrast ratio:{" "}
                <span className="font-mono font-semibold">{contrastRatio.toFixed(2)}:1</span>
              </p>
              <p className="mt-1 text-slate-600">{statusMessage}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              {/* Preview */}
              <div
                className="rounded-xl border p-5"
                style={{ backgroundColor: backgroundColor, color: foregroundColor, borderColor: foregroundColor + "40" }}
              >
                <h2 className="text-lg font-semibold">Preview text</h2>
                <p className="mt-2 text-sm">
                  This is how a block of interface text might appear to someone reading your
                  app. Try adjusting colors until it feels easy to scan without squinting.
                </p>
                <button
                  type="button"
                  className="mt-4 rounded-lg border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    borderColor: foregroundColor,
                    color: foregroundColor
                  }}
                  aria-label="Sample button"
                >
                  Sample button
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
              <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Why this check matters
              </h2>
              <p>
                Low contrast can be especially hard on users with vision impairments, older screens,
                or anyone reading in bright sunlight. WCAG recommends 4.5:1 for body text.
              </p>
            </div>
          </div>
        </section>

        {/* Status feedback */}
        {passesAA && (
          <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-900 flex items-center gap-2" role="alert">
            <CheckCircle2 className="w-5 h-5" />
            <p className="font-semibold">
              Success! Your color combination passes WCAG AA standards.
              {passesAAA && " 🌟 Bonus: AAA standard achieved!"}
            </p>
          </div>
        )}
        {!passesAA && contrastRatio > 0 && (
          <div className="p-4 rounded-2xl border border-rose-300 bg-rose-50 text-rose-900 flex items-center gap-2" role="alert">
            <XCircle className="w-5 h-5" />
            <p className="font-semibold">
              This combination may be hard to read — try increasing the contrast.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ContrastQuest;
