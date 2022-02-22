import {useEffect, useState} from 'react';
import {LabelKeyObject} from 'react-csv/components/CommonPropTypes';
import {CSVLink} from 'react-csv';
import {Button, Icon} from '@mui/material';
import * as React from 'react';
import {CCTableColumn} from '../types/CCTableTypes';

export function CCTableExport(props: {rows: any[], columns: CCTableColumn<any>[]}) {
  const {rows, columns} = props;
  const [csvHeaders, setCsvHeaders] = useState<LabelKeyObject[]>([]);
  const [csvData, setCsvData] = useState<any[]>([]);

  useEffect(() => {
    let data = [...rows];
    const headers = columns.filter(column => !column.renderCell)
      .map(column => {
        if (column.valueGetter) {
          data = data.map(current => {
            // @ts-ignore
            return {...current, [column.field]: column.valueGetter(current)};
          });
        }
        return {label: column.headerName, key: column.field};
      });
    setCsvData(data);
    setCsvHeaders(headers);
  }, [rows, columns]);

  return (
    <CSVLink
      data={csvData}
      headers={csvHeaders}
      separator=";"
      style={{color: 'white', textDecoration: 'none'}}>
      <Button startIcon={<Icon>download</Icon>}>
        Export
      </Button>
    </CSVLink>
  );
}
