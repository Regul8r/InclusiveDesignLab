import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProgress, getLevel, isLocalStorageAvailable } from "@/lib/xp";
import ProgressBar from "@/components/ProgressBar";
import BadgeShelf from "@/components/BadgeShelf";
import { Award } from "lucide-react";

const Arcade = () => {
  const [progress, setProgress] = useState({ xp: 0, badges: [] });
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    setStorageAvailable(isLocalStorageAvailable());
    setProgress(getProgress());

    // Refresh progress when page becomes visible (user navigates back)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setProgress(getProgress());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const level = getLevel(progress.xp);

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
            <div className="max-w-md mx-auto">
              <ProgressBar xp={progress.xp} />
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

        {/* Badges Section */}
        <section aria-label="Your badges" className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Badges</h2>
          <BadgeShelf badges={progress.badges} />
        </section>

        {/* Game Cards */}
        <section aria-label="Available games">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Games</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Contrast Quest</CardTitle>
                <CardDescription>
                  Master color contrast and accessibility by choosing color pairs that pass WCAG standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/arcade/contrast-quest">
                  <Button 
                    size="lg" 
                    className="w-full"
                    aria-label="Start playing Contrast Quest"
                  >
                    Play Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow relative">
              {progress.badges.some(b => b.id === 'tap-target-ace') && (
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3" aria-hidden="true" />
                  Earned
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">Tap Target Tuner</CardTitle>
                <CardDescription>
                  Master mobile touch targets: size buttons to 44×44px minimum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/arcade/tap-target-tuner">
                  <Button 
                    size="lg" 
                    className="w-full"
                    aria-label="Play Tap Target Tuner"
                  >
                    Play Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-dashed opacity-75 relative">
              {progress.badges.some(b => b.id === 'story-flow-master') && (
                <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3" aria-hidden="true" />
                  Earned
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">Story Flow Shuffle</CardTitle>
                <CardDescription>
                  Learn user flows: arrange screens in the correct task order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/arcade/story-flow-shuffle">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full"
                    aria-label="Preview Story Flow Shuffle (coming soon)"
                  >
                    Coming Soon
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
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
