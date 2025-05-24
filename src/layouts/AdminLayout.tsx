
import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { LogOut, Settings, Users, Logs } from 'lucide-react';

const AdminLayout = () => {
  const { signOut, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar defaultCollapsed={isCollapsed} onCollapsedChange={setIsCollapsed}>
          <SidebarHeader className="border-b px-6 py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-wealth-primary">
                {!isCollapsed && (
                  <span className="flex items-center gap-2">
                    <span className="text-wealth-accent">Wealth</span>Map
                  </span>
                )}
                {isCollapsed && <span>WM</span>}
              </h2>
            </div>
          </SidebarHeader>
          <SidebarContent className="px-3 py-4">
            <nav className="space-y-1">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : 'hover:bg-muted'}`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
                {!isCollapsed && <span>Dashboard</span>}
              </NavLink>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : 'hover:bg-muted'}`
                }
              >
                <Users className="h-5 w-5" />
                {!isCollapsed && <span>User Management</span>}
              </NavLink>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : 'hover:bg-muted'}`
                }
              >
                <Settings className="h-5 w-5" />
                {!isCollapsed && <span>Company Settings</span>}
              </NavLink>
              <NavLink
                to="/admin/logs"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : 'hover:bg-muted'}`
                }
              >
                <Logs className="h-5 w-5" />
                {!isCollapsed && <span>Activity Logs</span>}
              </NavLink>
            </nav>
          </SidebarContent>
          <SidebarFooter className="border-t px-6 py-3">
            <div className="flex flex-col gap-4">
              {!isCollapsed && (
                <div className="flex items-center gap-3 px-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-wealth-accent text-white">
                    {user?.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="truncate text-sm font-medium">{user?.email}</p>
                    <p className="truncate text-xs text-muted-foreground">Administrator</p>
                  </div>
                </div>
              )}
              <Button variant="ghost" className="justify-start" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                {!isCollapsed && <span>Logout</span>}
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
