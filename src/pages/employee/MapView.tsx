
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FilterState, MapViewState, Property } from '@/types';
import PropertyFilters from '@/components/PropertyFilters';
import { fetchProperties } from '@/services/mockData';

const PropertyMap = React.lazy(() => import('@/components/PropertyMap'));

const MapView = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    propertyValue: [1000000, 10000000],
    propertySize: [1000, 11000],
    ownerNetWorth: [100000000, 1000000000],
  });

  const [mapViewState, setMapViewState] = useState<MapViewState>({
    center: [37.0902, -95.7129],
    zoom: 4,
  });

  // Fetch properties with the current filters
  const { data: properties, isLoading, refetch } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties(filters),
  });

  // Re-fetch when filters change
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleViewStateChange = (viewState: MapViewState) => {
    setMapViewState(viewState);
  };

  return (
    <div className="h-full flex">
      <div className="w-80 p-4 overflow-auto border-r">
        <PropertyFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          loading={isLoading}
        />
        
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-1">Properties Found</h3>
          <p className="text-2xl font-bold text-wealth-accent">
            {isLoading ? '...' : properties?.length || 0}
          </p>
        </div>
      </div>

      <div className="flex-1 relative">
        <React.Suspense fallback={<div className="flex items-center justify-center h-full">Loading map...</div>}>
          <PropertyMap
            properties={properties || []}
            loading={isLoading}
            filters={filters}
            onViewStateChange={handleViewStateChange}
          />
        </React.Suspense>
      </div>
    </div>
  );
};

export default MapView;
