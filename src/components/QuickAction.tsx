import { LucideIcon } from "lucide-react";

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  color: "blue" | "red" | "yellow" | "green";
  onClick?: () => void;
}

const colorClasses = {
  blue: "bg-google-blue/10 text-google-blue hover:bg-google-blue/20",
  red: "bg-google-red/10 text-google-red hover:bg-google-red/20",
  yellow: "bg-google-yellow/10 text-google-yellow hover:bg-google-yellow/20",
  green: "bg-google-green/10 text-google-green hover:bg-google-green/20",
};

const QuickAction = ({ icon: Icon, label, color, onClick }: QuickActionProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-200 ${colorClasses[color]} hover:scale-105 active:scale-95`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-current/10">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </button>
  );
};

export default QuickAction;
