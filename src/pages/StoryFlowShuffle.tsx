import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, List, FileText, ShoppingCart, CheckCircle, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { awardXp, hasClaimedToday, updateLastAward, getTodayDateString } from "@/lib/xp";
import { useToast } from "@/hooks/use-toast";

type Screen = {
  id: string;
  label: string;
  icon: typeof Home;
};

const SCREENS: Screen[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "results", label: "Results", icon: List },
  { id: "detail", label: "Detail", icon: FileText },
  { id: "cart", label: "Add to Cart", icon: ShoppingCart },
  { id: "confirm", label: "Confirm", icon: CheckCircle },
];

const CORRECT_ORDER = ["home", "search", "results", "detail", "cart", "confirm"];

const StoryFlowShuffle = () => {
  // Shuffle on mount for variety
  const [cards, setCards] = useState<Screen[]>(() => {
    const shuffled = [...SCREENS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [isPassing, setIsPassing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [checkCount, setCheckCount] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    setAlreadyClaimed(hasClaimedToday("story-flow-shuffle"));
  }, []);

  // Drag handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null) return;
    
    const newCards = [...cards];
    const [draggedCard] = newCards.splice(draggedIndex, 1);
    newCards.splice(dropIndex, 0, draggedCard);
    
    setCards(newCards);
    setDraggedIndex(null);
    setChecked(false); // Reset check when order changes
  };

  // Keyboard move handlers
  const moveCard = (index: number, direction: "left" | "right") => {
    const newIndex = direction === "left" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= cards.length) return;

    const newCards = [...cards];
    [newCards[index], newCards[newIndex]] = [newCards[newIndex], newCards[index]];
    setCards(newCards);
    setChecked(false);
  };

  // Check flow logic
  const handleCheckFlow = () => {
    const currentOrder = cards.map(c => c.id);
    const newErrors: string[] = [];
    let allCorrect = true;

    currentOrder.forEach((id, idx) => {
      if (id !== CORRECT_ORDER[idx]) {
        allCorrect = false;
        const expectedLabel = SCREENS.find(s => s.id === CORRECT_ORDER[idx])?.label;
        const actualLabel = SCREENS.find(s => s.id === id)?.label;
        newErrors.push(`Position ${idx + 1}: Got "${actualLabel}" but should be "${expectedLabel}"`);
      }
    });

    setIsPassing(allCorrect);
    setErrors(newErrors);
    setChecked(true);
    setCheckCount(prev => prev + 1);

    // Enable claim if passing and not already claimed
    if (allCorrect && !alreadyClaimed) {
      setCanClaim(true);
    }
  };

  // Claim reward handler
  const handleClaimReward = () => {
    if (alreadyClaimed) {
      toast({
        title: "Practice Mode",
        description: "XP already claimed today. Come back tomorrow!",
      });
      return;
    }

    // Calculate bonus XP: if solved with ≤1 mistake on first check
    let totalXp = 50;
    let bonusAwarded = false;
    if (checkCount === 1 && errors.length <= 1) {
      totalXp += 10;
      bonusAwarded = true;
    }

    awardXp(totalXp);
    updateLastAward("story-flow-shuffle", getTodayDateString());

    setAlreadyClaimed(true);
    setCanClaim(false);

    toast({
      title: "Success! 🎉",
      description: bonusAwarded 
        ? `+${totalXp} XP (including +10 bonus for solving quickly!)`
        : `+${totalXp} XP earned`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Link to="/arcade">
          <Button variant="ghost" className="mb-6" aria-label="Back to arcade">
            <ArrowLeft className="mr-2" />
            Back to Arcade
          </Button>
        </Link>

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Story Flow Shuffle
          </h1>
          <p className="text-lg text-muted-foreground">
            Drag the cards to form a user's journey from start to finish.
          </p>
        </header>

        {/* Draggable Cards */}
        <section className="mb-6" aria-label="Screen cards">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {cards.map((screen, index) => {
              const Icon = screen.icon;
              return (
                <Card
                  key={screen.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className="cursor-move hover:shadow-lg transition-shadow relative"
                  role="article"
                  aria-label={`${screen.label} card, position ${index + 1}`}
                >
                  <CardHeader className="pb-3">
                    <div className="absolute top-2 left-2 text-xs font-bold text-muted-foreground">
                      {index + 1}
                    </div>
                    <Icon className="w-8 h-8 mx-auto text-primary mb-2" aria-hidden="true" />
                    <CardTitle className="text-center text-base">{screen.label}</CardTitle>
                  </CardHeader>
                  
                  {/* Keyboard controls */}
                  <CardContent className="pt-0 flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveCard(index, "left")}
                      disabled={index === 0}
                      aria-label={`Move ${screen.label} left`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveCard(index, "right")}
                      disabled={index === cards.length - 1}
                      aria-label={`Move ${screen.label} right`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Check Button */}
          <div className="text-center">
            <Button size="lg" onClick={handleCheckFlow}>
              Check Flow
            </Button>
          </div>
        </section>

        {/* Result Feedback */}
        {checked && (
          <section aria-live="polite" className="mb-6">
            {isPassing ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-200">Perfect! Flow Completed</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-300">
                    This sequence makes sense: Users start at <strong>Home</strong>, use <strong>Search</strong> to find items, 
                    view <strong>Results</strong>, select a <strong>Detail</strong> page, <strong>Add to Cart</strong>, 
                    and finally <strong>Confirm</strong> their purchase. Well done!
                  </AlertDescription>
                </Alert>

                {/* Practice Mode Banner */}
                {alreadyClaimed && (
                  <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <AlertTitle className="text-blue-800 dark:text-blue-200">Practice Mode</AlertTitle>
                    <AlertDescription className="text-blue-700 dark:text-blue-300">
                      XP already claimed today. Come back tomorrow for more rewards!
                    </AlertDescription>
                  </Alert>
                )}

                {/* Claim Reward Button */}
                {canClaim && !alreadyClaimed && (
                  <div className="text-center">
                    <Button size="lg" onClick={handleClaimReward}>
                      Claim Reward
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Complete the flow to earn XP!
                    </p>
                  </div>
                )}

                {/* Learning Note */}
                <div className="bg-muted/30 p-4 rounded-lg text-sm text-muted-foreground">
                  <p>
                    <strong>📚 Design Insight:</strong> Task flows map the steps users take to complete a goal. 
                    Good flows minimize friction, follow logical sequences, and match mental models. 
                    <span className="text-foreground"> Nielsen Norman Group emphasizes designing flows that align with user expectations.</span>
                  </p>
                </div>
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Flow Needs Adjustment</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    {errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </section>
        )}

        {/* Hints */}
        <section className="bg-muted/50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-foreground">💡 Hints</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Start with the entry point users typically see first</li>
            <li>• Results should appear before a Detail page</li>
            <li>• Users add items to cart before confirming their order</li>
            <li>• Confirm should be the final step</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default StoryFlowShuffle;
