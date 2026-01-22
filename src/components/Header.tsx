import { Bell, Search, User } from "lucide-react";
import GooglePayLogo from "./GooglePayLogo";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <GooglePayLogo />

        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Search className="h-5 w-5" />
          </button>
          <button className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-google-red" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-google-blue text-white">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
