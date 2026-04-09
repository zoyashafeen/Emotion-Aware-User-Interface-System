import { useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Trophy, TrendingDown, TrendingUp, Award, Home, Brain } from 'lucide-react';
import { examQuestions } from '../data/questions';
import { Answer, StressData } from '../types/exam';
import { cn } from '../components/ui/utils';

export default function PerformanceSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = [], stressHistory = [], totalTime = 0 } = location.state || {};

  // Calculate score
  const correctAnswers = answers.filter((answer: Answer) => {
    const question = examQuestions.find(q => q.id === answer.questionId);
    return question?.correctAnswer === answer.selectedOption;
  }).length;

  const score = Math.round((correctAnswers / examQuestions.length) * 100);
  const totalQuestions = examQuestions.length;

  // Process stress data for chart
  const chartData = stressHistory.map((data: StressData, index: number) => ({
    time: Math.floor((index / stressHistory.length) * (totalTime || 600)),
    stress: data.level,
  }));

  // Calculate average stress
  const avgStress = stressHistory.length > 0
    ? Math.round(stressHistory.reduce((acc: number, curr: StressData) => acc + curr.level, 0) / stressHistory.length)
    : 0;

  const getStressCategory = (level: number) => {
    if (level >= 60) return { label: 'High', color: 'text-red-600', bg: 'bg-red-100' };
    if (level >= 30) return { label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-100' };
    return { label: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const stressCategory = getStressCategory(avgStress);

  const getPerformanceMessage = () => {
    if (score >= 90) return { text: "Outstanding Performance! 🎉", color: "text-green-600" };
    if (score >= 80) return { text: "Excellent Work! 🌟", color: "text-blue-600" };
    if (score >= 70) return { text: "Good Job! 👍", color: "text-indigo-600" };
    if (score >= 60) return { text: "Well Done! ✨", color: "text-purple-600" };
    return { text: "Keep Practicing! 💪", color: "text-amber-600" };
  };

  const performanceMsg = getPerformanceMessage();

  const getSuggestions = () => {
    const suggestions = [];
    
    if (avgStress >= 60) {
      suggestions.push("Practice stress management techniques before exams");
      suggestions.push("Take regular breaks during study sessions");
    } else if (avgStress >= 30) {
      suggestions.push("Your stress management was good, keep it up!");
    } else {
      suggestions.push("Excellent stress management throughout the exam!");
    }

    if (score < 70) {
      suggestions.push("Review the topics you found challenging");
      suggestions.push("Practice more questions to build confidence");
    } else if (score < 90) {
      suggestions.push("Focus on the areas where you made mistakes");
      suggestions.push("You're doing great, keep up the momentum!");
    } else {
      suggestions.push("Outstanding! Consider helping others learn");
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">Exam Complete!</h1>
          <p className="text-lg text-gray-600">Here's your performance summary</p>
        </motion.div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Your Score</span>
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">{score}%</div>
                <div className="text-sm text-gray-500">
                  {correctAnswers} of {totalQuestions} correct
                </div>
                <div className={cn("mt-3 text-sm font-medium", performanceMsg.color)}>
                  {performanceMsg.text}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Average Stress</span>
                  <Brain className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">{avgStress}</div>
                <div className="flex items-center gap-2 mt-3">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    stressCategory.bg,
                    stressCategory.color
                  )}>
                    {stressCategory.label} Stress
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Time Taken</span>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  {formatTime(totalTime)}
                </div>
                <div className="text-sm text-gray-500">
                  Average: {formatTime(Math.floor(totalTime / totalQuestions))} per question
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stress Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                Stress Level Throughout Exam
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280"
                      label={{ value: 'Time (seconds)', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      label={{ value: 'Stress Level', angle: -90, position: 'insideLeft' }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}`, 'Stress Level']}
                      labelFormatter={(label) => `Time: ${label}s`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="stress" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fill="url(#stressGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Low (0-30)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>Medium (30-60)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>High (60+)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                Personalized Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{suggestion}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4"
        >
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="gap-2 px-8 py-6 text-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
