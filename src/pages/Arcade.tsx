import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Arcade = () => {

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Hero Section */}
        <header className="mb-10" role="banner">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Are You Designing With Everyone in Mind?
          </h1>
          <p className="text-sm text-muted-foreground">
            Use these short tasks to test how your interfaces feel in real-life conditions —
            from tap targets to task flows.
          </p>
        </header>

        {/* Task Cards */}
        <section aria-label="Accessibility tasks" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-5">
              <CardTitle className="text-xl">Tap Target Comfort Check</CardTitle>
              <CardDescription className="mt-1 text-sm">
                See whether your buttons meet recommended touch sizes (around 44–48 px) so people
                don't have to "aim" with their thumbs.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <Link to="/arcade/tap-target-tuner">
                <Button 
                  variant="outline"
                  className="w-full rounded-xl"
                  aria-label="Test your accessibility with Tap Target Tuner"
                >
                  Test your accessibility
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="p-5">
              <CardTitle className="text-xl">Task Flow Clarity Check</CardTitle>
              <CardDescription className="mt-1 text-sm">
                Arrange a simple shopping flow and see how small ordering changes can confuse or
                support users.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <Link to="/arcade/story-flow-shuffle">
                <Button 
                  variant="outline"
                  className="w-full rounded-xl"
                  aria-label="Try the Task Flow Clarity Check"
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
          No logins, no tracking — these tasks run in the browser so you can focus on how the experience feels.
        </p>
      </footer>
    </div>
  );
};

export default Arcade;
