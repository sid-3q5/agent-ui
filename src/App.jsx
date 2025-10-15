import './App.css';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Routes, Route } from 'react-router-dom';
import CreateAgent from './pages/CreateAgent.jsx';
import Setting from './pages/Setting.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <div className="bg-agent-bg min-h-screen flex text-text-primary">
      {/* SIDEBAR */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-agent" element={<CreateAgent />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white text-center py-4">
        Developed by Siddhant Chauhan
      </footer>
    </div>
  );
}

export default App;
