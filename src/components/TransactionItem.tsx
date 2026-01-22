import { ArrowDownLeft, ArrowUpRight, Coffee, ShoppingBag, Zap, Music, Film, Utensils } from "lucide-react";

interface TransactionItemProps {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: "incoming" | "outgoing";
  category: "shopping" | "food" | "entertainment" | "utilities" | "music" | "coffee";
  date: string;
}

const categoryIcons = {
  shopping: ShoppingBag,
  food: Utensils,
  entertainment: Film,
  utilities: Zap,
  music: Music,
  coffee: Coffee,
};

const categoryColors = {
  shopping: "bg-google-blue/10 text-google-blue",
  food: "bg-google-red/10 text-google-red",
  entertainment: "bg-google-yellow/10 text-google-yellow",
  utilities: "bg-google-green/10 text-google-green",
  music: "bg-purple-100 text-purple-600",
  coffee: "bg-amber-100 text-amber-600",
};

const TransactionItem = ({
  title,
  description,
  amount,
  type,
  category,
  date,
}: TransactionItemProps) => {
  const Icon = categoryIcons[category];
  const colorClass = categoryColors[category];

  return (
    <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md animate-fade-in">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colorClass}`}>
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1">
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="text-right">
        <div className="flex items-center gap-1">
          {type === "incoming" ? (
            <ArrowDownLeft className="h-4 w-4 text-success" />
          ) : (
            <ArrowUpRight className="h-4 w-4 text-destructive" />
          )}
          <span
            className={`font-semibold ${
              type === "incoming" ? "text-success" : "text-foreground"
            }`}
          >
            {type === "incoming" ? "+" : "-"}₹{amount.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
