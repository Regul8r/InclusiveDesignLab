import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Home, Search, List, FileText, ShoppingCart, CheckCircle, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

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
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav className="mb-6">
          <Link
            to="/arcade"
            className="inline-flex items-center rounded-lg bg-slate-50/10 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-50/20 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tasks
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8 space-y-1">
          <h1 className="text-2xl font-bold">
            Task Flow Clarity Check
          </h1>
          <p className="text-sm text-slate-300">
            Reorder the screens to match how a person would actually move through this journey —
            from landing on Home to confirming their action.
          </p>
        </header>

        {/* Draggable Cards */}
        <section className="mb-6" aria-label="Screen cards">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {cards.map((screen, index) => {
              const Icon = screen.icon;
              return (
                <div
                  key={screen.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className="glass-card cursor-move hover:shadow-[0_0_60px_rgba(15,23,42,0.9)] transition-shadow relative"
                  role="article"
                  aria-label={`${screen.label} card, position ${index + 1}`}
                >
                  <div className="absolute top-2 left-2 text-xs font-bold text-slate-400">
                    {index + 1}
                  </div>
                  <Icon className="w-8 h-8 mx-auto text-sky-400 mb-2" aria-hidden="true" />
                  <h3 className="text-center text-base font-semibold">{screen.label}</h3>
                  
                  {/* Keyboard controls */}
                  <div className="pt-3 flex gap-2 justify-center">
                    <button
                      className="rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-1 text-sm hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed"
                      onClick={() => moveCard(index, "left")}
                      disabled={index === 0}
                      aria-label={`Move ${screen.label} left`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="rounded-lg border border-slate-600 bg-slate-800/50 px-3 py-1 text-sm hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed"
                      onClick={() => moveCard(index, "right")}
                      disabled={index === cards.length - 1}
                      aria-label={`Move ${screen.label} right`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Check Button */}
          <div className="text-center">
            <button
              className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              onClick={handleCheckFlow}
            >
              Check Flow
            </button>
          </div>
        </section>

        {/* Result Feedback */}
        {checked && (
          <section aria-live="polite" className="mb-6">
            {isPassing ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <h3 className="font-semibold">Perfect! Flow Completed</h3>
                  </div>
                  <p className="text-sm">
                    This sequence makes sense: Users start at <strong>Home</strong>, use <strong>Search</strong> to find items, 
                    view <strong>Results</strong>, select a <strong>Detail</strong> page, <strong>Add to Cart</strong>, 
                    and finally <strong>Confirm</strong> their purchase. Well done!
                  </p>
                </div>

                {/* Learning Note */}
                <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 text-sm text-slate-200">
                  <p>
                    <strong className="text-slate-100">📚 Design Insight:</strong> Task flows map the steps users take to complete a goal. 
                    Good flows minimize friction, follow logical sequences, and match mental models.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-rose-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5" />
                  <h3 className="font-semibold">Flow Needs Adjustment</h3>
                </div>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Hints */}
        <section className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold mb-3">💡 Hints</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>• Start with the entry point users typically see first</li>
            <li>• Results should appear before a Detail page</li>
            <li>• Users add items to cart before confirming their order</li>
            <li>• Confirm should be the final step</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default StoryFlowShuffle;
