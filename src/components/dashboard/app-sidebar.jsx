import {
    LayoutDashboard,
    ClipboardList,
    FileText,
    Store,
    Users,
    Settings,
    Home,
  } from "lucide-react"
  
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  
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
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ]
  
  export function AppSidebar() {
    return (
      <Sidebar className="bg-gradient-to-b from-blue-900 to-indigo-800 text-white shadow-lg min-h-screen">
        <SidebarContent className="p-4 space-y-6">
          {/* Logo / Title */}
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-wide">AuditPro</h1>
            <p className="text-xs text-blue-300">Admin Panel</p>
          </div>
  
          <SidebarGroup>
            <SidebarGroupLabel className="text-blue-300 uppercase text-xs font-semibold tracking-wider px-2">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2 mt-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="w-full flex items-center gap-3 px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-700 transition-all text-sm font-medium text-white hover:text-white"
                    >
                      <a href={item.url}>
                        <item.icon className="w-4 h-4 text-blue-300" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }
  