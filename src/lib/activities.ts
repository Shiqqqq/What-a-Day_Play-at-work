import { Activity, ActivityCategory } from '@/types';

// 搞笑活动数据定义
export const DEFAULT_ACTIVITIES: Activity[] = [
  // 基础生存技能 🔥
  {
    id: 'poop',
    title: '今天成功拉屎了吗？',
    emoji: '💩',
    category: 'health',
    description: '人类基本生存技能检测',
    streakTarget: 7
  },
  {
    id: 'shower',
    title: '今天洗澡了吗？',
    emoji: '🛁',
    category: 'hygiene',
    description: '防止变成行走的生化武器',
    streakTarget: 3
  },
  {
    id: 'brush_teeth',
    title: '刷牙了吗？',
    emoji: '🦷',
    category: 'hygiene',
    description: '保护你的珍珠白（如果还是的话）',
    streakTarget: 7
  },
  {
    id: 'sleep_early',
    title: '12点前睡觉了吗？',
    emoji: '💤',
    category: 'health',
    description: '拒做熬夜秃头怪',
    streakTarget: 7
  },

  // 社畜日常 💼
  {
    id: 'slack_off',
    title: '今天摸鱼了吗？',
    emoji: '🐟',
    category: 'work',
    description: '不摸鱼的社畜不是好社畜',
    streakTarget: 30
  },
  {
    id: 'coffee',
    title: '喝了几杯咖啡续命？',
    emoji: '☕',
    category: 'health',
    description: '咖啡因中毒预警系统',
    streakTarget: 1
  },
  {
    id: 'resign_thoughts',
    title: '今天想辞职了吗？',
    emoji: '😤',
    category: 'mental',
    description: '社畜心理健康指数',
    streakTarget: 100
  },
  {
    id: 'takeout',
    title: '又点外卖了吗？',
    emoji: '🍕',
    category: 'health',
    description: '钱包和健康的双重暴击',
    streakTarget: 1
  },

  // 精神状态 🧠
  {
    id: 'phone_addiction',
    title: '刷手机超过8小时了吗？',
    emoji: '📱',
    category: 'mental',
    description: '现代人指纹磨损检测',
    streakTarget: 7
  },
  {
    id: 'cry',
    title: '今天哭了吗？',
    emoji: '😭',
    category: 'mental',
    description: '情感释放健康指标',
    streakTarget: 1
  },
  {
    id: 'silly_things',
    title: '做了什么沙雕事情？',
    emoji: '🤡',
    category: 'mental',
    description: '保持童真的重要指标',
    streakTarget: 7
  },
  {
    id: 'gaming',
    title: '打游戏了吗？',
    emoji: '🎮',
    category: 'mental',
    description: '精神食粮补给站',
    streakTarget: 3
  },

  // 运动健康 💪
  {
    id: 'exercise',
    title: '今天运动了吗？',
    emoji: '🏃‍♂️',
    category: 'exercise',
    description: '对抗重力的英勇尝试',
    streakTarget: 3
  },
  {
    id: 'walk',
    title: '走了超过5000步吗？',
    emoji: '🚶‍♂️',
    category: 'exercise',
    description: '证明你还是个活人',
    streakTarget: 7
  },

  // 学习成长 📚
  {
    id: 'pretend_study',
    title: '假装学习了吗？',
    emoji: '📚',
    category: 'mental',
    description: '自我欺骗的高级艺术',
    streakTarget: 7
  },
  {
    id: 'procrastination',
    title: '拖延到最后一刻了吗？',
    emoji: '⏰',
    category: 'work',
    description: 'DDL战士的生存法则',
    streakTarget: 1
  }
];

// 活动分类配置
export const ACTIVITY_CATEGORIES: Record<ActivityCategory, {
  name: string;
  emoji: string;
  color: string;
  description: string;
}> = {
  health: {
    name: '健康',
    emoji: '❤️',
    color: 'bg-red-100 text-red-700',
    description: '身体是革命的本钱（虽然已经很废了）'
  },
  hygiene: {
    name: '卫生',
    emoji: '🧼',
    color: 'bg-blue-100 text-blue-700',
    description: '做个干净的废物'
  },
  exercise: {
    name: '运动',
    emoji: '💪',
    color: 'bg-green-100 text-green-700',
    description: '偶尔证明自己还活着'
  },
  mental: {
    name: '精神',
    emoji: '🧠',
    color: 'bg-purple-100 text-purple-700',
    description: '心理健康很重要（虽然已经不健康了）'
  },
  work: {
    name: '工作',
    emoji: '💼',
    color: 'bg-yellow-100 text-yellow-700',
    description: '社畜的基本修养'
  },
  custom: {
    name: '自定义',
    emoji: '✨',
    color: 'bg-pink-100 text-pink-700',
    description: '你的专属沙雕活动'
  }
};

// 根据完成率获取搞笑评语
export function getCompletionMessage(completionRate: number): {
  title: string;
  message: string;
  emoji: string;
  color: string;
} {
  if (completionRate >= 0.9) {
    return {
      title: '今日圣人',
      message: '哇！你今天表现得像个正常人！',
      emoji: '🏆',
      color: 'text-yellow-600'
    };
  } else if (completionRate >= 0.7) {
    return {
      title: '合格人类',
      message: '不错！至少证明了你还活着',
      emoji: '😊',
      color: 'text-green-600'
    };
  } else if (completionRate >= 0.5) {
    return {
      title: '普通废物',
      message: '中规中矩的废物水平',
      emoji: '😐',
      color: 'text-blue-600'
    };
  } else if (completionRate >= 0.3) {
    return {
      title: '进阶废物',
      message: '今天的废物指数有点高啊',
      emoji: '😅',
      color: 'text-orange-600'
    };
  } else {
    return {
      title: '超级废物',
      message: '恭喜！你已达到废物的巅峰',
      emoji: '💀',
      color: 'text-red-600'
    };
  }
}

// 根据连击数获取搞笑评语
export function getStreakMessage(streak: number, activityId: string): {
  message: string;
  emoji: string;
} {
  const activity = DEFAULT_ACTIVITIES.find(a => a.id === activityId);
  const activityName = activity?.title || '神秘活动';

  if (streak === 0) {
    return {
      message: `还没有开始${activityName}呢`,
      emoji: '😴'
    };
  } else if (streak === 1) {
    return {
      message: `${activityName}的第一天！`,
      emoji: '🌱'
    };
  } else if (streak <= 3) {
    return {
      message: `连续${streak}天${activityName}，不错哦`,
      emoji: '👍'
    };
  } else if (streak <= 7) {
    return {
      message: `哇！已经${streak}天了，你很棒`,
      emoji: '🔥'
    };
  } else if (streak <= 30) {
    return {
      message: `${streak}天连击！你是${activityName}大师`,
      emoji: '🏆'
    };
  } else {
    return {
      message: `${streak}天！这已经不是人类了`,
      emoji: '👑'
    };
  }
}

// 根据活动获取随机鼓励语
export function getRandomEncouragement(activityId: string): string {
  const encouragements: Record<string, string[]> = {
    poop: [
      '今天的任务完成得很顺利呢 💩',
      '人类基本需求达成！',
      '生物钟运转正常 ✅',
      '肠胃系统在线中...'
    ],
    shower: [
      '做个香香的人类 🛁',
      '清洁模式已开启',
      '告别生化武器称号',
      '水珠滑落，烦恼也滑落了'
    ],
    coffee: [
      '咖啡因补给成功 ☕',
      '血管里流淌的是咖啡',
      '续命操作完成',
      '社畜燃料已加满'
    ],
    slack_off: [
      '摸鱼使人快乐 🐟',
      '今日份的划水时间',
      '工作效率：-100%',
      '老板不在，天高任鸟飞'
    ],
    exercise: [
      '动起来，废物！💪',
      '重力：你赢了这一次',
      '汗水是脂肪在哭泣',
      '运动后的多巴胺真香'
    ],
    default: [
      '今天也是努力的一天呢',
      '你做得很棒！',
      '继续保持这个状态',
      '每一小步都是进步'
    ]
  };

  const messages = encouragements[activityId] || encouragements.default;
  return messages[Math.floor(Math.random() * messages.length)];
}

// 生成搞笑的废物等级描述
export function getWasteLevelDescription(level: number): {
  title: string;
  description: string;
  emoji: string;
  certificate: string;
} {
  if (level >= 9) {
    return {
      title: '传说级圣人',
      description: '你已经超越了人类的范畴',
      emoji: '👑',
      certificate: '恭喜获得"人间清醒"认证！'
    };
  } else if (level >= 8) {
    return {
      title: '钻石级人类',
      description: '闪闪发光的存在',
      emoji: '💎',
      certificate: '恭喜获得"钻石人类"认证！'
    };
  } else if (level >= 7) {
    return {
      title: '黄金级人类',
      description: '你是人群中最亮的星',
      emoji: '🌟',
      certificate: '恭喜获得"黄金人类"认证！'
    };
  } else if (level >= 6) {
    return {
      title: '白银级人类',
      description: '表现不错的普通人',
      emoji: '🥈',
      certificate: '恭喜获得"白银人类"认证！'
    };
  } else if (level >= 5) {
    return {
      title: '青铜级人类',
      description: '勉强算个人类',
      emoji: '🥉',
      certificate: '恭喜获得"青铜人类"认证！'
    };
  } else if (level >= 4) {
    return {
      title: '初级废物',
      description: '刚刚踏入废物行列',
      emoji: '🗿',
      certificate: '恭喜获得"初级废物"认证！'
    };
  } else if (level >= 3) {
    return {
      title: '中级废物',
      description: '废物之路渐入佳境',
      emoji: '🪨',
      certificate: '恭喜获得"中级废物"认证！'
    };
  } else if (level >= 2) {
    return {
      title: '高级废物',
      description: '废物界的佼佼者',
      emoji: '🗑️',
      certificate: '恭喜获得"高级废物"认证！'
    };
  } else if (level >= 1) {
    return {
      title: '专家级废物',
      description: '废物技能已炉火纯青',
      emoji: '💀',
      certificate: '恭喜获得"专家级废物"认证！'
    };
  } else {
    return {
      title: '传说级废物',
      description: '废物之神降临人间',
      emoji: '👻',
      certificate: '恭喜获得"传说级废物"认证！这是废物的最高荣誉！'
    };
  }
}

// 活动工具函数
export const ActivityUtils = {
  // 根据ID获取活动
  getActivity(activityId: string): Activity | undefined {
    return DEFAULT_ACTIVITIES.find(activity => activity.id === activityId);
  },

  // 根据分类获取活动
  getActivitiesByCategory(category: ActivityCategory): Activity[] {
    return DEFAULT_ACTIVITIES.filter(activity => activity.category === category);
  },

  // 获取所有分类
  getAllCategories(): ActivityCategory[] {
    return Object.keys(ACTIVITY_CATEGORIES) as ActivityCategory[];
  },

  // 获取随机活动
  getRandomActivity(): Activity {
    return DEFAULT_ACTIVITIES[Math.floor(Math.random() * DEFAULT_ACTIVITIES.length)];
  },

  // 创建自定义活动
  createCustomActivity(
    title: string,
    emoji: string,
    description?: string
  ): Activity {
    return {
      id: `custom_${Date.now()}`,
      title,
      emoji,
      category: 'custom',
      description: description || '你的专属沙雕活动',
      streakTarget: 7
    };
  }
};