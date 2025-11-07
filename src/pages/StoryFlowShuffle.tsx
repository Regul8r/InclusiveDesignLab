import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";

const StoryFlowShuffle = () => {
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
            <CardTitle className="text-2xl">Story Flow Shuffle</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground text-lg">
              <strong>Goal:</strong> Arrange app screens in the correct order to complete a user task.
            </p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                🚧 Coming Soon
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              This quest will teach you about user flows, navigation patterns, and information architecture.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StoryFlowShuffle;
