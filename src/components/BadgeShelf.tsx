import { Badge } from "@/lib/xp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

interface BadgeShelfProps {
  badges: Badge[];
}

const BadgeShelf = ({ badges }: BadgeShelfProps) => {
  if (badges.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <Award className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">
          No badges earned yet. Complete quests to earn your first badge!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {badges.map((badge) => (
        <Card key={badge.id} className="relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Award className="w-6 h-6 text-accent" aria-hidden="true" />
          </div>
          <CardHeader>
            <CardTitle className="text-lg">{badge.name}</CardTitle>
            {badge.description && (
              <CardDescription>{badge.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {badge.xp && <p className="font-semibold text-primary">+{badge.xp} XP</p>}
            {badge.earnedAt && (
              <p className="text-xs mt-1">
                Earned: {new Date(badge.earnedAt).toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BadgeShelf;
