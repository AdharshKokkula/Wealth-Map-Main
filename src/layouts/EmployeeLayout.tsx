
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
import { LogOut, Search, Settings } from 'lucide-react';

const EmployeeLayout = () => {
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
                to="/properties/map"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : 'hover:bg-muted'}`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3v6m6-13l5.447 2.724A1 1 0 0121 7.618v10.764a1 1 0 01-1.447.894L15 17m-6-4V4m6 4V4m0 0L9 7"
                  />
                </svg>
                {!isCollapsed && <span>Property Map</span>}
              </NavLink>
              <NavLink
                to="/properties/saved-views"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : 'hover:bg-muted'}`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {!isCollapsed && <span>Saved Views</span>}
              </NavLink>
              <NavLink
                to="/properties/filters"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : 'hover:bg-muted'}`
                }
              >
                <Search className="h-5 w-5" />
                {!isCollapsed && <span>Saved Filters</span>}
              </NavLink>
              <NavLink
                to="/properties/reports"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'sidebar-link-active' : 'hover:bg-muted'}`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {!isCollapsed && <span>Reports</span>}
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
                    <p className="truncate text-xs text-muted-foreground">Employee</p>
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
            <h1 className="ml-4 text-xl font-medium">Property Intelligence</h1>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EmployeeLayout;
