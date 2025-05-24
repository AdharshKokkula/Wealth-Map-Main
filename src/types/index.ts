
export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  company_id: string;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  logo_url?: string;
  data_preferences?: Record<string, any>;
}

export interface Owner {
  id: string;
  name: string;
  net_worth?: number;
  confidence?: number;
  wealth_sources?: Record<string, any>;
}

export interface Property {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  value?: number;
  size?: number;
  type?: string;
  owner_id: string;
  owner?: Owner;
  images?: Record<string, any>;
  transaction_history?: Record<string, any>[];
}

export interface SavedView {
  id: string;
  user_id: string;
  view_data: Record<string, any>;
}

export interface Filter {
  id: string;
  user_id: string;
  filter_data: Record<string, any>;
}

export interface Report {
  id: string;
  user_id: string;
  report_data: Record<string, any>;
  created_at: string;
}

export interface Log {
  id: string;
  user_id: string;
  action: string;
  timestamp: string;
}

export interface MapViewState {
  center: [number, number];
  zoom: number;
  bounds?: [[number, number], [number, number]];
}

export interface FilterState {
  propertyValue?: [number, number];
  propertySize?: [number, number];
  propertyType?: string;
  ownerNetWorth?: [number, number];
  searchQuery?: string;
}
