import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Arcade = () => {

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Hero Section */}
        <header className="mb-10" role="banner">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Are You Designing With Everyone in Mind?
          </h1>
          <p className="text-sm text-muted-foreground">
            Use these short accessibility tasks to see how your interfaces feel in real-life
            conditions — from color contrast to tap targets and task flows.
          </p>
        </header>

        {/* Task Cards */}
        <section aria-label="Accessibility tasks" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-5">
              <CardTitle className="text-lg font-semibold">Color & Text Contrast Check</CardTitle>
              <CardDescription className="mt-1 text-sm">
                Test your text and background colors against common contrast guidelines so more
                people can read comfortably.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <Link to="/arcade/contrast-quest">
                <Button 
                  variant="outline"
                  className="w-full rounded-xl"
                  aria-label="Test your accessibility with Contrast Check"
                >
                  Test your accessibility
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-5">
              <CardTitle className="text-lg font-semibold">Tap Target Comfort Check</CardTitle>
              <CardDescription className="mt-1 text-sm">
                Adjust button size to feel the difference once targets reach around 44–48 px on
                touch screens.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <Link to="/arcade/tap-target-tuner">
                <Button 
                  variant="outline"
                  className="w-full rounded-xl"
                  aria-label="Try the Tap Target task"
                >
                  Try this task
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-5">
              <CardTitle className="text-lg font-semibold">Task Flow Clarity Check</CardTitle>
              <CardDescription className="mt-1 text-sm">
                Arrange a simple shopping journey and see how flow order affects clarity and
                user confidence.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <Link to="/arcade/story-flow-shuffle">
                <Button 
                  variant="outline"
                  className="w-full rounded-xl"
                  aria-label="Try the Task Flow task"
                >
                  Try this task
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Privacy Footer */}
      <footer 
        className="mt-10 pb-8 text-center text-xs text-muted-foreground px-4"
        role="contentinfo"
      >
        <p>
          No logins, no tracking — these tasks run in the browser so you can focus on how the
          experience feels for different users.
        </p>
      </footer>
    </div>
  );
};

export default Arcade;
