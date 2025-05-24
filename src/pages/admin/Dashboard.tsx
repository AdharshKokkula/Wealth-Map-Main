
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchLogs, fetchCompanyUsers, mockProperties, fetchCompany, mockUsers } from "@/services/mockData";

const AdminDashboard = () => {
  const { data: company } = useQuery({
    queryKey: ['company'],
    queryFn: () => fetchCompany('1'),
  });
  
  const { data: logs } = useQuery({
    queryKey: ['logs'],
    queryFn: () => fetchLogs(5),
  });

  // Calculate stats
  const totalUsers = mockUsers.length;
  const totalProperties = mockProperties.length;
  const totalLogins = mockUsers.length * 5; // Mocked data
  const reportsGenerated = 12; // Mocked data

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-wealth-primary">{company?.name || 'Company'} Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">{totalUsers}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {totalUsers - 1} employees, 1 admin
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Properties</CardDescription>
            <CardTitle className="text-3xl">{totalProperties}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Available in the database
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Login Sessions</CardDescription>
            <CardTitle className="text-3xl">{totalLogins}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Reports Generated</CardDescription>
            <CardTitle className="text-3xl">{reportsGenerated}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs?.slice(0, 5).map((log) => (
                <div key={log.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <p className="text-sm text-muted-foreground">
                      User ID: {log.user_id}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Platform Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Property Searches</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-wealth-accent h-2.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Property Details Views</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-wealth-accent h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Owner Data Accessed</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-wealth-accent h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Report Generation</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-wealth-accent h-2.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
