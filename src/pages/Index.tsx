import { useState } from "react";
import { Send, Download, Smartphone, Receipt, Wallet, Building } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import BalanceCard from "@/components/BalanceCard";
import PaymentCard from "@/components/PaymentCard";
import QuickAction from "@/components/QuickAction";
import TransactionItem from "@/components/TransactionItem";
import PhoneFrame from "@/components/PhoneFrame";
import PaymentFlow from "@/components/PaymentFlow";
import PaymentNotification from "@/components/PaymentNotification";

const quickActions = [
  { icon: Send, label: "Send", color: "blue" as const },
  { icon: Download, label: "Receive", color: "green" as const },
  { icon: Smartphone, label: "Recharge", color: "yellow" as const },
  { icon: Receipt, label: "Bills", color: "red" as const },
];

const transactions = [
  {
    id: "1",
    title: "Starbucks Coffee",
    description: "Coffee & Snacks",
    amount: 450,
    type: "outgoing" as const,
    category: "coffee" as const,
    date: "Today, 10:30 AM",
  },
  {
    id: "2",
    title: "Salary Credit",
    description: "Monthly Salary",
    amount: 85000,
    type: "incoming" as const,
    category: "utilities" as const,
    date: "Yesterday",
  },
  {
    id: "3",
    title: "Amazon Shopping",
    description: "Electronics",
    amount: 12999,
    type: "outgoing" as const,
    category: "shopping" as const,
    date: "22 Jan 2026",
  },
  {
    id: "4",
    title: "Netflix Subscription",
    description: "Monthly Plan",
    amount: 649,
    type: "outgoing" as const,
    category: "entertainment" as const,
    date: "20 Jan 2026",
  },
  {
    id: "5",
    title: "Spotify Premium",
    description: "Annual Plan",
    amount: 1189,
    type: "outgoing" as const,
    category: "music" as const,
    date: "18 Jan 2026",
  },
];

const Index = () => {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleQuickAction = (label: string) => {
    if (label === "Send") {
      setPaymentOpen(true);
    }
  };

  return (
    <PhoneFrame>
      <div className="min-h-full bg-background pb-24">
        <Header />

        {/* Payment Flow Modal */}
        <PaymentFlow
          isOpen={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          amount={1499}
          merchantName="Swiggy"
          cardLast4="6789"
          cardType="visa"
        />

        {/* Payment Notification */}
        <PaymentNotification
          isVisible={showNotification}
          amount={1499}
          recipientName="Rahul"
          onClose={() => setShowNotification(false)}
        />

      <main className="container mx-auto px-4 py-6">
        {/* Balance Section */}
        <section className="mb-6 animate-slide-up">
          <BalanceCard balance={124567.89} />
        </section>

        {/* Quick Actions */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
            Quick Actions
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <QuickAction
                key={action.label}
                icon={action.icon}
                label={action.label}
                color={action.color}
                onClick={() => handleQuickAction(action.label)}
              />
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Payment Methods
            </h3>
            <button className="text-sm font-medium text-google-blue hover:underline">
              See all
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <PaymentCard
              cardNumber="4532015112830366"
              cardHolder="RAHUL SHARMA"
              expiryDate="12/28"
              type="visa"
              variant="blue"
            />
            <PaymentCard
              cardNumber="5412751234567890"
              cardHolder="RAHUL SHARMA"
              expiryDate="08/27"
              type="mastercard"
              variant="green"
            />
          </div>
        </section>

        {/* More Services */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
            More Services
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center gap-2 rounded-2xl bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-google-blue/10">
                <Wallet className="h-5 w-5 text-google-blue" />
              </div>
              <span className="text-xs font-medium text-foreground">Wallet</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-2xl bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-google-green/10">
                <Building className="h-5 w-5 text-google-green" />
              </div>
              <span className="text-xs font-medium text-foreground">Bank</span>
            </button>
            <button className="flex flex-col items-center gap-2 rounded-2xl bg-card p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-google-red/10">
                <Receipt className="h-5 w-5 text-google-red" />
              </div>
              <span className="text-xs font-medium text-foreground">Rewards</span>
            </button>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Recent Transactions
            </h3>
            <button className="text-sm font-medium text-google-blue hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} {...transaction} />
            ))}
          </div>
        </section>
      </main>

        <BottomNav />
      </div>
    </PhoneFrame>
  );
};

export default Index;
