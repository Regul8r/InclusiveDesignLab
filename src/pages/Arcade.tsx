import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Arcade = () => {

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

            <Card className="hover:shadow-md transition-shadow">
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

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Story Flow Shuffle</CardTitle>
                <CardDescription>
                  Arrange screens in logical order to complete user tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/arcade/story-flow-shuffle">
                  <Button 
                    size="lg" 
                    className="w-full"
                    aria-label="Play Story Flow Shuffle"
                  >
                    Play Now
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
