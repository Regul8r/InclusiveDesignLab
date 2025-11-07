import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getProgress, getLevel, isLocalStorageAvailable } from "@/lib/xp";

const Arcade = () => {
  const [progress, setProgress] = useState({ xp: 0, badges: [] });
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    setStorageAvailable(isLocalStorageAvailable());
    setProgress(getProgress());
  }, []);

  const level = getLevel(progress.xp);
  const xpInCurrentLevel = progress.xp % 100;
  const progressPercentage = xpInCurrentLevel;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <header className="text-center mb-12" role="banner">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Design Arcade by Prototykes
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Learn design by playing!
          </p>
        </header>

        {/* Progress Summary */}
        <section 
          className="mb-8 p-6 bg-card border border-border rounded-lg shadow-sm"
          aria-label="Your progress"
        >
          <div className="space-y-4">
            {/* Level & Stats */}
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Level {level}</div>
                <div className="text-sm text-muted-foreground">{progress.xp} XP</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{progress.badges.length}</div>
                <div className="text-sm text-muted-foreground">Badges</div>
              </div>
            </div>

            {/* Progress Bar to Next Level */}
            <div className="max-w-md mx-auto space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Level {level}</span>
                <span>{xpInCurrentLevel}/100 XP</span>
                <span>Level {level + 1}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Complete quests to unlock badges and earn XP!
            </p>

            {/* Storage Warning */}
            {!storageAvailable && (
              <p className="text-xs text-center text-destructive bg-destructive/10 p-2 rounded">
                ⚠️ Progress will reset when you close the tab.
              </p>
            )}
          </div>
        </section>

        {/* Game Cards */}
        <section aria-label="Available games">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Games</h2>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Play Contrast Quest</CardTitle>
              <CardDescription>
                Master color contrast and accessibility by choosing color pairs that pass WCAG standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/arcade/contrast-quest">
                <Button 
                  size="lg" 
                  className="w-full md:w-auto"
                  aria-label="Start playing Contrast Quest"
                >
                  Start Game
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Privacy Footer */}
      <footer 
        className="mt-16 pb-8 text-center text-sm text-muted-foreground px-4"
        role="contentinfo"
      >
        <p>
          🔒 We don't collect personal data. Your progress is saved on this device.
        </p>
      </footer>
    </div>
  );
};

export default Arcade;
