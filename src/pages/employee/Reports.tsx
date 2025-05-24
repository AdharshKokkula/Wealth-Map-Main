
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatters';

const mockReports = [
  {
    id: '1',
    name: 'Q2 2023 Property Report',
    date: '2023-06-30',
    properties: 48,
    type: 'Quarterly Analysis'
  },
  {
    id: '2',
    name: 'High-Value Properties',
    date: '2023-07-15',
    properties: 26,
    type: 'Custom Export'
  },
  {
    id: '3',
    name: 'West Coast Market Overview',
    date: '2023-08-01',
    properties: 72,
    type: 'Market Analysis'
  },
  {
    id: '4',
    name: 'Tech Owner Properties',
    date: '2023-08-10',
    properties: 15,
    type: 'Ownership Analysis'
  }
];

const Reports = () => {
  const [reports] = useState(mockReports);

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-wealth-primary">Reports</h1>
        <Button>
          Create New Report
        </Button>
      </div>

      {reports.length === 0 ? (
        <div className="text-center p-12 bg-muted rounded-lg">
          <h3 className="text-xl font-medium mb-2">No reports yet</h3>
          <p className="text-muted-foreground mb-4">
            Create reports to analyze property data
          </p>
          <Button>Create Report</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-4 font-medium">Report Name</th>
                      <th className="text-left p-4 font-medium">Type</th>
                      <th className="text-left p-4 font-medium">Created</th>
                      <th className="text-left p-4 font-medium">Properties</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} className="border-t">
                        <td className="p-4">{report.name}</td>
                        <td className="p-4">{report.type}</td>
                        <td className="p-4">{formatDate(report.date)}</td>
                        <td className="p-4">{report.properties}</td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="ml-2">
                            View
                          </Button>
                          <Button size="sm" className="ml-2">
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Reports;
