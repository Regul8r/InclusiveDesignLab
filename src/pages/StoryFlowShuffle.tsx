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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
        <nav>
          <Link
            to="/"
            className="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to tasks
          </Link>
        </nav>

        {/* Header */}
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Inclusive Design Lab
          </p>
          <h1 className="text-3xl font-semibold leading-tight">
            Task Flow Clarity Check
          </h1>
          <p className="text-base text-slate-600">
            Reorder the screens to match how a person would actually move through this journey —
            from landing on Home to confirming their action.
          </p>
        </header>

        {/* Draggable Cards */}
        <section aria-label="Screen cards">
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
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm cursor-move hover:shadow-md transition-shadow relative"
                  role="article"
                  aria-label={`${screen.label} card, position ${index + 1}`}
                >
                  <div className="absolute top-2 left-2 text-xs font-bold text-slate-400">
                    {index + 1}
                  </div>
                  <Icon className="w-8 h-8 mx-auto text-slate-900 mb-2" aria-hidden="true" />
                  <h3 className="text-center text-base font-semibold">{screen.label}</h3>
                  
                  {/* Keyboard controls */}
                  <div className="pt-3 flex gap-2 justify-center">
                    <button
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-sm hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                      onClick={() => moveCard(index, "left")}
                      disabled={index === 0}
                      aria-label={`Move ${screen.label} left`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-sm hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
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
              className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
              onClick={handleCheckFlow}
            >
              Check Flow
            </button>
          </div>
        </section>

        {/* Result Feedback */}
        {checked && (
          <section aria-live="polite">
            {isPassing ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-900">
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
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    What this task practices
                  </h2>
                  <p>
                    Task flows map the steps users take to complete a goal. 
                    Good flows minimize friction, follow logical sequences, and match mental models.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl border border-rose-300 bg-rose-50 text-rose-900">
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
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold mb-3">💡 Hints</h2>
          <ul className="space-y-2 text-sm text-slate-600">
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
