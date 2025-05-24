
import { useState } from 'react';
import { Property } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { toast } from 'sonner';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetails = ({ property, onClose }: PropertyDetailsProps) => {
  const [activeTab, setActiveTab] = useState('details');
  
  // Implement export functionality
  const handleExport = () => {
    const propertyData = {
      address: property.address,
      value: property.value,
      type: property.type,
      size: property.size,
      owner: property.owner?.name,
      coordinates: `${property.latitude},${property.longitude}`
    };
  
    const csvContent = Object.entries(propertyData)
      .map(([key, value]) => `${key},${value}`)
      .join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `property-${property.address.replace(/\s+/g, '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  // Add image loading states and error handling
  const [imageLoading, setImageLoading] = useState(true);
  
  // Update the image rendering section
  <div className="grid grid-cols-3 gap-2">
    {property.images && (
      <>
        <div className="relative">
          <img
            src={property.images.main}
            alt={property.address}
            className={`w-full h-24 object-cover rounded transition-opacity duration-200 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.src = '/placeholder-image.jpg';
              toast.error('Failed to load image');
            }}
          />
          {imageLoading && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded" />
          )}
        </div>
        {property.images.additional?.slice(0, 2).map((img, i) => (
          <div key={i} className="relative">
            <img
              src={img}
              alt={`${property.address} ${i+1}`}
              className="w-full h-24 object-cover rounded"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.src = '/placeholder-image.jpg';
                toast.error('Failed to load image');
              }}
            />
          </div>
        ))}
      </>
    )}
  </div>
  
  return (
    <Card className="w-full shadow-xl border-t-4 border-t-wealth-accent animate-in fade-in slide-in-from-bottom-10 duration-300">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-semibold">{property.address}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">Property Details</TabsTrigger>
            <TabsTrigger value="owner" className="flex-1">Owner</TabsTrigger>
            <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-wealth-secondary">Property Type</p>
                <p className="text-wealth-primary">{property.type || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-wealth-secondary">Value</p>
                <p className="text-wealth-primary">{property.value ? formatCurrency(property.value) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-wealth-secondary">Size</p>
                <p className="text-wealth-primary">{property.size ? `${formatNumber(property.size)} sq ft` : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-wealth-secondary">Location</p>
                <p className="text-wealth-primary">{property.latitude.toFixed(4)}, {property.longitude.toFixed(4)}</p>
              </div>
            </div>
            
            {property.images && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-wealth-secondary">Images</p>
                <div className="grid grid-cols-3 gap-2">
                  <img src={property.images.main} alt={property.address} className="w-full h-24 object-cover rounded" />
                  {property.images.additional?.slice(0, 2).map((img, i) => (
                    <img key={i} src={img} alt={`${property.address} ${i+1}`} className="w-full h-24 object-cover rounded" />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="owner" className="pt-4 space-y-4">
            {property.owner ? (
              <>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-wealth-secondary">Owner Name</p>
                  <p className="text-lg font-medium text-wealth-primary">{property.owner.name}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-wealth-secondary">Net Worth</p>
                    <p className="text-wealth-primary">{property.owner.net_worth ? formatCurrency(property.owner.net_worth) : 'N/A'}</p>
                    {property.owner.confidence && (
                      <p className="text-xs text-wealth-secondary">
                        Confidence: {Math.round(property.owner.confidence * 100)}%
                      </p>
                    )}
                  </div>
                  
                  {property.owner.wealth_sources && (
                    <div>
                      <p className="text-sm font-medium text-wealth-secondary">Wealth Sources</p>
                      <div className="space-y-1 mt-1">
                        {Object.entries(property.owner.wealth_sources.sources || {}).map(([source, percentage]) => (
                          <div key={source} className="flex justify-between text-sm">
                            <span>{source}</span>
                            <span>{String(percentage)}%</span>
                          </div>
                        ))}
                      </div>
                      {property.owner.wealth_sources.last_updated && (
                        <p className="text-xs text-wealth-secondary mt-2">
                          Last updated: {new Date(property.owner.wealth_sources.last_updated).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="text-wealth-secondary italic">No owner information available</p>
            )}
          </TabsContent>
          
          <TabsContent value="transactions" className="pt-4">
            {property.transaction_history && property.transaction_history.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm font-medium text-wealth-secondary">Transaction History</p>
                <div className="space-y-3">
                  {property.transaction_history.map((transaction, i) => (
                    <div key={i} className="p-3 bg-muted rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">{transaction.type}</span>
                        <span>{formatCurrency(transaction.price)}</span>
                      </div>
                      <div className="text-sm text-wealth-secondary mt-1">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-wealth-secondary italic">No transaction history available</p>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button onClick={handleExport} variant="outline" size="sm">
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetails;
