import { motion } from 'motion/react';
import { X, Heart, Wind, Sparkles } from 'lucide-react';
import { StressLevel } from '../types/exam';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { cn } from './ui/utils';

interface StressFeedbackProps {
  level: StressLevel;
  onDismiss: () => void;
}

export default function StressFeedback({ level, onDismiss }: StressFeedbackProps) {
  const getMessage = () => {
    switch (level) {
      case 'low':
        return {
          title: "You're doing great! 🌟",
          message: "Your stress levels are well managed. Keep up the good work!",
          tips: ["Stay focused", "Maintain your pace"],
          color: "border-green-500",
          bg: "bg-green-50"
        };
      case 'medium':
        return {
          title: "Take a moment to breathe 🌊",
          message: "Your stress is building up. Try these quick techniques:",
          tips: ["Take 3 deep breaths", "Relax your shoulders", "You've got this!"],
          color: "border-amber-500",
          bg: "bg-amber-50"
        };
      case 'high':
        return {
          title: "Let's calm down together 🧘",
          message: "High stress detected. Remember, you can do this:",
          tips: ["Breathe in for 4, out for 4", "Take a 30-second break", "One question at a time"],
          color: "border-red-500",
          bg: "bg-red-50"
        };
    }
  };

  const feedback = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="mb-6"
    >
      <Card className={cn("border-2 shadow-lg", feedback.color)}>
        <CardContent className={cn("p-6", feedback.bg)}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">{feedback.title}</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">{feedback.message}</p>
              <div className="space-y-2">
                {feedback.tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Sparkles className="w-3 h-3 text-blue-500" />
                    <span>{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
