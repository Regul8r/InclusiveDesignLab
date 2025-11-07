import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { awardXp, awardBadge, updateLastAward, hasClaimedToday, getTodayDateString } from "@/lib/xp";
import { toast } from "sonner";

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
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  const passesAA = contrastRatio >= 4.5;
  const passesAAA = contrastRatio >= 7.0;

  useEffect(() => {
    setAlreadyClaimed(hasClaimedToday("contrast-quest"));
  }, []);

  // Update contrast ratio when colors change
  useEffect(() => {
    const ratio = getContrastRatio(foregroundColor, backgroundColor);
    setContrastRatio(ratio);
  }, [foregroundColor, backgroundColor]);

  // Update background color when lightness slider changes
  const handleLightnessChange = (value: number[]) => {
    const newLightness = value[0];
    setLightness(newLightness);
    // Convert current background to HSL, update lightness, convert back
    const newBg = hslToHex(0, 0, newLightness);
    setBackgroundColor(newBg);
  };

  const handleClaimRewards = () => {
    if (alreadyClaimed) {
      toast.info("Practice mode—XP already claimed today.");
      return;
    }

    // Award badge
    awardBadge({
      id: "contrast-champ",
      name: "Contrast Champ",
      description: "Passed WCAG AA contrast standards",
      xp: 50,
    });

    // Calculate XP
    let totalXp = 50;
    let message = "You earned 50 XP and the Contrast Champ badge!";
    
    if (passesAAA) {
      totalXp += 10;
      message = "🌟 Amazing! AAA standard! You earned 60 XP and the Contrast Champ badge!";
    }

    // Award XP
    awardXp(totalXp);

    // Update last award date
    updateLastAward("contrast-quest", getTodayDateString());
    setAlreadyClaimed(true);

    // Show success toast
    toast.success(message);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link to="/arcade">
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Arcade
            </Button>
          </Link>
        </nav>

        {/* Game Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Contrast Quest
          </h1>
          <p className="text-muted-foreground">
            Adjust colors until the contrast ratio passes WCAG AA (4.5:1)
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls Section */}
          <section className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Foreground Color */}
                <div className="space-y-2">
                  <Label htmlFor="fg-color" className="text-sm font-medium">
                    Foreground (Text) Color
                  </Label>
                  <div className="flex gap-3 items-center">
                    <input
                      id="fg-color"
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="h-12 w-20 rounded border border-input cursor-pointer focus:ring-2 focus:ring-ring focus:outline-none"
                      aria-label="Choose foreground color"
                    />
                    <input
                      type="text"
                      value={foregroundColor.toUpperCase()}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-md border border-input bg-background font-mono text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                      pattern="^#[0-9A-Fa-f]{6}$"
                      maxLength={7}
                      aria-label="Foreground color hex code"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div className="space-y-2">
                  <Label htmlFor="bg-color" className="text-sm font-medium">
                    Background Color
                  </Label>
                  <div className="flex gap-3 items-center">
                    <input
                      id="bg-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="h-12 w-20 rounded border border-input cursor-pointer focus:ring-2 focus:ring-ring focus:outline-none"
                      aria-label="Choose background color"
                    />
                    <input
                      type="text"
                      value={backgroundColor.toUpperCase()}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-md border border-input bg-background font-mono text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                      pattern="^#[0-9A-Fa-f]{6}$"
                      maxLength={7}
                      aria-label="Background color hex code"
                    />
                  </div>
                </div>

                {/* Lightness Slider */}
                <div className="space-y-3">
                  <Label htmlFor="lightness-slider" className="text-sm font-medium">
                    Background Lightness: {lightness}%
                  </Label>
                  <Slider
                    id="lightness-slider"
                    value={[lightness]}
                    onValueChange={handleLightnessChange}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                    aria-label="Adjust background lightness"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contrast Ratio Display */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">
                    Contrast Ratio
                  </div>
                  <div className="text-5xl font-bold text-foreground mb-3">
                    {contrastRatio.toFixed(2)}:1
                  </div>
                  <div 
                    className={`text-lg font-semibold ${passesAA ? 'text-primary' : 'text-destructive'}`}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {passesAA ? '✓ Pass AA' : '✗ Fail'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    WCAG AA requires ≥ 4.5:1 for normal text
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Preview Section */}
          <section className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-6 rounded-lg border-2 border-dashed border-border"
                  style={{ 
                    backgroundColor: backgroundColor,
                    color: foregroundColor 
                  }}
                >
                  <h2 className="text-2xl font-bold mb-3">
                    Sample Heading
                  </h2>
                  <p className="mb-4 leading-relaxed">
                    This is sample paragraph text to help you see how your color choices 
                    look in practice. Good contrast makes content easier to read for everyone.
                  </p>
                  <button
                    className="px-4 py-2 rounded-md font-medium border-2 transition-opacity hover:opacity-80 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    style={{
                      backgroundColor: foregroundColor,
                      color: backgroundColor,
                      borderColor: foregroundColor
                    }}
                    aria-label="Sample button"
                  >
                    Sample Button
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Success Section */}
            {passesAA && (
              <Card className="border-primary bg-primary/5">
                <CardContent className="pt-6">
                  {alreadyClaimed && (
                    <div className="mb-4 p-3 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        ✓ Practice mode—XP already claimed today.
                      </p>
                    </div>
                  )}
                  <div className="text-center space-y-4">
                    <CheckCircle2 className="h-16 w-16 text-primary mx-auto" aria-hidden="true" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Success!
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your color combination passes WCAG AA standards
                      </p>
                      {passesAAA && (
                        <p className="text-sm font-semibold text-primary mt-1">
                          🌟 Bonus: AAA standard achieved! (+10 XP)
                        </p>
                      )}
                    </div>
                    <Button 
                      size="lg" 
                      disabled={alreadyClaimed}
                      onClick={handleClaimRewards}
                      className="w-full"
                      aria-label={alreadyClaimed ? "Rewards already claimed today" : "Claim badge and XP"}
                    >
                      {alreadyClaimed ? "Claimed for Today" : "Claim Badge & XP"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContrastQuest;
