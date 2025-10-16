import { useState, useEffect } from 'react';
import ADK from '../components/ADK';

export default function CreateAgent() {
  const [framework, setFramework] = useState('');
  const [frameworks, setFrameworks] = useState([]);

  const API_BASE = 'http://localhost:8000/data'; // Adjust if needed

  useEffect(() => {
    fetch(`${API_BASE}/frameworks`)
      .then((res) => res.json())
      .then((data) => setFrameworks(data.frameworks));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Create Agent</h1>
      <p className="mt-2">Here you can create and configure a new agent.</p>

      {/* Framework Selection */}
      <div className="flex mt-4 items-center gap-4">
        <p>Select Framework:</p>
        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="border border-gray-300 rounded py-1 px-2 focus:outline-none focus:bg-agent-user"
        >
          <option value="" disabled>-- Select framework --</option>
          {frameworks.map((fw) => (
            <option key={fw} value={fw}>{fw}</option>
          ))}
        </select>
      </div>

      {/* Render ADK dynamically when framework is selected */}
      {framework && <ADK framework={framework} />}
    </div>
  );
}
