import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Phone Device */}
      <div className="relative">
        {/* Phone Frame */}
        <div className="relative h-[812px] w-[375px] overflow-hidden rounded-[3rem] border-[14px] border-slate-800 bg-slate-800 shadow-2xl shadow-black/50">
          {/* Dynamic Island / Notch */}
          <div className="absolute left-1/2 top-2 z-50 h-[34px] w-[126px] -translate-x-1/2 rounded-full bg-black" />
          
          {/* Screen Content */}
          <div className="h-full w-full overflow-hidden rounded-[2.2rem] bg-background">
            <div className="h-full overflow-y-auto scrollbar-hide">
              {children}
            </div>
          </div>
          
          {/* Screen Glare Effect */}
          <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
        </div>
        
        {/* Side Buttons */}
        <div className="absolute -left-[2px] top-[120px] h-8 w-1 rounded-l-sm bg-slate-700" />
        <div className="absolute -left-[2px] top-[170px] h-16 w-1 rounded-l-sm bg-slate-700" />
        <div className="absolute -left-[2px] top-[240px] h-16 w-1 rounded-l-sm bg-slate-700" />
        <div className="absolute -right-[2px] top-[180px] h-20 w-1 rounded-r-sm bg-slate-700" />
        
        {/* Reflection */}
        <div className="pointer-events-none absolute -inset-4 rounded-[4rem] bg-gradient-to-b from-white/5 to-transparent opacity-50" />
      </div>
    </div>
  );
};

export default PhoneFrame;
