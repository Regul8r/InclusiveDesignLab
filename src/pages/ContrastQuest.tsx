import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ContrastQuest = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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

        {/* Coming Soon Placeholder */}
        <main className="text-center py-16">
          <div className="inline-block p-8 bg-card border border-border rounded-lg shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Contrast Quest
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Coming soon…
            </p>
            <div className="text-sm text-muted-foreground">
              Get ready to level up your color contrast skills!
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContrastQuest;
