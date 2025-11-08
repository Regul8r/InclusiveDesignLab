import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { awardXp, hasClaimedToday, updateLastAward, getTodayDateString } from "@/lib/xp";
import { toast } from "@/hooks/use-toast";

const TapTargetTuner = () => {
  const [size, setSize] = useState(36);
  const [showOverlay, setShowOverlay] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  const isPassing = size >= 44;
  const targetTaps = 3;

  useEffect(() => {
    setAlreadyClaimed(hasClaimedToday('tap-target-tuner'));
  }, []);

  const handleSizeChange = (value: number[]) => {
    setSize(value[0]);
    setTapCount(0); // Reset tap count when size changes
    setTestCompleted(false); // Reset completion when size changes
  };

  const handleTargetTap = () => {
    if (!isPassing) return;
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= targetTaps) {
      // Success! Mark test as completed
      setTestCompleted(true);
    }
  };

  const handleClaimReward = () => {
    if (alreadyClaimed) {
      return; // Already shown in banner
    }

    // Award XP
    awardXp(40);
    updateLastAward('tap-target-tuner', getTodayDateString());
    setAlreadyClaimed(true);

    toast({
      title: "Success! 🎉",
      description: "+40 XP earned",
    });
  };

  const statusColor = isPassing ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
  const statusIcon = isPassing ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <nav className="mb-6">
          <Link to="/arcade">
            <Button variant="outline" className="rounded-lg" aria-label="Back to tasks">
              <ArrowLeft className="mr-2" />
              Back to tasks
            </Button>
          </Link>
        </nav>

        <Card>
          <CardHeader>
            <div className="space-y-1">
              <CardTitle className="text-2xl">Tap Target Comfort Check</CardTitle>
              <p className="text-sm text-muted-foreground">
                Adjust the size and feel how much easier it is to tap a button once it meets common
                guidelines (around 44–48 px on touch screens).
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Controls Section */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="size-slider" className="text-base font-medium">
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
                <p id="size-description" className="text-sm text-muted-foreground">
                  Adjust the button size to meet accessibility standards.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Switch
                  id="overlay-toggle"
                  checked={showOverlay}
                  onCheckedChange={setShowOverlay}
                />
                <Label htmlFor="overlay-toggle" className="text-base font-medium cursor-pointer">
                  Show thumb reach overlay
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <Switch
                  id="test-mode-toggle"
                  checked={testMode}
                  onCheckedChange={setTestMode}
                />
                <Label htmlFor="test-mode-toggle" className="text-base font-medium cursor-pointer">
                  Try to Tap Me mode ({tapCount}/{targetTaps})
                </Label>
              </div>
            </div>

            {/* Preview Section */}
            <Card className="bg-muted/50 border-2">
              <CardContent className="py-12 relative">
                {/* Thumb reach overlay */}
                {showOverlay && (
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/30 bg-primary/5 pointer-events-none"
                    style={{ width: '56px', height: '56px' }}
                    aria-hidden="true"
                  />
                )}

                {/* Target Button */}
                <div className="flex flex-col items-center gap-4">
                  <Button
                    style={{ width: `${size}px`, height: `${size}px` }}
                    className="shrink-0 transition-all duration-200"
                    onClick={testMode ? handleTargetTap : undefined}
                    disabled={testMode && !isPassing}
                    aria-label={testMode ? `Tap target button, ${tapCount} of ${targetTaps} taps` : "Target button preview"}
                  >
                    {testMode ? `${tapCount}/${targetTaps}` : "Target"}
                  </Button>

                  {/* Size readout */}
                  <div className="text-center" role="status" aria-live="polite">
                    <p className="text-sm font-mono">
                      {size}×{size} px
                    </p>
                    <div className={`flex items-center gap-2 justify-center mt-2 font-semibold ${statusColor}`}>
                      {statusIcon}
                      <span>{isPassing ? "PASS" : "FAIL"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            {testMode && !isPassing && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg" role="alert">
                <p className="text-sm text-amber-900 dark:text-amber-200">
                  💡 <strong>Tip:</strong> Targets under 44×44 are harder to hit—especially on small screens.
                  Increase the size to enable the tap test.
                </p>
              </div>
            )}

            {/* Success section with badge claiming */}
            {testCompleted && (
              <Card className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800">
                <CardContent className="pt-6 space-y-4">
                  {alreadyClaimed ? (
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg" role="alert">
                      <p className="text-sm text-amber-900 dark:text-amber-200">
                        ℹ️ Practice mode—XP already claimed today. Come back tomorrow for more rewards!
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-green-900 dark:text-green-200">
                        <CheckCircle2 className="w-5 h-5" />
                        <p className="font-semibold">
                          Great job! You successfully tapped the button {targetTaps} times!
                        </p>
                      </div>
                      <Button 
                        onClick={handleClaimReward}
                        className="w-full"
                        size="lg"
                      >
                        Claim Reward (+40 XP)
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Info card */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Why 44×44 pixels?</h3>
                <p className="text-sm text-muted-foreground">
                  Apple and Google recommend ≥ 44–48 px so thumbs can hit targets without precision.
                  The average adult finger pad is about 10mm wide, which translates to roughly 44 CSS pixels
                  at typical mobile screen densities. Meeting this minimum ensures buttons are
                  comfortable to tap for users of all abilities.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TapTargetTuner;
