
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockSavedViews = [
  { id: '1', name: 'Downtown Commercial Properties', date: '2023-05-10', propertyCount: 24 },
  { id: '2', name: 'High-Value Residential', date: '2023-05-15', propertyCount: 18 },
  { id: '3', name: 'West Coast Investment Opportunities', date: '2023-05-22', propertyCount: 31 },
  { id: '4', name: 'Tech Billionaire Properties', date: '2023-06-01', propertyCount: 12 },
];

const SavedViews = () => {
  const [views] = useState(mockSavedViews);

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-wealth-primary">Saved Map Views</h1>
      </div>

      {views.length === 0 ? (
        <div className="text-center p-12 bg-muted rounded-lg">
          <h3 className="text-xl font-medium mb-2">No saved views yet</h3>
          <p className="text-muted-foreground mb-4">
            Save your map views to quickly access them later
          </p>
          <Button>Go to Map</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {views.map((view) => (
            <Card key={view.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle>{view.name}</CardTitle>
                <CardDescription>
                  Saved on {new Date(view.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-wealth-secondary"
                  >
                    <path d="M8 6l4-4 4 4" />
                    <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L3.6 22" />
                    <path d="m9 18 1 1 9.9-9.9" />
                  </svg>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {view.propertyCount} properties
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button size="sm">
                      Load View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedViews;
