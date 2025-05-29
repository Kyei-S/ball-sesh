import React, { useState } from "react";
import axios from "axios";

export default function CreateSessionModal({ open, onClose, onCreated }) {
  const [venue, setVenue] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("5v5");
  const [playerCap, setPlayerCap] = useState(16);
  const [price, setPrice] = useState(8);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/sessions", {
        venue,
        time,
        type,
        playerCap,
        price,
        status: "active"
      });
      onCreated(); // tell parent to refresh session list
      onClose();   // close modal
    } catch (err) {
      alert("Failed to create session");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Session</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Venue" value={venue} onChange={e => setVenue(e.target.value)} required className="input input-bordered w-full" />
          <input type="datetime-local" value={time} onChange={e => setTime(e.target.value)} required className="input input-bordered w-full" />
          <select value={type} onChange={e => setType(e.target.value)} className="input input-bordered w-full">
            <option value="5v5">5v5</option>
            <option value="8v8">8v8</option>
          </select>
          <input type="number" placeholder="Player Cap" value={playerCap} onChange={e => setPlayerCap(e.target.value)} className="input input-bordered w-full" />
          <input type="number" step="0.01" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="input input-bordered w-full" />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="btn bg-gray-200">Cancel</button>
            <button type="submit" className="btn bg-heatRed text-white">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
