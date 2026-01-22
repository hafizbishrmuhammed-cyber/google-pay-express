import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface BalanceCardProps {
  balance: number;
  currency?: string;
}

const BalanceCard = ({ balance, currency = "₹" }: BalanceCardProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-card">
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-google-blue/10" />
      <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-google-green/10" />

      <div className="relative">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Available Balance</p>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </div>

        <h2 className="font-display text-4xl font-bold text-foreground">
          {isVisible ? (
            <>
              {currency}
              {balance.toLocaleString("en-IN")}
            </>
          ) : (
            "••••••"
          )}
        </h2>

        <div className="mt-4 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            +12.5% this month
          </span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
