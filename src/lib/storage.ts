import { DailyRecord, UserProfile, StorageResult } from '@/types';

// 存储键名常量
const STORAGE_KEYS = {
  DAILY_RECORDS: 'jinrishangchao_daily_records',
  USER_PROFILE: 'jinrishangchao_user_profile',
  SETTINGS: 'jinrishangchao_settings',
} as const;

// 存储管理类
export class LocalStorageManager {
  private static instance: LocalStorageManager;

  // 单例模式
  static getInstance(): LocalStorageManager {
    if (!LocalStorageManager.instance) {
      LocalStorageManager.instance = new LocalStorageManager();
    }
    return LocalStorageManager.instance;
  }

  // 检查localStorage是否可用
  private isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // 安全的JSON解析
  private safeJsonParse<T>(jsonString: string | null, fallback: T): T {
    if (!jsonString) return fallback;

    try {
      return JSON.parse(jsonString) as T;
    } catch (error) {
      console.error('JSON解析失败:', error);
      return fallback;
    }
  }

  // 安全的localStorage读取
  private safeGetItem(key: string): string | null {
    if (!this.isStorageAvailable()) {
      console.warn('LocalStorage不可用');
      return null;
    }

    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('LocalStorage读取失败:', error);
      return null;
    }
  }

  // 安全的localStorage写入
  private safeSetItem(key: string, value: string): boolean {
    if (!this.isStorageAvailable()) {
      console.warn('LocalStorage不可用');
      return false;
    }

    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('LocalStorage写入失败:', error);
      return false;
    }
  }

  // 获取今天的日期字符串 (YYYY-MM-DD)
  private getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }

  // === 日常记录相关方法 ===

  // 获取所有日常记录
  getAllDailyRecords(): StorageResult<Record<string, DailyRecord>> {
    try {
      const recordsJson = this.safeGetItem(STORAGE_KEYS.DAILY_RECORDS);
      const records = this.safeJsonParse(recordsJson, {});

      return {
        success: true,
        data: records
      };
    } catch (error) {
      return {
        success: false,
        error: `获取日常记录失败: ${error}`
      };
    }
  }

  // 获取特定日期的记录
  getDailyRecord(date: string): StorageResult<DailyRecord | null> {
    try {
      const allRecords = this.getAllDailyRecords();
      if (!allRecords.success || !allRecords.data) {
        return { success: false, error: '无法获取记录数据' };
      }

      const record = allRecords.data[date] || null;
      return {
        success: true,
        data: record
      };
    } catch (error) {
      return {
        success: false,
        error: `获取${date}的记录失败: ${error}`
      };
    }
  }

  // 获取今天的记录
  getTodayRecord(): StorageResult<DailyRecord | null> {
    const today = this.getTodayDateString();
    return this.getDailyRecord(today);
  }

  // 保存日常记录
  saveDailyRecord(record: DailyRecord): StorageResult<boolean> {
    try {
      const allRecords = this.getAllDailyRecords();
      if (!allRecords.success) {
        return { success: false, error: '无法获取现有记录' };
      }

      const records = allRecords.data || {};
      records[record.date] = {
        ...record,
        timestamp: Date.now() // 更新时间戳
      };

      const success = this.safeSetItem(
        STORAGE_KEYS.DAILY_RECORDS,
        JSON.stringify(records)
      );

      if (success) {
        return { success: true, data: true };
      } else {
        return { success: false, error: '保存失败：存储空间不足或无权限' };
      }
    } catch (error) {
      return {
        success: false,
        error: `保存记录失败: ${error}`
      };
    }
  }

  // 更新今天的活动完成状态
  updateTodayActivity(activityId: string, completed: boolean): StorageResult<boolean> {
    try {
      const today = this.getTodayDateString();
      const todayRecordResult = this.getTodayRecord();

      // 如果今天没有记录，创建新记录
      let todayRecord: DailyRecord;
      if (!todayRecordResult.success || !todayRecordResult.data) {
        todayRecord = {
          date: today,
          activities: {},
          completionRate: 0,
          timestamp: Date.now()
        };
      } else {
        todayRecord = todayRecordResult.data;
      }

      // 更新活动状态
      todayRecord.activities[activityId] = completed;

      // 重新计算完成率
      const totalActivities = Object.keys(todayRecord.activities).length;
      const completedActivities = Object.values(todayRecord.activities).filter(Boolean).length;
      todayRecord.completionRate = totalActivities > 0 ? completedActivities / totalActivities : 0;

      return this.saveDailyRecord(todayRecord);
    } catch (error) {
      return {
        success: false,
        error: `更新活动状态失败: ${error}`
      };
    }
  }

  // === 用户配置相关方法 ===

  // 获取用户配置
  getUserProfile(): StorageResult<UserProfile> {
    try {
      const profileJson = this.safeGetItem(STORAGE_KEYS.USER_PROFILE);

      // 默认用户配置
      const defaultProfile: UserProfile = {
        preferredMascot: 'panda',
        achievements: [],
        streaks: {},
        customActivities: [],
        preferences: {
          notifications: true,
          soundEffects: true,
          theme: 'cute',
          language: 'zh-CN'
        },
        stats: {
          totalDays: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalActivitiesCompleted: 0,
          averageCompletionRate: 0
        }
      };

      const profile = this.safeJsonParse(profileJson, defaultProfile);

      return {
        success: true,
        data: { ...defaultProfile, ...profile } // 合并确保所有字段都存在
      };
    } catch (error) {
      return {
        success: false,
        error: `获取用户配置失败: ${error}`
      };
    }
  }

  // 保存用户配置
  saveUserProfile(profile: UserProfile): StorageResult<boolean> {
    try {
      const success = this.safeSetItem(
        STORAGE_KEYS.USER_PROFILE,
        JSON.stringify(profile)
      );

      if (success) {
        return { success: true, data: true };
      } else {
        return { success: false, error: '保存失败：存储空间不足或无权限' };
      }
    } catch (error) {
      return {
        success: false,
        error: `保存用户配置失败: ${error}`
      };
    }
  }

  // 更新用户偏好设置
  updateUserPreferences(preferences: Partial<UserProfile['preferences']>): StorageResult<boolean> {
    try {
      const profileResult = this.getUserProfile();
      if (!profileResult.success || !profileResult.data) {
        return { success: false, error: '无法获取用户配置' };
      }

      const updatedProfile = {
        ...profileResult.data,
        preferences: {
          ...profileResult.data.preferences,
          ...preferences
        }
      };

      return this.saveUserProfile(updatedProfile);
    } catch (error) {
      return {
        success: false,
        error: `更新用户偏好失败: ${error}`
      };
    }
  }

  // === 数据統計和分析 ===

  // 计算连击数
  calculateStreaks(): StorageResult<Record<string, number>> {
    try {
      const allRecordsResult = this.getAllDailyRecords();
      if (!allRecordsResult.success || !allRecordsResult.data) {
        return { success: false, error: '无法获取历史记录' };
      }

      const records = allRecordsResult.data;
      const streaks: Record<string, number> = {};

      // 按日期排序记录
      const sortedDates = Object.keys(records).sort().reverse();

      if (sortedDates.length === 0) {
        return { success: true, data: {} };
      }

      // 获取所有活动ID
      const allActivityIds = new Set<string>();
      Object.values(records).forEach(record => {
        Object.keys(record.activities).forEach(id => allActivityIds.add(id));
      });

      // 计算每个活动的连击数
      allActivityIds.forEach(activityId => {
        let streak = 0;
        for (const date of sortedDates) {
          if (records[date]?.activities[activityId] === true) {
            streak++;
          } else {
            break; // 连击中断
          }
        }
        streaks[activityId] = streak;
      });

      return { success: true, data: streaks };
    } catch (error) {
      return {
        success: false,
        error: `计算连击数失败: ${error}`
      };
    }
  }

  // 清除所有数据 (重置功能)
  clearAllData(): StorageResult<boolean> {
    try {
      if (!this.isStorageAvailable()) {
        return { success: false, error: 'LocalStorage不可用' };
      }

      localStorage.removeItem(STORAGE_KEYS.DAILY_RECORDS);
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: `清除数据失败: ${error}`
      };
    }
  }

  // 导出数据 (备份功能)
  exportData(): StorageResult<string> {
    try {
      const records = this.getAllDailyRecords();
      const profile = this.getUserProfile();

      if (!records.success || !profile.success) {
        return { success: false, error: '无法获取数据进行导出' };
      }

      const exportData = {
        records: records.data,
        profile: profile.data,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };

      return {
        success: true,
        data: JSON.stringify(exportData, null, 2)
      };
    } catch (error) {
      return {
        success: false,
        error: `导出数据失败: ${error}`
      };
    }
  }

  // 导入数据 (恢复功能)
  importData(jsonData: string): StorageResult<boolean> {
    try {
      const importData = JSON.parse(jsonData);

      if (importData.records) {
        this.safeSetItem(STORAGE_KEYS.DAILY_RECORDS, JSON.stringify(importData.records));
      }

      if (importData.profile) {
        this.safeSetItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(importData.profile));
      }

      return { success: true, data: true };
    } catch (error) {
      return {
        success: false,
        error: `导入数据失败: ${error}`
      };
    }
  }
}

// 导出单例实例
export const storage = LocalStorageManager.getInstance();