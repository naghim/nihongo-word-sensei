import { Button } from "@/components/ui/button";
import { Settings, RotateCcw } from "lucide-react";

interface QuizHeaderProps {
  onChangeMode: () => void;
  onReset: () => void;
}

export const QuizHeader = ({ onChangeMode, onReset }: QuizHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-center">
        <h1 className="text-4xl font-japanese font-light text-foreground">
          日本語学習
        </h1>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onChangeMode}
          className="border-gray-200 hover:border-primary/30 hover:bg-gradient-red-soft hover:text-primary transition-all"
        >
          <Settings className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline"> Change mode </span>
        </Button>
        <Button
          variant="outline"
          onClick={onReset}
          className="border-gray-200 hover:border-primary/30 hover:bg-gradient-red-soft hover:text-primary transition-all"
        >
          <RotateCcw className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline"> Reset </span>
        </Button>
      </div>
    </div>
  );
};
