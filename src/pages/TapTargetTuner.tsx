import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";

const TapTargetTuner = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-2xl">
        <Link to="/arcade">
          <Button variant="ghost" className="mb-6" aria-label="Back to arcade">
            <ArrowLeft className="mr-2" />
            Back to Arcade
          </Button>
        </Link>

        <Card className="border-2 border-dashed">
          <CardHeader className="text-center">
            <Construction className="w-16 h-16 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
            <CardTitle className="text-2xl">Tap Target Tuner</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground text-lg">
              <strong>Goal:</strong> Resize interactive elements to reach the 44×44 pixel minimum touch target.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                🚧 Coming Soon
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              This quest will teach you about touch target sizes and mobile accessibility standards.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TapTargetTuner;
