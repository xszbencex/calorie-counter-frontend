import * as React from 'react';
import {ReactNode, useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import {Collapse, Icon, Paper} from '@mui/material';
import {CCSimpleTableProps} from '../types/CCTableTypes';

function CCTableRow(props: { row: any, columns: any[], renderCollapsible?: (row: any) => ReactNode }) {
  const {row, columns, renderCollapsible} = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{'> *': {
        borderBottom: renderCollapsible ? 'unset' : 'initial'
        },
        cursor: renderCollapsible ? 'pointer' : 'default', '&:hover': {backgroundColor: renderCollapsible ? '#f8f8f8' : 'white'}}
      } onClick={() => setOpen(!open)}
      >
        {renderCollapsible && (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <Icon>keyboard_arrow_up</Icon> : <Icon>keyboard_arrow_down</Icon>}
            </IconButton>
          </TableCell>
        )}
        {columns.map(column => {
          return (
            <TableCell key={column.field.toString()}>
              {column.valueGetter ? column.valueGetter(row) :
                column.renderCell ? column.renderCell(row) :
                  column.field in row ? row[column.field] :
                    column.field.includes('.') ? row[column.field.split('.')[0]][column.field.split('.')[1]] :
                      'hiba'}
            </TableCell>
          );
        })}
      </TableRow>
      {renderCollapsible && (
        <TableRow>
          <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns.length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{margin: 1}}>
                {open && renderCollapsible(row)}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default function CCSimpleTable<T>(props: CCSimpleTableProps<T>) {
  const {columns, rows, renderCollapsible} = props;

  return (
    <Paper elevation={4}>
      <TableContainer>
        <Table sx={{minWidth: 750}}>
          <TableHead>
            <TableRow sx={{whiteSpace: 'nowrap'}}>
              {renderCollapsible && <TableCell/>}
              {columns.map(column => (
                <TableCell key={column.field}>
                  <span style={{fontWeight: 'bold', padding: '8px 0'}}>
                    {column.headerName}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? rows.map((row: any) =>
              <CCTableRow key={row.id} row={row} columns={columns} renderCollapsible={renderCollapsible}/>
            ) : (
              <TableRow>
                <TableCell sx={{padding: '40px 16px', textAlign: 'center'}} colSpan={columns.length + (renderCollapsible ? 1 : 0)}>
                  Nincs találat
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
