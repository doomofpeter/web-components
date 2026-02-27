export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive' | 'pending';
  department: string;
  lastLogin: string;
  createdAt: string;
}

export interface ColDef {
  field: keyof User | 'actions';
  headerName: string;
  sortable?: boolean;
  filter?: boolean;
  flex?: number;
  minWidth?: number;
  cellRenderer?: string;
  valueFormatter?: (params: { value: unknown }) => string;
}
