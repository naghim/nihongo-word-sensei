import { Button } from "@/components/ui/button";
import { Play, Coffee } from "lucide-react";

interface PauseOverlayProps {
  onResume: () => void;
}

export const PauseOverlay = ({ onResume }: PauseOverlayProps) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-lg" />

      <div className="relative bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 p-8 max-w-md w-full shadow-2xl">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <Coffee className="h-12 w-12 text-primary" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Quiz Paused</h2>
            <p className="text-muted-foreground">
              Take a breather. The timer is stopped.
            </p>
          </div>

          {/* Resume button */}
          <Button
            size="lg"
            onClick={onResume}
            className="w-full justify-center rounded-xl px-6 py-6 text-base font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] bg-primary hover:bg-primary/90"
          >
            <Play className="w-5 h-5 mr-2" />
            Resume Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};
