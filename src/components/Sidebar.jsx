import { useState } from 'react';
import { MdMenu, MdHome, MdChat, MdSettings } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { GoSidebarExpand } from "react-icons/go";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', icon: <MdHome className="text-xl" />, path: '/' },
    { name: 'Create Agent', icon: <MdChat className="text-xl" />, path: '/create-agent' },
    { name: 'Settings', icon: <MdSettings className="text-xl" />, path: '/setting' },
  ];

  return (
    <aside
      className={`${isOpen ? 'w-60' : 'w-16'} bg-agent-sidebar min-h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Toggle button */}
      <div className="flex justify-end p-2">
        {isOpen ? (
          <GoSidebarExpand
            className="text-text-secondary hover:text-accent cursor-pointer text-2xl"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <MdMenu
            className="text-text-secondary hover:text-accent cursor-pointer text-3xl mx-auto"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      {/* Sidebar items */}
      {isOpen && (
        <div className="flex flex-col items-start mt-4 space-y-3 mx-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-4 w-full p-2 rounded hover:bg-agent-user ${
                location.pathname === item.path ? 'bg-agent-user' : ''
              }`}
            >
              {item.icon}
              <span className="text-text-primary">{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
}
