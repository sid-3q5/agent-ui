import { useState } from 'react';
import ADK from '../components/adk'; // Your Google ADK component
// import LangChain from './LangChain.jsx'; // Optional other frameworks
// import LangGraph from './LangGraph.jsx';

export default function CreateAgent() {
  const [framework, setFramework] = useState('');

  return (
    <div>
      <h1 className="text-3xl font-bold">Create Agent</h1>
      <p className="mt-2">Here you can create and configure a new agent.</p>
      <div className="flex mt-4 justify-center items-center">
        <p className="">Select Framework for your agent : </p>
        <select className="border border-gray-300 rounded ml-4 py-1 focus:bg-agent-user focus:outline-none" 
          defaultValue=""
          value={framework}
          onChange={(e) => setFramework(e.target.value)}>
          <option value="" disabled>
            -- Select a framework --
          </option>
          <option value="googleadk">Google ADK</option>
          <option value="langC">LangChain</option>
          <option value="langG">LangGraph</option>
        </select> 
      </div>


      {/* FRAMEWORK */}
      <div className="mt-6 mb-10 justify-center items-center flex">
        {framework === 'googleadk' && <ADK />}
        {/* {framework === 'langC' && <LangChain />}
        {framework === 'langG' && <LangGraph />} */}
      </div>
    </div>
  );
}
