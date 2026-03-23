'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MascotType, MascotMood } from '@/types';

interface MascotDisplayProps {
  type: MascotType;
  mood: MascotMood;
  completionRate: number;
  className?: string;
  onPet?: () => void;
}

// 吉祥物表情配置
const MASCOT_EXPRESSIONS: Record<MascotType, Record<MascotMood, string>> = {
  panda: {
    happy: '🐼',
    excited: '🐼',
    neutral: '🐼',
    sad: '🐼',
    sleeping: '😴',
    cheering: '🐼'
  },
  cat: {
    happy: '😸',
    excited: '😻',
    neutral: '😺',
    sad: '😿',
    sleeping: '😴',
    cheering: '🙀'
  },
  dog: {
    happy: '🐕',
    excited: '🐶',
    neutral: '🐕',
    sad: '🐕',
    sleeping: '😴',
    cheering: '🐶'
  },
  fox: {
    happy: '🦊',
    excited: '🦊',
    neutral: '🦊',
    sad: '🦊',
    sleeping: '😴',
    cheering: '🦊'
  },
  bear: {
    happy: '🐻',
    excited: '🐻',
    neutral: '🐻',
    sad: '🐻',
    sleeping: '😴',
    cheering: '🐻'
  }
};

// 根据完成率获取心情
function getMoodFromCompletion(completionRate: number): MascotMood {
  if (completionRate === 1) return 'cheering';
  if (completionRate >= 0.8) return 'excited';
  if (completionRate >= 0.6) return 'happy';
  if (completionRate >= 0.4) return 'neutral';
  if (completionRate >= 0.2) return 'sad';
  return 'sleeping';
}

// 获取吉祥物消息
function getMascotMessage(completionRate: number, type: MascotType): string {
  const messages: Record<string, string[]> = {
    excellent: [
      '哇！你今天太棒了！👑',
      '完美的一天！你就是传奇！',
      '今天你就是宇宙的主宰！',
      '所有活动都完成了！我为你骄傲！'
    ],
    great: [
      '表现很不错哦！继续加油！',
      '你今天真的很努力呢！',
      '距离完美只差一点点了！',
      '这样的你真让人佩服！'
    ],
    good: [
      '今天过得还不错呢～',
      '保持这个节奏就很棒！',
      '你在进步，我看得到！',
      '虽然不完美，但已经很好了！'
    ],
    okay: [
      '今天普普通通，也没关系',
      '明天会更好的！',
      '每个人都有普通的一天',
      '至少你还在努力呢！'
    ],
    poor: [
      '今天看起来有点累呢...',
      '要不要休息一下？',
      '没关系，明天重新来！',
      '偶尔偷懒也是可以的'
    ],
    terrible: [
      '今天是不是心情不太好？',
      '别着急，一步一步来',
      '我会一直陪着你的',
      '每个人都有低谷期...'
    ]
  };

  let category: string;
  if (completionRate === 1) category = 'excellent';
  else if (completionRate >= 0.8) category = 'great';
  else if (completionRate >= 0.6) category = 'good';
  else if (completionRate >= 0.4) category = 'okay';
  else if (completionRate >= 0.2) category = 'poor';
  else category = 'terrible';

  const categoryMessages = messages[category];
  return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
}

export function MascotDisplay({
  type,
  mood,
  completionRate,
  className = '',
  onPet
}: MascotDisplayProps) {
  const [currentMood, setCurrentMood] = useState<MascotMood>(mood);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const [isFloating, setIsFloating] = useState(true);

  // 根据完成率自动更新心情
  useEffect(() => {
    setCurrentMood(getMoodFromCompletion(completionRate));
    setMessage(getMascotMessage(completionRate, type));
  }, [completionRate, type]);

  // 点击吉祥物的处理
  const handlePet = () => {
    setPetCount(prev => prev + 1);
    onPet?.();

    // 显示消息
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);

    // 特殊反应
    if (petCount > 0 && petCount % 5 === 0) {
      setCurrentMood('excited');
      setTimeout(() => setCurrentMood(getMoodFromCompletion(completionRate)), 2000);
    }

    // 暂停漂浮动画
    setIsFloating(false);
    setTimeout(() => setIsFloating(true), 1000);
  };

  // 获取当前表情
  const currentExpression = MASCOT_EXPRESSIONS[type][currentMood];

  // 动画变体
  const floatingAnimation = {
    animate: isFloating ? {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    } : {}
  };

  const bounceAnimation = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 }
  };

  return (
    <div className={`relative ${className}`}>
      {/* 吉祥物主体 */}
      <motion.div
        className="flex flex-col items-center space-y-4"
        {...floatingAnimation}
      >
        {/* 消息气泡 */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              className="relative bg-white rounded-2xl shadow-lg p-3 max-w-xs text-center"
            >
              <p className="text-sm text-gray-700 font-medium">{message}</p>
              {/* 气泡尾巴 */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-3 h-3 bg-white rotate-45 shadow-lg"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 吉祥物图标 */}
        <motion.div
          className="relative cursor-pointer select-none"
          {...bounceAnimation}
          onClick={handlePet}
        >
          {/* 背景光环 */}
          <motion.div
            className={`
              absolute inset-0 rounded-full blur-xl opacity-30
              ${currentMood === 'cheering'
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                : currentMood === 'happy' || currentMood === 'excited'
                  ? 'bg-gradient-to-r from-green-400 to-blue-400'
                  : currentMood === 'neutral'
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                    : 'bg-gradient-to-r from-gray-400 to-gray-500'
              }
            `}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 主要表情 */}
          <motion.div
            className="relative text-8xl md:text-9xl z-10"
            animate={{
              rotate: currentMood === 'excited' ? [0, -5, 5, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              repeat: currentMood === 'excited' ? Infinity : 0,
            }}
          >
            {currentExpression}
          </motion.div>

          {/* 心情特效 */}
          <AnimatePresence>
            {currentMood === 'cheering' && (
              <motion.div
                className="absolute -top-2 -right-2 text-2xl"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: [-5, -15, -5]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                ✨
              </motion.div>
            )}

            {currentMood === 'sleeping' && (
              <>
                <motion.div
                  className="absolute -top-4 left-1/2 text-xl opacity-60"
                  animate={{
                    y: [-10, -20, -10],
                    x: [-5, 5, -5],
                    opacity: [0.6, 0.4, 0.6]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0
                  }}
                >
                  💤
                </motion.div>
                <motion.div
                  className="absolute -top-8 left-1/3 text-lg opacity-40"
                  animate={{
                    y: [-15, -25, -15],
                    x: [0, 10, 0],
                    opacity: [0.4, 0.2, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  💤
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* 点击波纹效果 */}
          <AnimatePresence>
            {petCount > 0 && (
              <motion.div
                key={petCount}
                className="absolute inset-0 rounded-full border-4 border-pink-400"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* 吉祥物名字和状态 */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-cute font-bold text-gray-800 capitalize">
            {type === 'panda' && '熊猫君'}
            {type === 'cat' && '猫咪酱'}
            {type === 'dog' && '汪汪'}
            {type === 'fox' && '小狐狸'}
            {type === 'bear' && '熊熊'}
          </h3>

          <div className="text-sm text-gray-600">
            心情：
            <span className={`
              font-semibold ml-1
              ${currentMood === 'cheering' || currentMood === 'excited'
                ? 'text-yellow-600'
                : currentMood === 'happy'
                  ? 'text-green-600'
                  : currentMood === 'neutral'
                    ? 'text-blue-600'
                    : 'text-gray-500'
              }
            `}>
              {currentMood === 'cheering' && '超兴奋'}
              {currentMood === 'excited' && '很开心'}
              {currentMood === 'happy' && '开心'}
              {currentMood === 'neutral' && '还行'}
              {currentMood === 'sad' && '有点难过'}
              {currentMood === 'sleeping' && '想睡觉'}
            </span>
          </div>

          {petCount > 0 && (
            <motion.div
              className="text-xs text-pink-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              被摸了 {petCount} 次 💕
            </motion.div>
          )}
        </motion.div>

        {/* 交互提示 */}
        <motion.div
          className="text-xs text-gray-400 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          点击我和我互动吧～
        </motion.div>
      </motion.div>
    </div>
  );
}