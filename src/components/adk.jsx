import { useState, useEffect } from "react";

export default function ADK({ framework }) {
  const [provider, setProvider] = useState("");
  const [providers, setProviders] = useState([]);
  const [agentClasses, setAgentClasses] = useState([]);
  const [models, setModels] = useState([]);

  const [agentClass, setAgentClass] = useState("");
  const [agentName, setAgentName] = useState("");
  const [description, setDescription] = useState("");
  const [instruction, setInstruction] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [error, setError] = useState("");

  // const API_BASE = "http://localhost:8000/data";
   const API_BASE = "https://agent-dev-env-backend-production.up.railway.app/data";
  

  useEffect(() => {
    if (!framework) return;
    fetch(`${API_BASE}/providers/${framework}`)
      .then((res) => res.json())
      .then((data) => setProviders(data.providers));
    setProvider("");
    setAgentClasses([]);
    setModels([]);
    setAgentClass("");
    setAgentName("");
    setDescription("");
    setInstruction("");
    setSelectedModel("");
    setGeneratedCode("");
  }, [framework]);

  useEffect(() => {
    if (!framework || !provider) return;

    fetch(`${API_BASE}/agentClasses/${framework}/${provider}`)
      .then((res) => res.json())
      .then((data) => setAgentClasses(data.agentClasses));

    fetch(`${API_BASE}/models/${framework}/${provider}`)
      .then((res) => res.json())
      .then((data) => setModels(data.models));

    setAgentClass("");
    setSelectedModel("");
    setGeneratedCode("");
  }, [framework, provider]);

  const handleGenerateCode = () => {
    if (!framework || !provider || !agentClass || !agentName || !selectedModel) {
      setError("Please fill all required fields");
      return;
    }
    setError("");

    const payload = {
      framework,
      provider,
      agent_class: agentClass,
      agent_name: agentName,
      description,
      instruction,
      model: selectedModel,
    };

    fetch("https://agent-dev-env-backend-production.up.railway.app/generate_code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => setGeneratedCode(data.generated_code))
      .catch(() => setError("Failed to generate code"));
  };

  return (
    <div className="flex flex-col mt-4 p-4 border border-border rounded bg-agent-user w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Configure {framework} Agent
      </h2>

      <div className="flex gap-4 mb-4 items-center">
        <p>Provider:</p>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
        >
          <option value="" disabled>
            -- Select provider --
          </option>
          {providers.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {provider && (
        <>
          <label className="flex flex-col mb-2">
            Agent Class:
            <select
              value={agentClass}
              onChange={(e) => setAgentClass(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none mt-1"
            >
              <option value="" disabled>
                -- Select agent class --
              </option>
              {agentClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col mb-2">
            Model:
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none mt-1"
            >
              <option value="" disabled>
                -- Select model --
              </option>
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="Agent Name"
            className="border px-2 py-1 rounded focus:outline-none mb-2"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none mb-2"
          />

          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Instruction"
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none mb-2"
          />

          {error && <span className="text-red-500 text-sm mb-2">{error}</span>}

          <button
            onClick={handleGenerateCode}
            className="bg-accent hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
          >
            Generate Code
          </button>

          {generatedCode && (
            <pre className="bg-[#1E1E1E] text-[#D19A66] p-4 rounded overflow-x-auto font-mono whitespace-pre-wrap mt-4">
              {generatedCode}
            </pre>
          )}
        </>
      )}
    </div>
  );
}
