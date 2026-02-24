import { UserTable } from './components/UserTable';
import { EditUserDialog } from './components/EditUserDialog';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Users</h1>
        <UserTable />
      </div>
      
      {/* Dialog Portal */}
      <EditUserDialog />
    </div>
  );
}

export default App;
