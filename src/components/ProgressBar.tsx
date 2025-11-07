interface ProgressBarProps {
  xp: number;
}

const ProgressBar = ({ xp }: ProgressBarProps) => {
  const level = Math.floor(xp / 100);
  const xpInCurrentLevel = xp % 100;
  const progressPercentage = xpInCurrentLevel;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Level {level}</span>
        <span>{xpInCurrentLevel}/100 XP</span>
        <span>Level {level + 1}</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={xpInCurrentLevel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress to next level"
        className="h-2 w-full rounded-full bg-muted overflow-hidden"
      >
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
