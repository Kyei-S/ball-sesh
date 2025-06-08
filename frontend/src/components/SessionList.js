export default function SessionList({ sessions, onSelect }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {sessions.map(s => (
        <div
          key={s._id}
          onClick={() => onSelect(s)}
          className="bg-surface rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
        >
          <img
            src="/pitchandballpic.png"
            alt="Football pitch"
            className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity"
          />
          <div className="p-6">
            <h2 className="text-xl font-bold text-text-primary mb-2">{s.venue}</h2>
            <p className="text-text-secondary text-sm mb-3">
              {new Date(s.time).toLocaleString()}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-secondary font-semibold">
                £{s.price?.toFixed(2) || "N/A"}
              </p>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                s.status === 'active'
                  ? 'bg-accent/20 text-accent'
                  : 'bg-gray-700/50 text-gray-400'
              }`}>
                {s.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
