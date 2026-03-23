'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Activity } from '@/types';
import { getRandomEncouragement } from '@/lib/activities';

interface ActivityCardProps {
  activity: Activity;
  completed: boolean;
  onToggle: (activityId: string, completed: boolean) => void;
  streak?: number;
}

// 单个活动卡片组件
export function ActivityCard({ activity, completed, onToggle, streak = 0 }: ActivityCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);

  const handleToggle = () => {
    const newCompleted = !completed;
    setIsAnimating(true);

    // 如果是完成状态，触发庆祝动画
    if (newCompleted) {
      // 五彩纸屑效果
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB6C1', '#B0C4DE', '#98FB98', '#FFFFE0', '#DDA0DD']
      });

      // 显示鼓励语
      setShowEncouragement(true);
      setTimeout(() => setShowEncouragement(false), 2000);
    }

    onToggle(activity.id, newCompleted);

    // 动画结束
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      {/* 鼓励语提示 */}
      <AnimatePresence>
        {showEncouragement && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap shadow-lg">
              {getRandomEncouragement(activity.id)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`
          relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
          ${completed
            ? 'bg-green-50 border-green-300 shadow-green-100 shadow-lg'
            : 'bg-white border-gray-200 hover:border-pastel-pink hover:shadow-md'
          }
          ${isAnimating ? 'scale-105' : 'scale-100'}
          group-hover:shadow-lg
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleToggle}
      >
        {/* 活动表情和标题 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <motion.div
              className="text-3xl"
              animate={{
                rotate: isAnimating ? [0, -10, 10, 0] : 0,
                scale: isAnimating ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.5 }}
            >
              {activity.emoji}
            </motion.div>
            <div>
              <h3 className="font-cute font-bold text-gray-800 text-lg">
                {activity.title}
              </h3>
              {activity.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {activity.description}
                </p>
              )}
            </div>
          </div>

          {/* 完成状态指示器 */}
          <motion.div
            className={`
              w-8 h-8 rounded-full border-2 flex items-center justify-center
              ${completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-400 group-hover:border-green-400'
              }
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {completed ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check size={16} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-4 h-4 rounded-full border border-gray-400"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 连击显示 */}
        {streak > 0 && (
          <motion.div
            className="flex items-center space-x-2 mt-2 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-orange-500 font-bold">🔥</span>
            <span className="text-orange-600 font-semibold">
              连续 {streak} 天
            </span>
            {streak >= 7 && <span className="text-yellow-500">🏆</span>}
          </motion.div>
        )}

        {/* 悬停效果光晕 */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pastel-pink to-pastel-purple opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

interface DailyChecklistProps {
  activities: Activity[];
  completedActivities: Record<string, boolean>;
  streaks: Record<string, number>;
  onToggleActivity: (activityId: string, completed: boolean) => void;
  className?: string;
}

// 主清单组件
export function DailyChecklist({
  activities,
  completedActivities,
  streaks,
  onToggleActivity,
  className = ''
}: DailyChecklistProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  // 计算统计数据
  const totalActivities = activities.length;
  const completedCount = Object.values(completedActivities).filter(Boolean).length;
  const completionRate = totalActivities > 0 ? completedCount / totalActivities : 0;

  // 过滤活动
  const filteredActivities = activities.filter(activity => {
    const isCompleted = completedActivities[activity.id] || false;
    switch (filter) {
      case 'completed':
        return isCompleted;
      case 'pending':
        return !isCompleted;
      default:
        return true;
    }
  });

  // 触发全部完成庆祝
  useEffect(() => {
    if (completionRate === 1 && totalActivities > 0) {
      // 超级庆祝动画
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FF69B4', '#00CED1', '#98FB98', '#DDA0DD']
        });
      }, 500);
    }
  }, [completionRate, totalActivities]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 标题和统计 */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-cute font-bold text-gray-800">
          今日上朝清单 📋
        </h2>

        {/* 进度条 */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>进度：{completedCount}/{totalActivities}</span>
            <span>{Math.round(completionRate * 100)}% 完成</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {/* 完成状态消息 */}
          <motion.div
            className="mt-3 text-center"
            key={`completion-${Math.round(completionRate * 10)}`} // 用于触发动画的key
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {completionRate === 1 ? (
              <span className="text-yellow-600 font-bold text-lg">
                🎉 今日圣人！所有任务完成！
              </span>
            ) : completionRate >= 0.7 ? (
              <span className="text-green-600 font-semibold">
                😊 表现不错！你还是个人
              </span>
            ) : completionRate >= 0.5 ? (
              <span className="text-blue-600">
                😐 中规中矩的废物水平
              </span>
            ) : (
              <span className="text-orange-600">
                😅 今天的废物指数有点高啊
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* 过滤器 */}
      <div className="flex justify-center space-x-2">
        {[
          { key: 'all', label: '全部', emoji: '📝' },
          { key: 'completed', label: '已完成', emoji: '✅' },
          { key: 'pending', label: '待完成', emoji: '⏳' }
        ].map((filterOption) => (
          <motion.button
            key={filterOption.key}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${filter === filterOption.key
                ? 'bg-pastel-pink text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-pastel-pink'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(filterOption.key as typeof filter)}
          >
            <span className="mr-1">{filterOption.emoji}</span>
            {filterOption.label}
          </motion.button>
        ))}
      </div>

      {/* 活动列表 */}
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1
              }}
            >
              <ActivityCard
                activity={activity}
                completed={completedActivities[activity.id] || false}
                onToggle={onToggleActivity}
                streak={streaks[activity.id] || 0}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 空状态 */}
      {filteredActivities.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4">🤷‍♂️</div>
          <p className="text-gray-500 text-lg">
            {filter === 'completed' && '还没有完成任何活动'}
            {filter === 'pending' && '所有活动都完成了！🎉'}
            {filter === 'all' && '没有找到任何活动'}
          </p>
        </motion.div>
      )}

      {/* 底部统计信息 */}
      <motion.div
        className="text-center text-sm text-gray-500 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div>
          今天完成了 <span className="font-bold text-green-600">{completedCount}</span> 件沙雕事情
        </div>
        {Object.keys(streaks).length > 0 && (
          <div>
            🔥 最长连击：{Math.max(...Object.values(streaks), 0)} 天
          </div>
        )}
      </motion.div>
    </div>
  );
}