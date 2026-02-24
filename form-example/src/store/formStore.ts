import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

interface FormStore {
  // Dialog state
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  
  // Current editing user
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
  
  // Form submission state
  isSubmitting: boolean;
  setSubmitting: (isSubmitting: boolean) => void;
  
  // Success callback
  onSuccess: (() => void) | null;
  setOnSuccess: (fn: (() => void) | null) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false, editingUser: null, onSuccess: null }),
  
  editingUser: null,
  setEditingUser: (user) => set({ editingUser: user }),
  
  isSubmitting: false,
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  
  onSuccess: null,
  setOnSuccess: (fn) => set({ onSuccess: fn }),
}));
