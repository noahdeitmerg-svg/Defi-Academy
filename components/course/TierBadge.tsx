import type { Tier } from "@/data/types";
import { Badge } from "@/components/ui/Badge";

export function TierBadge({ tier }: { tier: Tier }) {
  return <Badge variant="tier" value={tier} />;
}
