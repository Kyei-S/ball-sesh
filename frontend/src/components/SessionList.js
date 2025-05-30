export default function SessionList({ sessions, onSelect }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {sessions.map(s => (
        <div
          key={s._id}
          onClick={() => onSelect(s)}
          className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:shadow-xl transition"
        >
          {/* Pitch image */}
          <img
            src="/pitchandballpic.png"
            alt="Football pitch"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{s.venue}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(s.time).toLocaleString()}
            </p>
            <p className={`mt-2 inline-block px-2 py-1 text-xs font-medium rounded ${
              s.status === 'active'
                ? 'bg-heatYellow text-heatBlack'
                : 'bg-gray-300 text-gray-600'
            }`}>
              {s.status}
            </p>
            <p className="mt-2 text-gray-700">
              £{s.price?.toFixed(2) || "N/A"} • {s.venue}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
