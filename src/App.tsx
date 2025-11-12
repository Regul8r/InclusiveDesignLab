import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Arcade from "./pages/Arcade";
import ContrastQuest from "./pages/ContrastQuest";
import TapTargetTuner from "./pages/TapTargetTuner";
import StoryFlowShuffle from "./pages/StoryFlowShuffle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/arcade" element={<Arcade />} />
          <Route path="/contrast-quest" element={<ContrastQuest />} />
          <Route path="/tap-target-tuner" element={<TapTargetTuner />} />
          <Route path="/story-flow-shuffle" element={<StoryFlowShuffle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
