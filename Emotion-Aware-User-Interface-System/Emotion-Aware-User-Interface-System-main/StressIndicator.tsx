import { motion } from 'motion/react';
import { Smile, Meh, Frown } from 'lucide-react';
import { StressLevel } from '../types/exam';
import { cn } from './ui/utils';

interface StressIndicatorProps {
  level: StressLevel;
}

export default function StressIndicator({ level }: StressIndicatorProps) {
  const getStressConfig = () => {
    switch (level) {
      case 'low':
        return {
          icon: Smile,
          label: 'Low Stress',
          color: 'text-green-600',
          bg: 'bg-green-100',
          emoji: '😊'
        };
      case 'medium':
        return {
          icon: Meh,
          label: 'Medium Stress',
          color: 'text-amber-600',
          bg: 'bg-amber-100',
          emoji: '😐'
        };
      case 'high':
        return {
          icon: Frown,
          label: 'High Stress',
          color: 'text-red-600',
          bg: 'bg-red-100',
          emoji: '😰'
        };
    }
  };

  const config = getStressConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-3"
    >
      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-500 mb-1">Stress Level</span>
        <div className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg font-medium",
          config.bg
        )}>
          <span className="text-xl">{config.emoji}</span>
          <span className={cn("text-sm", config.color)}>{config.label}</span>
        </div>
      </div>
      
      {/* Visual Bar */}
      <div className="hidden md:flex flex-col gap-1">
        <div className="flex gap-1">
          {[1, 2, 3].map((bar) => {
            const isActive = 
              (level === 'low' && bar === 1) ||
              (level === 'medium' && bar <= 2) ||
              (level === 'high' && bar <= 3);
            
            return (
              <motion.div
                key={bar}
                initial={{ height: 0 }}
                animate={{ height: isActive ? `${bar * 8}px` : '4px' }}
                className={cn(
                  "w-2 rounded-full transition-colors",
                  isActive ? config.bg : 'bg-gray-200'
                )}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
