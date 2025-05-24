
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/formatters';

const mockSavedFilters = [
  {
    id: '1',
    name: 'High-Value Properties',
    date: '2023-05-15',
    filters: {
      propertyValue: [5000000, 10000000],
      propertyType: 'Residential'
    }
  },
  {
    id: '2',
    name: 'Large Commercial Properties',
    date: '2023-05-20',
    filters: {
      propertySize: [5000, 10000],
      propertyType: 'Commercial'
    }
  },
  {
    id: '3',
    name: 'Billionaire Owners',
    date: '2023-06-01',
    filters: {
      ownerNetWorth: [500000000, 1000000000]
    }
  },
];

const SavedFilters = () => {
  const [filters] = useState(mockSavedFilters);

  return (
    <div className="container max-w-6xl py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-wealth-primary">Saved Filters</h1>
      </div>

      {filters.length === 0 ? (
        <div className="text-center p-12 bg-muted rounded-lg">
          <h3 className="text-xl font-medium mb-2">No saved filters yet</h3>
          <p className="text-muted-foreground mb-4">
            Save your search filters to quickly access them later
          </p>
          <Button>Go to Map</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filters.map((filter) => (
            <Card key={filter.id}>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{filter.name}</CardTitle>
                  <CardDescription>
                    Saved on {new Date(filter.date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button size="sm">
                    Apply Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-3">
                <div className="flex flex-wrap gap-2">
                  {filter.filters.propertyType && (
                    <Badge>
                      Type: {filter.filters.propertyType}
                    </Badge>
                  )}
                  {filter.filters.propertyValue && (
                    <Badge>
                      Value: {formatCurrency(filter.filters.propertyValue[0])} - {formatCurrency(filter.filters.propertyValue[1])}
                    </Badge>
                  )}
                  {filter.filters.propertySize && (
                    <Badge>
                      Size: {filter.filters.propertySize[0]} - {filter.filters.propertySize[1]} sq ft
                    </Badge>
                  )}
                  {filter.filters.ownerNetWorth && (
                    <Badge>
                      Owner Net Worth: {formatCurrency(filter.filters.ownerNetWorth[0])} - {formatCurrency(filter.filters.ownerNetWorth[1])}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedFilters;
