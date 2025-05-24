
import { Company, Property, Owner, User, Log } from '@/types';

// Mock data for properties
export const generateMockProperties = (count: number): Property[] => {
  const propertyTypes = ['Residential', 'Commercial', 'Industrial', 'Land', 'Agricultural'];
  
  return Array.from({ length: count }).map((_, i) => {
    // Generate properties across the US with different locations
    const latitude = 37.0902 + (Math.random() - 0.5) * 10;
    const longitude = -95.7129 + (Math.random() - 0.5) * 20;
    
    const ownerId = `owner-${Math.floor(Math.random() * 20) + 1}`;
    
    return {
      id: `property-${i + 1}`,
      address: `${Math.floor(Math.random() * 9999) + 1} ${['Main St', 'Oak Ave', 'Maple Rd', 'Washington Blvd', 'Highland Dr'][Math.floor(Math.random() * 5)]}, ${['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'San Francisco'][Math.floor(Math.random() * 6)]}`,
      latitude,
      longitude,
      value: Math.floor(Math.random() * 9000000) + 1000000, // $1M to $10M
      size: Math.floor(Math.random() * 10000) + 1000, // 1000 to 11000 sq ft
      type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
      owner_id: ownerId,
      images: {
        main: 'https://picsum.photos/seed/' + i + '/500/300',
        additional: [
          'https://picsum.photos/seed/' + (i + 100) + '/500/300',
          'https://picsum.photos/seed/' + (i + 200) + '/500/300'
        ]
      },
      transaction_history: [
        {
          date: new Date(Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000)).toISOString(),
          price: Math.floor(Math.random() * 5000000) + 500000,
          type: 'Purchase'
        },
        {
          date: new Date(Date.now() - Math.floor(Math.random() * 10 * 365 * 24 * 60 * 60 * 1000)).toISOString(),
          price: Math.floor(Math.random() * 4000000) + 500000,
          type: 'Purchase'
        }
      ]
    };
  });
};

// Mock data for owners
export const generateMockOwners = (count: number): Owner[] => {
  const wealthSources = ['Real Estate', 'Tech', 'Finance', 'Entertainment', 'Retail', 'Manufacturing', 'Inheritance'];
  
  return Array.from({ length: count }).map((_, i) => {
    const netWorth = Math.floor(Math.random() * 900000000) + 100000000; // $100M to $1B
    const sources: Record<string, number> = {};
    
    // Assign 2-4 wealth sources
    const numSources = Math.floor(Math.random() * 3) + 2;
    const selectedSources = [...wealthSources].sort(() => 0.5 - Math.random()).slice(0, numSources);
    
    let remainingPercentage = 100;
    selectedSources.forEach((source, index) => {
      if (index === selectedSources.length - 1) {
        sources[source] = remainingPercentage;
      } else {
        const percentage = Math.floor(Math.random() * (remainingPercentage - (selectedSources.length - index - 1))) + 1;
        sources[source] = percentage;
        remainingPercentage -= percentage;
      }
    });
    
    return {
      id: `owner-${i + 1}`,
      name: `${['John', 'Jane', 'Robert', 'Mary', 'William', 'Sarah', 'Michael', 'Lisa'][Math.floor(Math.random() * 8)]} ${['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson'][Math.floor(Math.random() * 8)]}`,
      net_worth: netWorth,
      confidence: Math.random() * 0.5 + 0.5, // 50% to 100% confidence
      wealth_sources: {
        sources,
        last_updated: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
      }
    };
  });
};

// Mock company data
export const mockCompany: Company = {
  id: '1',
  name: 'Wealth Intelligence Inc.',
  logo_url: 'https://via.placeholder.com/150',
  data_preferences: {
    show_net_worth: true,
    show_wealth_sources: true,
    show_property_values: true,
    show_transaction_history: true
  }
};

// Mock users data
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@wealthmap.com',
    role: 'admin',
    company_id: '1',
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    email: 'employee@wealthmap.com',
    role: 'employee',
    company_id: '1',
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    email: 'john.doe@wealthmap.com',
    role: 'employee',
    company_id: '1',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    email: 'jane.smith@wealthmap.com',
    role: 'employee',
    company_id: '1',
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock logs
export const generateMockLogs = (count: number): Log[] => {
  const actions = [
    'Logged in',
    'Searched properties',
    'Viewed property details',
    'Applied filter',
    'Saved map view',
    'Generated report',
    'Updated company settings',
    'Invited new user',
    'Exported property data'
  ];
  
  return Array.from({ length: count }).map((_, i) => {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const timestamp = new Date(Date.now() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000)).toISOString();
    
    return {
      id: `log-${i + 1}`,
      user_id: randomUser.id,
      action: actions[Math.floor(Math.random() * actions.length)],
      timestamp
    };
  });
};

// Create and link mock data
export const mockOwners = generateMockOwners(20);
export const mockProperties = generateMockProperties(100).map(property => {
  const owner = mockOwners.find(o => o.id === property.owner_id);
  return { ...property, owner };
});
export const mockLogs = generateMockLogs(50);

// Create mock data service functions
export const fetchProperties = async (filters: Record<string, any> = {}): Promise<Property[]> => {
  console.log('Fetching properties with filters:', filters);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProperties = [...mockProperties];
  
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredProperties = filteredProperties.filter(prop => 
      prop.address.toLowerCase().includes(query) || 
      prop.owner?.name.toLowerCase().includes(query)
    );
  }
  
  if (filters.propertyType) {
    filteredProperties = filteredProperties.filter(prop => prop.type === filters.propertyType);
  }
  
  if (filters.propertyValue) {
    const [min, max] = filters.propertyValue;
    filteredProperties = filteredProperties.filter(prop => 
      prop.value && prop.value >= min && prop.value <= max
    );
  }
  
  if (filters.propertySize) {
    const [min, max] = filters.propertySize;
    filteredProperties = filteredProperties.filter(prop => 
      prop.size && prop.size >= min && prop.size <= max
    );
  }
  
  if (filters.ownerNetWorth) {
    const [min, max] = filters.ownerNetWorth;
    filteredProperties = filteredProperties.filter(prop => 
      prop.owner?.net_worth && prop.owner.net_worth >= min && prop.owner.net_worth <= max
    );
  }
  
  return filteredProperties;
};

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const property = mockProperties.find(p => p.id === id);
  return property || null;
};

export const fetchOwners = async (): Promise<Owner[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return mockOwners;
};

export const fetchCompany = async (id: string): Promise<Company | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockCompany;
};

export const fetchCompanyUsers = async (companyId: string): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockUsers.filter(user => user.company_id === companyId);
};

export const fetchLogs = async (limit: number = 50): Promise<Log[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return mockLogs.slice(0, limit).sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const updateCompany = async (id: string, updates: Partial<Company>): Promise<Company> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would update the database
  console.log('Updating company:', id, updates);
  
  return { ...mockCompany, ...updates };
};

export const inviteUser = async (email: string, role: 'admin' | 'employee'): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // In a real app, this would send an invitation and create a user record
  console.log('Inviting user:', email, role);
  
  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    role,
    company_id: '1',
    created_at: new Date().toISOString()
  };
  
  return newUser;
};
