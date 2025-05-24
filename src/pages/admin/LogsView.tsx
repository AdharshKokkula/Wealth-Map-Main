
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchLogs } from '@/services/mockData';
import { formatDate } from '@/lib/formatters';
import { Search } from 'lucide-react';

const LogsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: logs, isLoading } = useQuery({
    queryKey: ['logs'],
    queryFn: () => fetchLogs(100),
  });
  
  const filteredLogs = logs ? logs.filter(log => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      log.action.toLowerCase().includes(query) ||
      log.user_id.toLowerCase().includes(query)
    );
  }) : [];
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-wealth-primary">Activity Logs</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
          <CardDescription>View and search user activity across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs by action or user ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted">
                  <th className="text-left p-3 font-medium">Timestamp</th>
                  <th className="text-left p-3 font-medium">User ID</th>
                  <th className="text-left p-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="text-center p-4">
                      Loading logs...
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center p-4">
                      No logs found
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="border-t">
                      <td className="p-3">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3">{log.user_id}</td>
                      <td className="p-3">{log.action}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredLogs.length} of {logs?.length || 0} logs
            </p>
            <Button variant="outline" size="sm">
              Export Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogsView;
