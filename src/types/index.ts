// 核心数据类型定义

// 活动类型
export interface Activity {
  id: string;
  title: string;           // 活动标题，如："今天成功拉屎了吗？"
  emoji: string;          // 表情符号
  category: ActivityCategory;
  description?: string;    // 活动描述
  streakTarget?: number;   // 连击目标天数
}

// 活动分类
export type ActivityCategory = 'health' | 'hygiene' | 'exercise' | 'mental' | 'work' | 'custom';

// 每日记录
export interface DailyRecord {
  date: string;                           // ISO日期字符串
  activities: Record<string, boolean>;    // 活动ID -> 完成状态
  completionRate: number;                 // 完成率 (0-1)
  mood?: MoodType;                       // 当日心情
  notes?: string;                        // 备注
  timestamp: number;                     // 记录时间戳
}

// 心情类型
export type MoodType = 'excellent' | 'good' | 'okay' | 'bad' | 'terrible';

// 用户配置
export interface UserProfile {
  name?: string;                         // 用户昵称
  preferredMascot: MascotType;          // 首选吉祥物
  achievements: string[];                // 已获得成就ID列表
  streaks: Record<string, number>;       // 活动ID -> 当前连击数
  customActivities: Activity[];          // 自定义活动
  preferences: UserPreferences;          // 用户偏好设置
  stats: UserStats;                      // 用户统计数据
}

// 吉祥物类型
export type MascotType = 'panda' | 'cat' | 'dog' | 'fox' | 'bear';

// 用户偏好设置
export interface UserPreferences {
  notifications: boolean;                // 是否开启通知
  soundEffects: boolean;                // 是否开启音效
  theme: ThemeType;                     // 主题风格
  language: 'zh-CN' | 'en-US';         // 语言设置
  reminderTime?: string;               // 提醒时间 (HH:mm格式)
}

// 主题类型
export type ThemeType = 'cute' | 'pixel' | 'minimal' | 'royal';

// 用户统计数据
export interface UserStats {
  totalDays: number;                    // 总使用天数
  currentStreak: number;                // 当前连续使用天数
  longestStreak: number;               // 最长连续使用天数
  totalActivitiesCompleted: number;     // 总完成活动数
  averageCompletionRate: number;        // 平均完成率
  favoriteActivity?: string;            // 最喜欢的活动ID
}

// 成就定义
export interface Achievement {
  id: string;
  title: string;                        // 成就标题
  description: string;                  // 成就描述
  emoji: string;                       // 成就图标
  condition: AchievementCondition;      // 解锁条件
  reward?: AchievementReward;          // 奖励内容
  rarity: AchievementRarity;           // 稀有度
  unlockedAt?: number;                 // 解锁时间戳
}

// 成就条件
export interface AchievementCondition {
  type: 'streak' | 'total' | 'rate' | 'special';
  activityId?: string;                 // 相关活动ID（可选）
  target: number;                      // 目标数值
  period?: 'day' | 'week' | 'month';  // 时间周期（可选）
}

// 成就奖励
export interface AchievementReward {
  type: 'mascot' | 'theme' | 'certificate' | 'title';
  content: string;                     // 奖励内容
}

// 成就稀有度
export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

// 吉祥物状态
export interface MascotState {
  type: MascotType;
  mood: MascotMood;
  animation: MascotAnimation;
  message?: string;                    // 吉祥物说话内容
}

// 吉祥物心情
export type MascotMood = 'happy' | 'excited' | 'neutral' | 'sad' | 'sleeping' | 'cheering';

// 吉祥物动画
export type MascotAnimation = 'idle' | 'bounce' | 'dance' | 'sleep' | 'celebrate' | 'encourage';

// 日历数据
export interface CalendarData {
  date: string;                        // 日期
  completionRate: number;              // 完成率
  mood?: MoodType;                    // 心情
  hasEntries: boolean;                // 是否有记录
}

// 报告数据
export interface ReportData {
  period: 'week' | 'month' | 'year';
  startDate: string;
  endDate: string;
  totalDays: number;
  completedDays: number;
  averageCompletionRate: number;
  topActivities: Array<{
    activityId: string;
    completionRate: number;
    streak: number;
  }>;
  achievements: Achievement[];
  insights: ReportInsight[];
  wasteLevel: number;                  // 废物等级 (1-10)
  funnyStats: FunnyStats;             // 搞笑统计数据
}

// 报告洞察
export interface ReportInsight {
  type: 'positive' | 'negative' | 'neutral' | 'funny';
  title: string;
  description: string;
  emoji: string;
}

// 搞笑统计数据
export interface FunnyStats {
  poopCount?: number;                  // 拉屎次数
  coffeeCount?: number;               // 咖啡杯数
  procrastinationHours?: number;      // 摸鱼小时数
  cryCount?: number;                  // 哭泣次数
  resignationThoughts?: number;       // 想辞职次数
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 存储操作结果
export interface StorageResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 组件Props类型
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 动画配置
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string;
  repeat?: number;
}

// 通知配置
export interface NotificationConfig {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
}

// 导出所有类型的集合（用于类型检查）
export type AllTypes =
  | Activity
  | DailyRecord
  | UserProfile
  | Achievement
  | MascotState
  | CalendarData
  | ReportData;