import { useState } from 'react';

export default function ADK() {
  const [agentName, setAgentName] = useState('');
  const [description, setDescription] = useState('');
  const [instruction, setInstruction] = useState('');
  const [agentClass, setAgentClass] = useState('LlmAgent');
  const [model, setModel] = useState('LiteLLM');
  const [customModel, setCustomModel] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const agentClasses = [
    'Agent',
    'LlmAgent',
    // 'ToolAgent',
    // 'ChatAgent',
    // 'MemoryAgent',
    // 'ReactiveAgent',
    // 'CompositeAgent',
    'SequentialAgent',
    'ParallelAgent',
    // 'RouterAgent',
    'LoopAgent',
  ];

  const models = [
    'LiteLLM',
    'AzureOpenAI',
    'OpenAI',
    // 'Custom LLM class',
    // 'HuggingFace',
    'String Input',
  ];

  const validateName = (name) => {
    const regex = /^[A-Za-z]+([A-Za-z_]*[A-Za-z]+)?$/;
    if (name === '') setError('');
    else if (!regex.test(name))
      setError(
        'Invalid name: only letters and underscores allowed, cannot start or end with _, no spaces or numbers.'
      );
    else setError('');
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setAgentName(value);
    validateName(value);
  };
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleInstructionChange = (e) => setInstruction(e.target.value);
  const handleClassChange = (e) => setAgentClass(e.target.value);
  const handleModelChange = (e) => {
    setModel(e.target.value);
    if (e.target.value !== 'String Input') setCustomModel('');
  };
  const handleCustomModelChange = (e) => setCustomModel(e.target.value);

  const handleCopy = () => {
    const code = generateCodeSnippet();
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const generateCodeSnippet = () => {
    const modelStr =
      model === 'String Input'
        ? `"${customModel || 'your_model_here'}"`
        : `${model}(${model === 'Custom LLM class' ? '' : `model="your_model_here"`})`;

    return `
${agentName || 'agent_name'} = ${agentClass}(
    model=${modelStr},
    name="${agentName || 'agent_name'}",
    description="""${description || 'Your agent description here.'}""",
    instruction="""${instruction || "You are a helpful assistant."}""",
    # tools will be added next
)`;
  };

  return (
    <div className="flex flex-col mt-4 p-4 border border-border rounded bg-agent-user w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 justify-center items-center">Google ADK Configuration</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Inputs */}
        <div className="flex-1 flex flex-col space-y-3">
          <label className="flex flex-col">
            Agent Class:
            <select
              value={agentClass}
              onChange={handleClassChange}
              className="border border-gray-300 rounded px-2 py-1 focus:bg-agent-bg focus:outline-none"
            >
              {agentClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            Model / LLM:
            <select
              value={model}
              onChange={handleModelChange}
              className="border border-gray-300 rounded px-2 py-1 focus:bg-agent-bg focus:outline-none"
            >
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          {model === 'String Input' && (
            <input
              type="text"
              value={customModel}
              onChange={handleCustomModelChange}
              className="border px-2 py-1 rounded focus:outline-none focus:bg-agent-bg"
              placeholder="Enter custom model string"
            />
          )}

          <label className="flex flex-col">
            Agent Name:
            <input
              type="text"
              value={agentName}
              onChange={handleNameChange}
              className={`border px-2 py-1 rounded focus:outline-none ${
                error ? 'border-red-500' : 'border-gray-300'
              } focus:bg-agent-bg`}
              placeholder="Enter agent name"
            />
          </label>
          {error && <span className="text-red-500 text-sm">{error}</span>}

          <label className="flex flex-col">
            Description:
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="border border-gray-300 rounded px-2 py-1 focus:bg-agent-bg focus:outline-none"
              placeholder="Enter description"
            />
          </label>

          <label className="flex flex-col">
            Instruction:
            <textarea
              value={instruction}
              onChange={handleInstructionChange}
              className="border border-gray-300 rounded px-2 py-1 focus:bg-agent-bg focus:outline-none"
              placeholder="Enter instruction"
            />
          </label>

          <button
            className="bg-accent hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 mt-2"
            disabled={!!error || !agentName}
          >
            Save Agent
          </button>
        </div>

        {/* Divider Line */}
        <div className="hidden md:block w-px bg-border my-2"></div>

        {/* Right Column - Copyable Python Code */}
        <div className="flex-1 relative">
          <button
            onClick={handleCopy}
            disabled={!agentName}
            className="absolute top-1 right-1 bg-accent hover:bg-green-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50 z-10"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <pre className="bg-[#1E1E1E] text-[#D19A66] p-4 rounded overflow-x-auto font-mono whitespace-pre-wrap h-full min-h-[400px]">
            {generateCodeSnippet()}
          </pre>
        </div>
      </div>
    </div>
  );
}
