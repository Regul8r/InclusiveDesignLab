export type Badge = {
  id: string;
  name: string;
  description?: string;
  earnedAt?: string;
  xp?: number;
};

export type Progress = {
  xp: number;
  badges: Badge[];
  lastAwards?: Record<string, string>; // per-quest date stamps
};

const KEY = "prototykes_arcade_progress";

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

export const getProgress = (): Progress => {
  if (!isLocalStorageAvailable()) {
    return { xp: 0, badges: [] };
  }

  try {
    const stored = localStorage.getItem(KEY);
    if (!stored) {
      return { xp: 0, badges: [] };
    }
    return JSON.parse(stored) as Progress;
  } catch {
    return { xp: 0, badges: [] };
  }
};

export const saveProgress = (progress: Progress): void => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
};

export const awardXp = (amount: number): Progress => {
  const current = getProgress();
  const updated = {
    ...current,
    xp: current.xp + amount,
  };
  saveProgress(updated);
  return updated;
};

export const awardBadge = (badge: Badge): Progress => {
  const current = getProgress();
  
  // Check if badge already earned
  const alreadyEarned = current.badges.some((b) => b.id === badge.id);
  if (alreadyEarned) {
    return current;
  }

  // Add earned timestamp if not present
  const badgeWithTimestamp = {
    ...badge,
    earnedAt: badge.earnedAt || new Date().toISOString(),
  };

  const updated = {
    ...current,
    badges: [...current.badges, badgeWithTimestamp],
  };
  
  saveProgress(updated);
  return updated;
};

export const getLevel = (xp: number): number => {
  return Math.floor(xp / 100);
};

export { isLocalStorageAvailable };
