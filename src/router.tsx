/**
 * TanStack Router Setup
 */

import { 
  createRouter, 
  createRootRoute, 
  createRoute, 
  Outlet, 
  Link 
} from '@tanstack/react-router';
import React from 'react';
import { QueryProvider } from './providers';
import { useUsers, useUser, useUpdateUser, useDeleteUser } from './lib/api';
import type { User } from './lib/api';

// ============== ROOT ROUTE ==============

const rootRoute = createRootRoute({
  component: () => (
    <QueryProvider>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-3 flex gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
              activeProps={{ className: 'text-blue-600' }}
            >
              Home
            </Link>
            <Link
              to="/users"
              className="text-gray-700 hover:text-blue-600 font-medium"
              activeProps={{ className: 'text-blue-600' }}
            >
              Users
            </Link>
          </div>
        </nav>
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
    </QueryProvider>
  ),
});

// ============== INDEX ROUTE ==============

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function IndexComponent() {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Willkommen! 👋</h1>
        <p className="text-gray-Stack Start App mit600">
          Tan Negotiate Auth
        </p>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="font-semibold text-blue-900">Schnellstart</h2>
          <ul className="mt-2 text-sm text-blue-800 space-y-1">
            <li>→ Gehe zu <code className="bg-blue-100 px-1 rounded">/users</code> für User-Beispiel</li>
            <li>→ API Base URL in <code className="bg-blue-100 px-1 rounded">.env</code> setzen</li>
          </ul>
        </div>
      </div>
    );
  },
});

// ============== USERS ROUTE ==============

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: function UsersComponent() {
    const { data: users, isLoading, error } = useUsers();
    const deleteUser = useDeleteUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users?.map((user: User) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'user' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <Link
                      to="/users/$id"
                      params={{ id: user.id }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser.mutate({ id: user.id })}
                      disabled={deleteUser.isPending}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
});

// ============== USER ID ROUTE ==============

const userIdRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: '$id',
  component: function UserDetailComponent() {
    const { id } = userIdRoute.useParams();
    const { data: user, isLoading, error } = useUser(id);
    const updateUser = useUpdateUser();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
      if (user) {
        setName(user.name);
        setEmail(user.email);
      }
    }, [user]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>User not found</div>;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await updateUser.mutateAsync({ id, name, email });
        alert('User updated!');
      } catch {
        alert('Failed to update user');
      }
    };

    return (
      <div className="max-w-md">
        <h1 className="text-2xl font-bold mb-6">Edit User</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={updateUser.isPending}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
          >
            {updateUser.isPending ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    );
  },
});

// ============== ROUTE TREE ==============

const routeTree = rootRoute.addChildren([
  indexRoute,
  usersRoute.addChildren([userIdRoute]),
]);

// ============== CREATE ROUTER ==============

import { queryClient } from './lib/query-client';

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
});

// Add queryClient to route context
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
