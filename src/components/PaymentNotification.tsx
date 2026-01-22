import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import GooglePayLogo from "./GooglePayLogo";

interface PaymentNotificationProps {
  isVisible: boolean;
  amount: number;
  recipientName: string;
  onClose: () => void;
}

const PaymentNotification = ({
  isVisible,
  amount,
  recipientName,
  onClose,
}: PaymentNotificationProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !show) return null;

  const formatAmount = (amt: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div
      className={`fixed left-1/2 top-16 z-50 w-[340px] -translate-x-1/2 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <div className="overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-border">
        <div className="flex items-center gap-3 p-4">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-google-green/10">
            <CheckCircle2 className="h-6 w-6 text-google-green" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <GooglePayLogo className="h-4" />
            </div>
            <p className="mt-0.5 text-sm font-medium text-foreground">
              You sent {formatAmount(amount)} to {recipientName}
            </p>
            <p className="text-xs text-muted-foreground">Paid via Google Pay</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-google-green transition-all duration-[4000ms] ease-linear"
            style={{ width: show ? "0%" : "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentNotification;
