import { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from '@tanstack/react-form';
import { useUserStore } from '../store/userStore';
import { userSchema, UserFormValues } from '../schemas/userSchema';

export function UserDialog() {
  const { isDialogOpen, closeDialog, editingUser, updateUser } = useUserStore();

  const form = useForm({
    defaultValues: {
      name: editingUser?.name ?? '',
      email: editingUser?.email ?? '',
      role: editingUser?.role ?? 'user',
      status: editingUser?.status ?? 'active',
      department: editingUser?.department ?? '',
    },
    validators: {
      onChange: userSchema,
    },
  });

  useEffect(() => {
    if (editingUser) {
      form.setFieldValue('name', editingUser.name);
      form.setFieldValue('email', editingUser.email);
      form.setFieldValue('role', editingUser.role);
      form.setFieldValue('status', editingUser.status);
      form.setFieldValue('department', editingUser.department);
    }
  }, [editingUser, isDialogOpen]);

  const onSubmit = (values: UserFormValues) => {
    if (editingUser) {
      updateUser(editingUser.id, values);
    }
    closeDialog();
  };

  const isEdit = !!editingUser;

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg">
          
          <Dialog.Title className="text-xl font-semibold text-gray-900">
            {isEdit ? 'Edit User' : 'Create User'}
          </Dialog.Title>
          
          <Dialog.Description className="text-sm text-gray-500">
            {isEdit ? 'Make changes to the user profile.' : 'Add a new user to the system.'}
          </Dialog.Description>

          <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(onSubmit)(e); }} className="space-y-4">
            
            {/* Name Field */}
            <form.Field
              name="name"
              children={(field) => (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            />

            {/* Email Field */}
            <form.Field
              name="email"
              children={(field) => (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            />

            {/* Role & Status Row */}
            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="role"
                children={(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value as 'admin' | 'user' | 'guest')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="guest">Guest</option>
                    </select>
                    {field.state.meta.errors && (
                      <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                    )}
                  </div>
                )}
              />

              <form.Field
                name="status"
                children={(field) => (
                  <div className="space-y-2">
                    <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value as 'active' | 'inactive' | 'pending')}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                    {field.state.meta.errors && (
                      <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Department Field */}
            <form.Field
              name="department"
              children={(field) => (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                    <option value="Operations">Operations</option>
                  </select>
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeDialog}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {isEdit ? 'Save changes' : 'Create user'}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
