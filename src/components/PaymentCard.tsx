import { CreditCard, Wifi } from "lucide-react";

interface PaymentCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  type: "visa" | "mastercard";
  variant?: "blue" | "green" | "red";
}

const PaymentCard = ({
  cardNumber,
  cardHolder,
  expiryDate,
  type,
  variant = "blue",
}: PaymentCardProps) => {
  const gradientClass = {
    blue: "card-gradient",
    green: "card-gradient-green",
    red: "card-gradient-red",
  }[variant];

  const maskedNumber = `•••• •••• •••• ${cardNumber.slice(-4)}`;

  return (
    <div
      className={`${gradientClass} relative w-full max-w-sm rounded-2xl p-6 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
    >
      <div className="absolute right-6 top-6">
        <Wifi className="h-6 w-6 rotate-90 opacity-80" />
      </div>

      <div className="mb-8 flex items-center gap-2">
        <CreditCard className="h-8 w-8" />
        <span className="text-sm font-medium uppercase opacity-80">
          {type === "visa" ? "VISA" : "Mastercard"}
        </span>
      </div>

      <div className="mb-6 font-mono text-xl tracking-wider">{maskedNumber}</div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase opacity-60">Card Holder</p>
          <p className="font-medium">{cardHolder}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase opacity-60">Expires</p>
          <p className="font-medium">{expiryDate}</p>
        </div>
      </div>

      {/* Card chip */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2">
        <div className="h-10 w-12 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-90" />
      </div>
    </div>
  );
};

export default PaymentCard;
