/**
 * Example: How to use the API hooks
 * 
 * This demonstrates:
 * - Fetching data with Zod validation
 * - Mutations with automatic cache invalidation
 * - Loading/Error states
 */

import { useUsers, useCreateUser, useDeleteUser, type User } from '../lib/api';

export function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreate = async () => {
    try {
      await createUser.mutateAsync({
        name: 'Neuer User',
        email: 'new@example.com',
        role: 'user',
      });
      // Cache wird automatisch invalidated
    } catch (e) {
      console.error('Failed to create user:', e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser.mutateAsync({ id });
    } catch (e) {
      console.error('Failed to delete user:', e);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      
      <button onClick={handleCreate} disabled={createUser.isPending}>
        {createUser.isPending ? 'Creating...' : 'Add User'}
      </button>
      
      <ul>
        {users?.map((user: User) => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.role}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
