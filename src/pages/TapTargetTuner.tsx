import { useState } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

const TapTargetTuner = () => {
  const [size, setSize] = useState(36);
  const [showOverlay, setShowOverlay] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const isPassing = size >= 44;
  const targetTaps = 3;

  const handleSizeChange = (value: number[]) => {
    setSize(value[0]);
    setTapCount(0);
  };

  const handleTargetTap = () => {
    if (!isPassing) return;
    const newCount = tapCount + 1;
    setTapCount(newCount);
  };

  const statusColor = isPassing ? "text-emerald-400" : "text-rose-400";
  const statusIcon = isPassing ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <nav className="mb-6">
          <Link
            to="/arcade"
            className="inline-flex items-center rounded-lg bg-slate-50/10 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-50/20 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tasks
          </Link>
        </nav>

        <header className="mb-8 space-y-1">
          <h1 className="text-2xl font-bold">Tap Target Comfort Check</h1>
          <p className="text-sm text-slate-300">
            Adjust the size and feel how much easier it is to tap a button once it meets common
            guidelines (around 44–48 px on touch screens).
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 glass-card">
            {/* Controls */}
            <div className="space-y-3">
              <Label htmlFor="size-slider" className="text-base font-medium text-slate-200">
                Target Size: {size}×{size} px
              </Label>
              <Slider
                id="size-slider"
                min={24}
                max={80}
                step={1}
                value={[size]}
                onValueChange={handleSizeChange}
                aria-describedby="size-description"
                className="w-full"
              />
              <p id="size-description" className="text-sm text-slate-400">
                Adjust the button size to meet accessibility standards.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Switch
                id="overlay-toggle"
                checked={showOverlay}
                onCheckedChange={setShowOverlay}
              />
              <Label htmlFor="overlay-toggle" className="text-base font-medium cursor-pointer text-slate-200">
                Show thumb reach overlay
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Switch
                id="test-mode-toggle"
                checked={testMode}
                onCheckedChange={setTestMode}
              />
              <Label htmlFor="test-mode-toggle" className="text-base font-medium cursor-pointer text-slate-200">
                Try to Tap Me mode ({tapCount}/{targetTaps})
              </Label>
            </div>
          </div>

          <div className="space-y-3">
            <div className="glass-card">
              {/* Preview */}
              <div className="py-12 relative">
                {/* Thumb reach overlay */}
                {showOverlay && (
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-sky-500/30 bg-sky-500/5 pointer-events-none"
                    style={{ width: '56px', height: '56px' }}
                    aria-hidden="true"
                  />
                )}

                {/* Target Button */}
                <div className="flex flex-col items-center gap-4">
                  <button
                    style={{ width: `${size}px`, height: `${size}px` }}
                    className="shrink-0 transition-all duration-200 rounded-lg bg-sky-500 text-slate-950 font-semibold hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={testMode ? handleTargetTap : undefined}
                    disabled={testMode && !isPassing}
                    aria-label={testMode ? `Tap target button, ${tapCount} of ${targetTaps} taps` : "Target button preview"}
                  >
                    {testMode ? `${tapCount}/${targetTaps}` : "Target"}
                  </button>

                  {/* Size readout */}
                  <div className="text-center" role="status" aria-live="polite">
                    <p className="text-sm font-mono text-slate-300">
                      {size}×{size} px
                    </p>
                    <div className={`flex items-center gap-2 justify-center mt-2 font-semibold ${statusColor}`}>
                      {statusIcon}
                      <span>{isPassing ? "PASS" : "FAIL"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 text-xs text-slate-200">
              <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Why this check matters
              </h2>
              <p>
                Small tap targets can be frustrating for users with larger hands, motor
                impairments, or when they're walking and using your app one-handed.
              </p>
            </div>
          </div>
        </section>

        {/* Feedback */}
        {testMode && !isPassing && (
          <div className="mt-6 p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-200" role="alert">
            <p className="text-sm">
              💡 <strong>Tip:</strong> Targets under 44×44 are harder to hit—especially on small screens.
              Increase the size to enable the tap test.
            </p>
          </div>
        )}

        {/* Success */}
        {tapCount >= targetTaps && (
          <div className="mt-6 p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-200" role="alert">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <p className="font-semibold">
                Great job! You successfully tapped the button {targetTaps} times!
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TapTargetTuner;
