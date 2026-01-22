import { Home, CreditCard, QrCode, History, User } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: CreditCard, label: "Cards", id: "cards" },
  { icon: QrCode, label: "Scan", id: "scan" },
  { icon: History, label: "History", id: "history" },
  { icon: User, label: "Profile", id: "profile" },
];

const BottomNav = () => {
  const [active, setActive] = useState("home");

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const isActive = active === item.id;
          const isScan = item.id === "scan";

          if (isScan) {
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="relative -mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-google-blue text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
              >
                <item.icon className="h-6 w-6" />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all ${
                isActive
                  ? "text-google-blue"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -bottom-0 h-1 w-8 rounded-full bg-google-blue" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
