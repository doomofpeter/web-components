import { create } from 'zustand';

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

interface UserStore {
  // Users state
  users: User[];
  setUsers: (users: User[]) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUsers: (ids: string[]) => void;
  
  // Dialog state
  isDialogOpen: boolean;
  openDialog: (user?: User) => void;
  closeDialog: () => void;
  
  // Current editing user
  editingUser: User | null;
  
  // Selection
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
  
  // Loading state
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  updateUser: (id, data) => set((state) => ({
    users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
  })),
  deleteUsers: (ids) => set((state) => ({
    users: state.users.filter((u) => !ids.includes(u.id)),
    selectedIds: [],
  })),
  
  isDialogOpen: false,
  openDialog: (user) => set({ isDialogOpen: true, editingUser: user || null }),
  closeDialog: () => set({ isDialogOpen: false, editingUser: null }),
  
  editingUser: null,
  
  selectedIds: [],
  setSelectedIds: (ids) => set({ selectedIds: ids }),
  
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
