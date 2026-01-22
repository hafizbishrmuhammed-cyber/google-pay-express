import { useState, useEffect } from "react";
import { X, Fingerprint, Lock, KeyRound, CheckCircle2, XCircle, Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import GooglePayLogo from "./GooglePayLogo";

type PaymentState = "idle" | "auth" | "confirm" | "processing" | "success" | "failed";

interface PaymentFlowProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  merchantName: string;
  cardLast4?: string;
  cardType?: "visa" | "mastercard";
}

const PaymentFlow = ({
  isOpen,
  onClose,
  amount,
  merchantName,
  cardLast4 = "1234",
  cardType = "visa",
}: PaymentFlowProps) => {
  const [state, setState] = useState<PaymentState>("idle");
  const [authMethod, setAuthMethod] = useState<"fingerprint" | "pin" | "lock" | null>(null);
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (isOpen) {
      setState("auth");
      setPin("");
      setAuthMethod(null);
    }
  }, [isOpen]);

  const handleAuthMethod = (method: "fingerprint" | "pin" | "lock") => {
    setAuthMethod(method);
    if (method === "fingerprint" || method === "lock") {
      // Simulate biometric auth
      setTimeout(() => {
        setState("confirm");
      }, 1500);
    }
  };

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      setState("confirm");
    }
  };

  const handlePay = () => {
    setState("processing");
    // Simulate payment processing
    setTimeout(() => {
      // 80% success rate for demo
      if (Math.random() > 0.2) {
        setState("success");
      } else {
        setState("failed");
      }
    }, 2500);
  };

  const handleRetry = () => {
    setState("confirm");
  };

  const handleDone = () => {
    setState("idle");
    onClose();
  };

  if (!isOpen) return null;

  const formatAmount = (amt: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={state === "processing" ? undefined : handleDone}
      />

      {/* Payment Sheet */}
      <div className="relative w-full max-w-[375px] animate-slide-up">
        <div className="rounded-t-3xl bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <GooglePayLogo className="h-6" />
            {state !== "processing" && (
              <button
                onClick={handleDone}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Authentication State */}
            {state === "auth" && (
              <div className="space-y-6 text-center">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Confirm your identity
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    to continue with payment
                  </p>
                </div>

                {!authMethod ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleAuthMethod("fingerprint")}
                      className="flex w-full items-center gap-4 rounded-2xl border border-border bg-muted/50 p-4 text-left transition-all hover:bg-muted"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-google-blue/10">
                        <Fingerprint className="h-6 w-6 text-google-blue" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Use your fingerprint</p>
                        <p className="text-sm text-muted-foreground">Touch the sensor</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleAuthMethod("lock")}
                      className="flex w-full items-center gap-4 rounded-2xl border border-border bg-muted/50 p-4 text-left transition-all hover:bg-muted"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-google-green/10">
                        <Lock className="h-6 w-6 text-google-green" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Use your screen lock</p>
                        <p className="text-sm text-muted-foreground">Pattern or password</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleAuthMethod("pin")}
                      className="flex w-full items-center gap-4 rounded-2xl border border-border bg-muted/50 p-4 text-left transition-all hover:bg-muted"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-google-yellow/10">
                        <KeyRound className="h-6 w-6 text-google-yellow" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Enter your PIN</p>
                        <p className="text-sm text-muted-foreground">4-digit UPI PIN</p>
                      </div>
                    </button>
                  </div>
                ) : authMethod === "pin" ? (
                  <div className="space-y-6">
                    <div>
                      <p className="mb-4 text-sm text-muted-foreground">Enter your 4-digit UPI PIN</p>
                      <div className="flex justify-center gap-3">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-14 w-14 rounded-xl border-2 ${
                              pin.length > i
                                ? "border-google-blue bg-google-blue/10"
                                : "border-border bg-muted/50"
                            } flex items-center justify-center text-2xl font-bold`}
                          >
                            {pin.length > i ? "•" : ""}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Number Pad */}
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((num, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            if (num === "del") {
                              setPin(pin.slice(0, -1));
                            } else if (num !== null && pin.length < 4) {
                              const newPin = pin + num;
                              setPin(newPin);
                              if (newPin.length === 4) {
                                setTimeout(() => setState("confirm"), 300);
                              }
                            }
                          }}
                          disabled={num === null}
                          className={`h-14 rounded-xl text-xl font-medium transition-all ${
                            num === null
                              ? "invisible"
                              : "bg-muted hover:bg-muted/80 active:scale-95"
                          }`}
                        >
                          {num === "del" ? "⌫" : num}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <div className="relative">
                      <div className="h-24 w-24 animate-pulse rounded-full bg-google-blue/20" />
                      <Fingerprint className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-google-blue" />
                    </div>
                    <p className="text-muted-foreground">Touch the fingerprint sensor...</p>
                  </div>
                )}
              </div>
            )}

            {/* Confirmation State */}
            {state === "confirm" && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-foreground">Pay with Google Pay</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Fast and secure payments</p>
                </div>

                <div className="space-y-4">
                  {/* Amount */}
                  <div className="rounded-2xl bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-3xl font-bold text-foreground">{formatAmount(amount)}</p>
                  </div>

                  {/* Merchant */}
                  <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Merchant</p>
                      <p className="font-medium text-foreground">{merchantName}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-google-blue/10">
                      <span className="text-lg font-bold text-google-blue">
                        {merchantName.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Payment method</p>
                      <p className="font-medium text-foreground">
                        {cardType === "visa" ? "Visa" : "Mastercard"} •••• {cardLast4}
                      </p>
                    </div>
                    <CreditCard className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                    onClick={handleDone}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 h-12 rounded-xl bg-google-blue hover:bg-google-blue/90"
                    onClick={handlePay}
                  >
                    Pay
                  </Button>
                </div>
              </div>
            )}

            {/* Processing State */}
            {state === "processing" && (
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full border-4 border-google-blue/20" />
                  <Loader2 className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-spin text-google-blue" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Processing payment…</h2>
                  <p className="mt-2 text-sm text-muted-foreground">Please don't close the app.</p>
                </div>
              </div>
            )}

            {/* Success State */}
            {state === "success" && (
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-google-green/10">
                  <CheckCircle2 className="h-12 w-12 text-google-green" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Payment successful</h2>
                  <p className="mt-2 text-muted-foreground">
                    You paid {merchantName}
                  </p>
                  <p className="text-2xl font-bold text-foreground">{formatAmount(amount)}</p>
                </div>
                <Button
                  className="w-full h-12 rounded-xl bg-google-green hover:bg-google-green/90"
                  onClick={handleDone}
                >
                  Done
                </Button>
              </div>
            )}

            {/* Failed State */}
            {state === "failed" && (
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-google-red/10">
                  <XCircle className="h-12 w-12 text-google-red" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Payment failed</h2>
                  <p className="mt-2 text-muted-foreground">
                    Something went wrong.<br />
                    Please try again.
                  </p>
                </div>
                <div className="flex w-full gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                    onClick={handleDone}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 h-12 rounded-xl bg-google-blue hover:bg-google-blue/90"
                    onClick={handleRetry}
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Safe Area */}
          <div className="h-8 bg-card" />
        </div>
      </div>
    </div>
  );
};

export default PaymentFlow;
