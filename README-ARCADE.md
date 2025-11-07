# Prototykes Design Arcade

Learn design principles through interactive games designed for kids and beginners.

## Available Quests

### Contrast Quest
**What it teaches:**
- WCAG color contrast requirements (AA and AAA levels)
- Relationship between foreground and background colors
- How to calculate and interpret contrast ratios
- Why contrast matters for accessibility and readability

**Gameplay:**
- Adjust foreground and background colors using color pickers or a lightness slider
- Watch the contrast ratio update in real-time
- Achieve a ratio ≥ 4.5:1 to pass WCAG AA standards
- Earn bonus XP for achieving ≥ 7.0:1 (AAA level)
- Claim badge and XP once per day

### Tap Target Tuner (Coming Soon)
Learn about minimum touch target sizes (44×44 pixels) and mobile accessibility.

### Story Flow Shuffle (Coming Soon)
Master user flows and information architecture by arranging app screens in the correct order.

## Progress System

### XP & Levels
- Earn XP by completing quests
- Every 100 XP = 1 level
- Progress is tracked locally and persists between sessions

### Badges
- Earn badges by completing specific achievements
- Each badge can only be earned once
- Badges display earned date and XP value

### Daily Rewards
- Quest rewards can be claimed once per 24 hours (based on UTC date)
- After claiming, you can continue practicing but won't earn additional XP until the next day
- This encourages consistent learning without grinding

## Data Storage

All progress is stored locally in your browser using `localStorage` under the key:
```
prototykes_arcade_progress
```

**Structure:**
```typescript
{
  xp: number,
  badges: Array<{
    id: string,
    name: string,
    description?: string,
    earnedAt?: string, // ISO timestamp
    xp?: number
  }>,
  lastAwards?: Record<string, string> // Quest ID → YYYY-MM-DD
}
```

### Reset Progress
To reset your progress, open the browser console and run:
```javascript
localStorage.removeItem("prototykes_arcade_progress")
```
Then refresh the page.

### Privacy
- No data is sent to external servers
- All progress is stored locally on your device
- If localStorage is unavailable (e.g., private browsing), progress will reset when the tab closes

## Adding a New Quest

### 1. Create the Quest Page Component
Create a new file in `src/pages/YourQuestName.tsx`:
```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { awardBadge, awardXp, hasClaimedToday, updateLastAward, getTodayDateString } from "@/lib/xp";
import { toast } from "sonner";

const YourQuestName = () => {
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  
  // Check if already claimed today on mount
  useEffect(() => {
    setAlreadyClaimed(hasClaimedToday('your-quest-id'));
  }, []);

  const handleClaim = () => {
    if (alreadyClaimed) {
      // Show practice mode message
      return;
    }

    // Award badge and XP
    awardBadge({
      id: "unique-badge-id",
      name: "Badge Name",
      xp: 50
    });
    awardXp(50);
    updateLastAward('your-quest-id', getTodayDateString());
    
    setAlreadyClaimed(true);
    toast.success("You earned 50 XP!");
  };

  return (
    // Your quest UI here
  );
};

export default YourQuestName;
```

### 2. Add Route
Update `src/App.tsx`:
```tsx
import YourQuestName from "./pages/YourQuestName";

// In the Routes:
<Route path="/arcade/your-quest-name" element={<YourQuestName />} />
```

### 3. Add to Arcade Page
Update `src/pages/Arcade.tsx` to add a card linking to your quest.

### 4. Quest Design Tips
- **Clear goal:** State what the player needs to achieve
- **Immediate feedback:** Show progress in real-time
- **Visual success:** Make completion satisfying (consider confetti, animations)
- **Learning value:** Ensure the quest teaches a concrete design principle

## Accessibility Checklist

All quests follow these accessibility standards:

- ✅ **Keyboard navigation:** All interactive elements are accessible via keyboard
- ✅ **Focus indicators:** Visible focus states on all interactive elements (high-contrast ring)
- ✅ **ARIA labels:** Proper `aria-label` and `aria-labelledby` attributes
- ✅ **Live regions:** Dynamic content changes announced via `aria-live="polite"`
- ✅ **Semantic HTML:** Proper use of headings, sections, and landmarks
- ✅ **Color independence:** Information not conveyed by color alone
- ✅ **Touch targets:** Interactive elements meet minimum 44×44 pixel size
- ✅ **Screen reader support:** All functionality is screen-reader accessible

### Testing
- Test with keyboard only (Tab, Enter, Space, Arrow keys)
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Test focus order is logical
- Verify all dynamic content is announced

## Technology Stack

- **React** with TypeScript
- **Tailwind CSS** for styling (using semantic design tokens)
- **Radix UI** components for accessibility
- **React Router** for navigation
- **Sonner** for toast notifications
- **Lucide React** for icons

## License

This is an educational project by Prototykes.
