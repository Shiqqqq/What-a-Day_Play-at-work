export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          今日上朝 👑
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          皇上，今日您过得如何？
        </p>

        <div className="bg-white/80 rounded-3xl p-8 shadow-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            今日清单 📋
          </h2>

          <div className="space-y-4">
            {[
              { id: 'poop', text: '今天成功拉屎了吗？', emoji: '💩' },
              { id: 'shower', text: '今天洗澡了吗？', emoji: '🛁' },
              { id: 'coffee', text: '喝了几杯咖啡续命？', emoji: '☕' },
              { id: 'slack', text: '今天摸鱼了吗？', emoji: '🐟' },
              { id: 'phone', text: '刷手机超过8小时了吗？', emoji: '📱' },
            ].map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{activity.emoji}</span>
                  <span className="text-lg font-medium">{activity.text}</span>
                </div>
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full hover:border-green-400"></div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
            <div className="text-4xl mb-2">🐼</div>
            <p className="text-gray-700">
              熊猫君正在等你完成今日的沙雕任务！
            </p>
          </div>
        </div>

        <footer className="mt-8 text-gray-500">
          <p>🎌 愿你每天都能成功上朝，做个快乐的废物</p>
        </footer>
      </div>
    </div>
  );
}