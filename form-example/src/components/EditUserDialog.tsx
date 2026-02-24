import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm, zodResolver } from '@tanstack/react-form';
import { z } from 'zod';
import { useFormStore } from '../store/formStore';
import { EDIT_USER_MUTATION } from '../graphql/queries';

// Zod Schema
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

// GraphQL Mutation Hook (placeholder - use urql/Apollo in real app)
const useEditUser = () => {
  const { setSubmitting, closeDialog, onSuccess } = useFormStore();
  
  return {
    mutate: async (values: UserFormValues) => {
      setSubmitting(true);
      try {
        // await graphqlClient.mutate(EDIT_USER_MUTATION, { input: values })
        console.log('Mutation:', values);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        onSuccess?.();
        closeDialog();
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };
};

export function EditUserDialog() {
  const { isOpen, closeDialog, editingUser, isSubmitting } = useFormStore();
  const editUser = useEditUser();
  
  const form = useForm({
    defaultValues: {
      name: editingUser?.name ?? '',
      email: editingUser?.email ?? '',
      bio: editingUser?.bio ?? '',
    },
    validators: {
      onChange: userSchema,
    },
  });

  // Reset form when dialog opens with new user
  useEffect(() => {
    if (editingUser) {
      form.setFieldValue('name', editingUser.name);
      form.setFieldValue('email', editingUser.email);
      form.setFieldValue('bio', editingUser.bio ?? '');
    }
  }, [editingUser, isOpen]);

  const onSubmit = (values: UserFormValues) => {
    editUser.mutate(values);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeDialog()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          
          <Dialog.Title className="text-xl font-semibold text-gray-900">
            Edit User
          </Dialog.Title>
          
          <Dialog.Description className="text-sm text-gray-500">
            Make changes to the user profile. Click save when you're done.
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="Enter email"
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            />

            {/* Bio Field */}
            <form.Field
              name="bio"
              children={(field) => (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                    placeholder="Tell us about yourself"
                  />
                  {field.state.meta.errors && (
                    <p className="text-xs text-red-500">{field.state.meta.errors[0]}</p>
                  )}
                  <p className="text-xs text-gray-400">{field.state.value?.length ?? 0}/500</p>
                </div>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeDialog}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 focus:outline-none"
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
};
