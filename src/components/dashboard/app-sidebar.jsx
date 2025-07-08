import {
  LayoutDashboard,
  ClipboardList,
  FileText,
  Store,
  Users,
  Settings,
  Home,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Audits",
    url: "/dashboard/audits",
    icon: ClipboardList,
  },
  {
    title: "Responses",
    url: "/dashboard/responses",
    icon: FileText,
  },
  {
    title: "Stores",
    url: "/dashboard/stores",
    icon: Store,
  },
  {
    title: "Company",
    url: "/dashboard/company",
    icon: Home,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Staff",
    url: "/dashboard/staff",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  // const { profile, isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Sidebar className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl min-h-screen border-r border-white/10">
      <SidebarContent className="p-6 space-y-8">
        {/* Logo / Title */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
          <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <h1 className="text-2xl font-bold text-white">
              AuditPro
            </h1>
            <p className="text-xs text-blue-300/80 mt-1 font-medium">
              Admin Dashboard
            </p>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300/90 uppercase text-xs font-bold tracking-widest px-3 mb-4 flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {items.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-sm font-medium text-white hover:text-white border border-white/5 hover:border-white/20 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] transform"
                  >
                    <a href={item.url}>
                      <div className="relative">
                        <item.icon className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 text-blue-500">
                        {item.title}
                      </span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom accent */}
        <div className="mt-auto pt-6">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <div className="mt-4 text-center">
            <p className="text-xs text-blue-500/60">
              Version 2.0
            </p>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}



// import {
//   LayoutDashboard,
//   ClipboardList,
//   FileText,
//   Store,
//   Users,
//   Settings,
//   Home,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// const items = [
//   {
//     title: "Dashboard",
//     url: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Audits",
//     url: "/dashboard/audits",
//     icon: ClipboardList,
//   },
//   {
//     title: "Responses",
//     url: "/dashboard/responses",
//     icon: FileText,
//   },
//   {
//     title: "Stores",
//     url: "/dashboard/stores",
//     icon: Store,
//   },
//   {
//     title: "Company",
//     url: "/dashboard/company",
//     icon: Home,
//   },
//   {
//     title: "Users",
//     url: "/dashboard/users",
//     icon: Users,
//   },
//   {
//     title: "Staff",
//     url: "/dashboard/staff",
//     icon: Users,
//   },
//   {
//     title: "Settings",
//     url: "/dashboard/settings",
//     icon: Settings,
//   },
// ];

// export function AppSidebar() {
//   // const { profile, isLoggedIn } = useSelector((state) => state.auth);

//   return (
//     <Sidebar className="bg-gradient-to-b from-blue-900 to-indigo-800 text-white shadow-lg min-h-screen">
//       <SidebarContent className="p-4 space-y-6">
//         {/* Logo / Title */}
//         <div className="text-center">
//           <h1 className="text-xl font-bold tracking-wide">AuditPro</h1>
//           <p className="text-xs text-blue-300">Admin Panel</p>
//         </div>

//         <SidebarGroup>
//           <SidebarGroupLabel className="text-blue-300 uppercase text-xs font-semibold tracking-wider px-2">
//             Navigation
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu className="space-y-2 mt-2">
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton
//                     asChild
//                     className="w-full flex items-center gap-3 px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-700 transition-all text-sm font-medium text-white hover:text-white"
//                   >
//                     <a href={item.url}>
//                       <item.icon className="w-4 h-4 text-blue-300" />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }
