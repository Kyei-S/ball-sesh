import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateSessionModal from "../components/CreateSessionModal"; // import it!

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchSessions = () => {
    setLoading(true);
    axios.get("/api/sessions")
      .then(res => {
        setSessions(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Sessions</h2>
        <button
          className="bg-heatRed text-white px-4 py-2 rounded font-semibold shadow"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Session
        </button>
      </div>
      <CreateSessionModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={fetchSessions}
      />


      {/* ...table from earlier code... */}
      {/* (keep your table code as before) */}

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white rounded shadow">
            <thead>
            <tr>
                <th className="px-6 py-3 text-center w-1/4">Venue</th>
                <th className="px-6 py-3 text-center w-1/4">Date & Time</th>
                <th className="px-6 py-3 text-center w-1/4">Status</th>
                <th className="px-6 py-3 text-center w-1/4">Actions</th>
            </tr>
            </thead>
            <tbody>
            {loading ? (
                <tr>
                <td colSpan={4} className="text-center py-6">Loading...</td>
                </tr>
            ) : sessions.length === 0 ? (
                <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">No sessions found.</td>
                </tr>
            ) : (
                sessions.map(session => (
                <tr key={session._id}>
                    <td className="px-6 py-2 text-center">{session.venue}</td>
                    <td className="px-6 py-2 text-center">{new Date(session.time).toLocaleString()}</td>
                    <td className="px-6 py-2 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{session.status}</span>
                    </td>
                    <td className="px-6 py-2 text-center space-x-1">
                    <button className="bg-yellow-200 px-2 py-1 rounded">Edit</button>
                    <button className="bg-gray-200 px-2 py-1 rounded">Cancel</button>
                    <button className="bg-red-200 px-2 py-1 rounded">Delete</button>
                    <button className="bg-blue-200 px-2 py-1 rounded">Roster</button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>


    </div>
  );
}
