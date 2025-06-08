export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Sessions', value: '24', trend: '+12%' },
          { label: 'Active Players', value: '156', trend: '+8%' },
          { label: 'Revenue', value: '£1,234', trend: '+15%' },
          { label: 'Satisfaction', value: '4.8/5', trend: '+2%' },
        ].map((stat, i) => (
          <div key={i} className="glass-effect p-6 rounded-xl">
            <p className="text-text-secondary">{stat.label}</p>
            <p className="text-3xl font-bold neon-text">{stat.value}</p>
            <p className="text-emerald-400">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-effect p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Bookings Overview</h3>
          <div className="h-64 flex items-center justify-center border border-white/10 rounded">
            {/* Placeholder for Chart */}
            <p className="text-text-secondary">Chart Component Here</p>
          </div>
        </div>

        <div className="glass-effect p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center border border-white/10 rounded">
            {/* Placeholder for Chart */}
            <p className="text-text-secondary">Chart Component Here</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-effect p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <p className="font-medium">New Booking</p>
                <p className="text-text-secondary text-sm">John Doe booked Evening Session</p>
              </div>
              <span className="text-text-secondary">2h ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
