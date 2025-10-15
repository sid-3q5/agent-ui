import { GiRobotHelmet } from "react-icons/gi";

export default function Navbar({ toggleSidebar }) {
  return (
    <header className="border-b border-border p-4 flex items-center">
      <div className="flex items-center ml-20">
        <GiRobotHelmet className="text-sky-300 text-2xl" />
        <div className="pl-4 text-text-primary font-semibold">
          Agent Development Environment
        </div>
      </div>
    </header>
  );
}
