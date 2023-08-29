import 'react-data-grid/lib/styles.css';

import DataGrid from 'react-data-grid';
import createRowData from './data';
import { useMemo, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

const rows = createRowData(10);

function App() {
  const [columns, setColumns] = useState([
    { key: 'id', name: 'ID', frozen: false },
    { key: 'title', name: 'Title', frozen: false },
    { key: 'firstName', name: 'First name', frozen: false },
    { key: 'lastName', name: 'Last name', frozen: false },
    { key: 'email', name: 'Email', frozen: false },
    { key: 'date', name: 'DOB', frozen: false },
    { key: 'phone', name: 'Phone', frozen: false },
    { key: 'jobTitle', name: 'Job Title', frozen: false },
  ]);

  const [contextMenuAnchorEl, setContextMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [contextMenuProps, setContextMenuProps] = useState<null | { key: string }>(null);
  const isContextMenuOpen = useMemo(() => Boolean(contextMenuAnchorEl) && Boolean(contextMenuProps), [contextMenuAnchorEl, contextMenuProps]);

  const handleCloseContextMenu = () => {
    setContextMenuAnchorEl(null);
    setContextMenuProps(null);
  }

  const handleToggleFreezeColumn = () => {
    if (contextMenuProps) {
      const newColumns = columns.map((column) => ({
        ...column,
        frozen: column.key === contextMenuProps.key ? !column.frozen : column.frozen
      }))
      setColumns(newColumns)
    }
    handleCloseContextMenu()
  }

  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
        onCellContextMenu={(args, event) => {
          console.log(args, event);
          event.preventGridDefault();
          event.preventDefault();
          setContextMenuAnchorEl(event.currentTarget);
          setContextMenuProps({
            key: args.column.key
          })
        }}
      />
      <Menu
        anchorEl={contextMenuAnchorEl}
        open={isContextMenuOpen}
        onClose={handleCloseContextMenu}
        onContextMenu={handleCloseContextMenu}
      >
        <MenuItem onClick={handleToggleFreezeColumn}>
          {columns.find((column) => column.key === contextMenuProps?.key)?.frozen ? 'Unfreeze column' : 'Freeze column'}
        </MenuItem>
      </Menu>
    </>
  );
}

export default App;
