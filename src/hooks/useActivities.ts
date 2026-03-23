'use client';

import { useState, useEffect, useCallback } from 'react';
import { Activity, DailyRecord, UserProfile } from '@/types';
import { storage } from '@/lib/storage';
import { DEFAULT_ACTIVITIES } from '@/lib/activities';

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>(DEFAULT_ACTIVITIES);
  const [todayRecord, setTodayRecord] = useState<DailyRecord | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [streaks, setStreaks] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载数据
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 获取今日记录
      const todayResult = storage.getTodayRecord();
      if (todayResult.success) {
        setTodayRecord(todayResult.data);
      }

      // 获取用户配置
      const profileResult = storage.getUserProfile();
      if (profileResult.success && profileResult.data) {
        setUserProfile(profileResult.data);
        // 合并自定义活动
        setActivities([...DEFAULT_ACTIVITIES, ...profileResult.data.customActivities]);
      }

      // 计算连击数
      const streaksResult = storage.calculateStreaks();
      if (streaksResult.success && streaksResult.data) {
        setStreaks(streaksResult.data);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : '加载数据失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始化加载数据
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 切换活动完成状态
  const toggleActivity = useCallback(async (activityId: string, completed: boolean) => {
    try {
      const result = storage.updateTodayActivity(activityId, completed);
      if (result.success) {
        // 更新今日记录
        const updatedRecord = storage.getTodayRecord();
        if (updatedRecord.success) {
          setTodayRecord(updatedRecord.data);
        }

        // 重新计算连击数
        const streaksResult = storage.calculateStreaks();
        if (streaksResult.success && streaksResult.data) {
          setStreaks(streaksResult.data);
        }

        return true;
      } else {
        setError(result.error || '更新活动失败');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新活动失败');
      return false;
    }
  }, []);

  // 添加自定义活动
  const addCustomActivity = useCallback(async (activity: Omit<Activity, 'id'>) => {
    try {
      if (!userProfile) return false;

      const newActivity: Activity = {
        ...activity,
        id: `custom_${Date.now()}`,
        category: 'custom'
      };

      const updatedProfile = {
        ...userProfile,
        customActivities: [...userProfile.customActivities, newActivity]
      };

      const result = storage.saveUserProfile(updatedProfile);
      if (result.success) {
        setUserProfile(updatedProfile);
        setActivities([...DEFAULT_ACTIVITIES, ...updatedProfile.customActivities]);
        return true;
      } else {
        setError(result.error || '添加自定义活动失败');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '添加自定义活动失败');
      return false;
    }
  }, [userProfile]);

  // 更新用户偏好
  const updatePreferences = useCallback(async (preferences: Partial<UserProfile['preferences']>) => {
    try {
      if (!userProfile) return false;

      const result = storage.updateUserPreferences(preferences);
      if (result.success) {
        setUserProfile({
          ...userProfile,
          preferences: {
            ...userProfile.preferences,
            ...preferences
          }
        });
        return true;
      } else {
        setError(result.error || '更新偏好设置失败');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新偏好设置失败');
      return false;
    }
  }, [userProfile]);

  // 清除错误
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // 计算统计数据
  const stats = {
    totalActivities: activities.length,
    completedToday: todayRecord ? Object.values(todayRecord.activities).filter(Boolean).length : 0,
    completionRate: todayRecord ? todayRecord.completionRate : 0,
    totalStreaks: Object.keys(streaks).length,
    maxStreak: Object.values(streaks).length > 0 ? Math.max(...Object.values(streaks)) : 0
  };

  return {
    // 数据
    activities,
    todayRecord,
    userProfile,
    streaks,
    stats,

    // 状态
    loading,
    error,

    // 方法
    toggleActivity,
    addCustomActivity,
    updatePreferences,
    loadData,
    clearError
  };
}