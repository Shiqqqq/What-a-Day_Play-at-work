import { Achievement, AchievementRarity } from '@/types';

// 搞笑成就定义
export const ALL_ACHIEVEMENTS: Achievement[] = [
  // 基础生存成就 💩
  {
    id: 'poop_streak_7',
    title: '黄金马桶',
    description: '连续7天成功拉屎',
    emoji: '🚽',
    condition: {
      type: 'streak',
      activityId: 'poop',
      target: 7
    },
    reward: {
      type: 'certificate',
      content: '恭喜获得黄金马桶认证！你的肠道运转良好'
    },
    rarity: 'common'
  },
  {
    id: 'poop_streak_30',
    title: '拉屎大师',
    description: '连续30天成功拉屎',
    emoji: '💩',
    condition: {
      type: 'streak',
      activityId: 'poop',
      target: 30
    },
    reward: {
      type: 'title',
      content: '人类排泄系统管理专家'
    },
    rarity: 'rare'
  },
  {
    id: 'shower_streak_7',
    title: '清香人类',
    description: '连续7天洗澡',
    emoji: '🛁',
    condition: {
      type: 'streak',
      activityId: 'shower',
      target: 7
    },
    reward: {
      type: 'certificate',
      content: '恭喜脱离生化武器行列！'
    },
    rarity: 'common'
  },

  // 社畜成就 💼
  {
    id: 'slack_off_streak_30',
    title: '摸鱼大师',
    description: '连续30天摸鱼',
    emoji: '🐟',
    condition: {
      type: 'streak',
      activityId: 'slack_off',
      target: 30
    },
    reward: {
      type: 'certificate',
      content: '摸鱼技能已达到宗师级别！'
    },
    rarity: 'epic'
  },
  {
    id: 'coffee_addiction',
    title: '咖啡因成瘾者',
    description: '单日喝咖啡5次以上',
    emoji: '☕',
    condition: {
      type: 'special',
      target: 5
    },
    reward: {
      type: 'title',
      content: '人形咖啡机'
    },
    rarity: 'rare'
  },
  {
    id: 'resign_thoughts_100',
    title: '辞职幻想家',
    description: '连续100天想辞职',
    emoji: '😤',
    condition: {
      type: 'streak',
      activityId: 'resign_thoughts',
      target: 100
    },
    reward: {
      type: 'certificate',
      content: '你的忍耐力已达到圣人级别'
    },
    rarity: 'legendary'
  },

  // 精神状态成就 🧠
  {
    id: 'night_owl',
    title: '夜猫子之王',
    description: '连续7天2点后睡觉',
    emoji: '🦉',
    condition: {
      type: 'special',
      target: 7
    },
    reward: {
      type: 'title',
      content: '昼夜颠倒专家'
    },
    rarity: 'rare'
  },
  {
    id: 'phone_addiction_7',
    title: '指纹磨损器',
    description: '连续7天刷手机超过8小时',
    emoji: '📱',
    condition: {
      type: 'streak',
      activityId: 'phone_addiction',
      target: 7
    },
    reward: {
      type: 'certificate',
      content: '你的拇指已成为触屏专家'
    },
    rarity: 'common'
  },
  {
    id: 'hermit_mode',
    title: '社恐冠军',
    description: '连续7天不出门',
    emoji: '🏠',
    condition: {
      type: 'special',
      target: 7
    },
    reward: {
      type: 'title',
      content: '家里蹲大师'
    },
    rarity: 'epic'
  },

  // 运动健康成就 💪
  {
    id: 'exercise_streak_7',
    title: '反重力战士',
    description: '连续7天运动',
    emoji: '🏃‍♂️',
    condition: {
      type: 'streak',
      activityId: 'exercise',
      target: 7
    },
    reward: {
      type: 'certificate',
      content: '成功对抗地心引力！'
    },
    rarity: 'rare'
  },
  {
    id: 'walker_streak_30',
    title: '行走的证据',
    description: '连续30天走超过5000步',
    emoji: '🚶‍♂️',
    condition: {
      type: 'streak',
      activityId: 'walk',
      target: 30
    },
    reward: {
      type: 'title',
      content: '腿部动力系统正常'
    },
    rarity: 'epic'
  },

  // 学习成长成就 📚
  {
    id: 'procrastination_master',
    title: 'DDL战士',
    description: '连续30天拖延到最后一刻',
    emoji: '⏰',
    condition: {
      type: 'streak',
      activityId: 'procrastination',
      target: 30
    },
    reward: {
      type: 'certificate',
      content: 'deadline恐惧症末期患者认证'
    },
    rarity: 'legendary'
  },
  {
    id: 'pretend_study_streak',
    title: '自欺欺人大师',
    description: '连续14天假装学习',
    emoji: '📚',
    condition: {
      type: 'streak',
      activityId: 'pretend_study',
      target: 14
    },
    reward: {
      type: 'title',
      content: '表演艺术家'
    },
    rarity: 'rare'
  },

  // 综合成就 🏆
  {
    id: 'perfect_day',
    title: '完美的一天',
    description: '单日完成所有活动',
    emoji: '🌟',
    condition: {
      type: 'rate',
      target: 100
    },
    reward: {
      type: 'certificate',
      content: '今天你就是人生赢家！'
    },
    rarity: 'epic'
  },
  {
    id: 'waste_level_expert',
    title: '废物专家',
    description: '达到专家级废物等级',
    emoji: '💀',
    condition: {
      type: 'special',
      target: 1
    },
    reward: {
      type: 'title',
      content: '废物界的技术专家'
    },
    rarity: 'legendary'
  },
  {
    id: 'total_activities_500',
    title: '活动狂魔',
    description: '累计完成500个活动',
    emoji: '🎯',
    condition: {
      type: 'total',
      target: 500
    },
    reward: {
      type: 'certificate',
      content: '你的人生充满了各种沙雕活动'
    },
    rarity: 'epic'
  },
  {
    id: 'login_streak_365',
    title: '年度坚持王',
    description: '连续365天使用应用',
    emoji: '📅',
    condition: {
      type: 'special',
      target: 365
    },
    reward: {
      type: 'title',
      content: '时间管理大师'
    },
    rarity: 'legendary'
  }
];

// 成就稀有度配置
export const RARITY_CONFIG: Record<AchievementRarity, {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  glow: string;
}> = {
  common: {
    name: '普通',
    color: '#9CA3AF',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-300',
    textColor: 'text-gray-700',
    glow: 'shadow-md'
  },
  rare: {
    name: '稀有',
    color: '#3B82F6',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    textColor: 'text-blue-700',
    glow: 'shadow-blue-200 shadow-lg'
  },
  epic: {
    name: '史诗',
    color: '#8B5CF6',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    textColor: 'text-purple-700',
    glow: 'shadow-purple-200 shadow-xl'
  },
  legendary: {
    name: '传说',
    color: '#F59E0B',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700',
    glow: 'shadow-amber-200 shadow-2xl'
  }
};

// 成就检查器
export class AchievementChecker {
  // 检查单个成就是否解锁
  static checkAchievement(
    achievement: Achievement,
    userStats: any,
    streaks: Record<string, number>,
    dailyRecords: Record<string, any>
  ): boolean {
    const { condition } = achievement;

    switch (condition.type) {
      case 'streak':
        if (!condition.activityId) return false;
        const currentStreak = streaks[condition.activityId] || 0;
        return currentStreak >= condition.target;

      case 'total':
        return (userStats.totalActivitiesCompleted || 0) >= condition.target;

      case 'rate':
        if (!condition.activityId) {
          // 检查整体完成率
          const today = new Date().toISOString().split('T')[0];
          const todayRecord = dailyRecords[today];
          return todayRecord ? todayRecord.completionRate >= (condition.target / 100) : false;
        } else {
          // 检查特定活动的完成率
          return false; // 暂未实现
        }

      case 'special':
        // 特殊成就需要自定义逻辑
        return this.checkSpecialAchievement(achievement.id, userStats, streaks, dailyRecords);

      default:
        return false;
    }
  }

  // 检查特殊成就
  private static checkSpecialAchievement(
    achievementId: string,
    userStats: any,
    streaks: Record<string, number>,
    dailyRecords: Record<string, any>
  ): boolean {
    switch (achievementId) {
      case 'night_owl':
        // 检查连续7天2点后睡觉（需要实际实现睡觉时间记录）
        return false;

      case 'hermit_mode':
        // 检查连续7天不出门（需要实际实现出门记录）
        return false;

      case 'coffee_addiction':
        // 检查单日喝咖啡5次以上（需要实际实现计数逻辑）
        return false;

      case 'waste_level_expert':
        // 检查是否达到专家级废物等级
        return (userStats.wasteLevel || 0) <= 1;

      case 'login_streak_365':
        // 检查连续365天使用应用
        return (userStats.currentStreak || 0) >= 365;

      default:
        return false;
    }
  }

  // 批量检查用户的新成就
  static checkNewAchievements(
    currentAchievements: string[],
    userStats: any,
    streaks: Record<string, number>,
    dailyRecords: Record<string, any>
  ): Achievement[] {
    const newAchievements: Achievement[] = [];

    for (const achievement of ALL_ACHIEVEMENTS) {
      // 如果已经拥有该成就，跳过
      if (currentAchievements.includes(achievement.id)) {
        continue;
      }

      // 检查是否满足解锁条件
      if (this.checkAchievement(achievement, userStats, streaks, dailyRecords)) {
        newAchievements.push({
          ...achievement,
          unlockedAt: Date.now()
        });
      }
    }

    return newAchievements;
  }

  // 获取成就进度
  static getAchievementProgress(
    achievement: Achievement,
    userStats: any,
    streaks: Record<string, number>
  ): {
    current: number;
    target: number;
    percentage: number;
  } {
    const { condition } = achievement;
    let current = 0;

    switch (condition.type) {
      case 'streak':
        if (condition.activityId) {
          current = streaks[condition.activityId] || 0;
        }
        break;

      case 'total':
        current = userStats.totalActivitiesCompleted || 0;
        break;

      case 'rate':
        current = Math.round((userStats.averageCompletionRate || 0) * 100);
        break;

      case 'special':
        // 特殊成就进度需要自定义逻辑
        current = 0;
        break;
    }

    const percentage = Math.min((current / condition.target) * 100, 100);

    return {
      current,
      target: condition.target,
      percentage
    };
  }
}

// 成就工具函数
export const AchievementUtils = {
  // 根据ID获取成就
  getAchievement(achievementId: string): Achievement | undefined {
    return ALL_ACHIEVEMENTS.find(achievement => achievement.id === achievementId);
  },

  // 根据稀有度获取成就
  getAchievementsByRarity(rarity: AchievementRarity): Achievement[] {
    return ALL_ACHIEVEMENTS.filter(achievement => achievement.rarity === rarity);
  },

  // 获取成就描述信息
  getAchievementInfo(achievement: Achievement) {
    const rarityConfig = RARITY_CONFIG[achievement.rarity];
    return {
      ...achievement,
      rarityConfig
    };
  },

  // 生成成就证书内容
  generateCertificate(achievement: Achievement, userName?: string): string {
    const name = userName || '废物';
    const date = new Date().toLocaleDateString('zh-CN');

    return `
🎉 成就证书 🎉

特此证明：${name}

于 ${date} 成功解锁

【${achievement.title}】

${achievement.description}

${achievement.reward?.content || '恭喜获得此成就！'}

━━━━━━━━━━━━━━━━━━
今日上朝 · 废物认证中心
━━━━━━━━━━━━━━━━━━
    `;
  },

  // 获取稀有度样式
  getRarityStyle(rarity: AchievementRarity): string {
    const config = RARITY_CONFIG[rarity];
    return `${config.bgColor} ${config.borderColor} ${config.textColor} ${config.glow}`;
  }
};