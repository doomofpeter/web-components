import { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { User } from './types';
import { mockUsers } from './data';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function StatusCellRenderer(props: ICellRendererParams<User, string>) {
  const value = props.value;
  const colors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
      {value?.charAt(0).toUpperCase() + value?.slice(1)}
    </span>
  );
}

function RoleCellRenderer(props: ICellRendererParams<User, string>) {
  const value = props.value;
  const colors = {
    admin: 'bg-purple-100 text-purple-800',
    user: 'bg-blue-100 text-blue-800',
    guest: 'bg-gray-100 text-gray-600',
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[value as keyof typeof colors]}`}>
      {value?.charAt(0).toUpperCase() + value?.slice(1)}
    </span>
  );
}

function DateCellRenderer(props: ICellRendererParams<User, string>) {
  const value = props.value;
  if (!value) return null;
  
  const date = new Date(value);
  return (
    <span className="text-gray-600">
      {date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
    </span>
  );
}

function ActionsCellRenderer(props: ICellRendererParams<User>) {
  const handleEdit = () => {
    props.data && console.log('Edit:', props.data.id);
  };
  
  const handleDelete = () => {
    props.data && console.log('Delete:', props.data.id);
  };
  
  return (
    <div className="flex gap-2">
      <button
        onClick={handleEdit}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        Delete
      </button>
    </div>
  );
}

export function UserGrid() {
  const [rowData] = useState<User[]>(mockUsers);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  const columnDefs = useMemo<ColDef[]>(() => [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      pinned: 'left',
      sortable: false,
      filter: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      sortable: true,
      filter: true,
      cellRenderer: RoleCellRenderer,
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      filter: true,
      cellRenderer: StatusCellRenderer,
      width: 120,
    },
    {
      field: 'department',
      headerName: 'Department',
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      sortable: true,
      filter: true,
      cellRenderer: DateCellRenderer,
      width: 130,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filter: false,
      cellRenderer: ActionsCellRenderer,
      pinned: 'right',
      width: 150,
    },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true,
  }), []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selected = gridRef.current?.api.getSelectedRows() || [];
    setSelectedRows(selected);
  }, []);

  const gridRef = { current: null as { api: { exportDataAsCsv: () => void; getSelectedRows: () => User[] } } | null };

  const handleExport = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv();
  }, []);

  const handleDeleteSelected = useCallback(() => {
    console.log('Delete selected:', selectedRows.map(r => r.id));
  }, [selectedRows]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 text-sm mt-1">
            {rowData.length} users · {selectedRows.length} selected
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Export CSV
          </button>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="ag-theme-alpine rounded-lg border border-gray-200 overflow-hidden">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 10, 25, 50]}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          animateRows={true}
        />
      </div>
    </div>
  );
}
