
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { fetchCompany, updateCompany } from '@/services/mockData';
import { Separator } from "@/components/ui/separator";

const CompanySettings = () => {
  const { data: company, refetch } = useQuery({
    queryKey: ['company'],
    queryFn: () => fetchCompany('1'),
  });

  const [name, setName] = useState(company?.name || '');
  const [logoUrl, setLogoUrl] = useState(company?.logo_url || '');
  const [dataPreferences, setDataPreferences] = useState<Record<string, boolean>>(
    company?.data_preferences || {
      show_net_worth: true,
      show_wealth_sources: true,
      show_property_values: true,
      show_transaction_history: true,
    }
  );

  const updateMutation = useMutation({
    mutationFn: (updates: { name: string; logo_url: string; data_preferences: Record<string, boolean> }) => 
      updateCompany('1', updates),
    onSuccess: () => {
      toast.success('Company settings updated successfully');
      refetch();
    },
    onError: () => {
      toast.error('Failed to update company settings');
    }
  });

  const handlePreferenceChange = (key: string, value: boolean) => {
    setDataPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      name,
      logo_url: logoUrl,
      data_preferences: dataPreferences,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-wealth-primary">Company Settings</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Update your company details and branding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="company-name" className="text-sm font-medium">
                  Company Name
                </label>
                <Input
                  id="company-name"
                  placeholder="Company name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="logo-url" className="text-sm font-medium">
                  Logo URL
                </label>
                <Input
                  id="logo-url"
                  placeholder="https://example.com/logo.png"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                />
                {logoUrl && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Logo Preview:</p>
                    <div className="h-16 w-16 border rounded flex items-center justify-center overflow-hidden">
                      <img src={logoUrl} alt="Company Logo" className="max-h-full max-w-full" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data Preferences</CardTitle>
            <CardDescription>Configure what data is accessible to employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Owner Net Worth Data</p>
                  <p className="text-sm text-muted-foreground">Allow employees to view owner net worth estimates</p>
                </div>
                <Switch
                  checked={dataPreferences.show_net_worth || false}
                  onCheckedChange={(checked) => handlePreferenceChange('show_net_worth', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Wealth Sources Data</p>
                  <p className="text-sm text-muted-foreground">Allow employees to view wealth source breakdowns</p>
                </div>
                <Switch
                  checked={dataPreferences.show_wealth_sources || false}
                  onCheckedChange={(checked) => handlePreferenceChange('show_wealth_sources', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Property Values</p>
                  <p className="text-sm text-muted-foreground">Allow employees to view property valuation data</p>
                </div>
                <Switch
                  checked={dataPreferences.show_property_values || false}
                  onCheckedChange={(checked) => handlePreferenceChange('show_property_values', checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transaction History</p>
                  <p className="text-sm text-muted-foreground">Allow employees to view property transaction history</p>
                </div>
                <Switch
                  checked={dataPreferences.show_transaction_history || false}
                  onCheckedChange={(checked) => handlePreferenceChange('show_transaction_history', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanySettings;
