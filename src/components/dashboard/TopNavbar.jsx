// components/ui/top-navbar.tsx
import { Bell, Menu, User } from "lucide-react"
import { SidebarTrigger } from "../ui/sidebar"

export default function TopNavbar() {
  return (
    <header className="w-full h-16 bg-red-400 shadow-sm border-b border-gray-200 flex items-center justify-between px-6 z-10">
      {/* Left: App/Section Name */}
      
      <div className="text-lg font-semibold text-gray-700">
        <SidebarTrigger/>
        Dashboard
      </div>

      {/* Right: Profile + Notifications */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-500 hover:text-gray-700 transition">
          <Bell className="w-5 h-5" />
          {/* Optional: Notification badge */}
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
        </button>

        {/* Profile Avatar */}
        <div className="relative group">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold cursor-pointer">
            A
          </div>
          {/* Profile dropdown on hover (optional) */}
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg hidden group-hover:block text-sm text-gray-700">
            <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
              Profile
            </a>
            <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
              Settings
            </a>
            <a href="/logout" className="block px-4 py-2 hover:bg-gray-100">
              Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
