import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Arcade = () => {
  // TODO: Load progress from localStorage with graceful fallback
  const xp = 0;
  const badges = 0;

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
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{xp}</div>
              <div className="text-sm text-muted-foreground">XP</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">{badges}</div>
              <div className="text-sm text-muted-foreground">Badges</div>
            </div>
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
