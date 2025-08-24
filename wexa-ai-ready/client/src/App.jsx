
import React, { useEffect, useState } from "react";
const API = import.meta.env.VITE_API_BASE || "";
export default function App() {
  const [health, setHealth] = useState("checking...");
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!API) { setHealth("VITE_API_BASE not set"); return; }
    fetch(`${API}/healthz`).then(r => r.json()).then(d => setHealth(JSON.stringify(d))).catch(() => setHealth("failed"));
    fetch(`${API}/api/tickets`).then(r => r.json()).then(setTickets).catch(() => setTickets([]));
  }, []);

  const createTicket = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/api/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });
    const data = await res.json();
    if (data.error) return alert(data.error);
    setTickets(prev => [data, ...prev]);
    setTitle(""); setDescription("");
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "Inter, system-ui, Arial" }}>
      <h1>Wexa AI Helpdesk (Demo)</h1>
      <p><strong>API:</strong> {API || "(not set)"}</p>
      <p><strong>Health:</strong> {health}</p>
      <form onSubmit={createTicket} style={{ marginTop: 24, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
        <h2>Create Ticket</h2>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} rows="4" style={{ width: "100%", padding: 8 }} />
        <button type="submit" style={{ marginTop: 8, padding: "8px 16px" }}>Create</button>
      </form>
      <h2 style={{ marginTop: 32 }}>Tickets</h2>
      <ul>
        {tickets.map(t => (
          <li key={t._id || t.title} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            <strong>{t.title}</strong>
            <div>{t.description}</div>
            <small>Status: {t.status}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
