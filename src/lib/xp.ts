export type Progress = {
  xp: number;
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
    return { xp: 0 };
  }

  try {
    const stored = localStorage.getItem(KEY);
    if (!stored) {
      return { xp: 0 };
    }
    return JSON.parse(stored) as Progress;
  } catch {
    return { xp: 0 };
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


export const updateLastAward = (questId: string, date: string): Progress => {
  const current = getProgress();
  const updated = {
    ...current,
    lastAwards: {
      ...(current.lastAwards || {}),
      [questId]: date,
    },
  };
  saveProgress(updated);
  return updated;
};

export const getLastAwardDate = (questId: string): string | null => {
  const current = getProgress();
  return current.lastAwards?.[questId] || null;
};

export const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const hasClaimedToday = (questId: string): boolean => {
  const lastAward = getLastAwardDate(questId);
  if (!lastAward) return false;
  return lastAward === getTodayDateString();
};

export const getLevel = (xp: number): number => {
  return Math.floor(xp / 100);
};

export { isLocalStorageAvailable };
