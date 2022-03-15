import {GridLocaleText} from '@mui/x-data-grid';

// @ts-ignore
export const GRID_HUN_LOCALE_TEXT: GridLocaleText = {
  // Root
  noRowsLabel: 'Nincsenek adatok',
  noResultsOverlayLabel: 'Nincs találat.',
  errorOverlayDefaultLabel: 'Egy hiba lépett fel.',

  // Density selector toolbar button text
  toolbarDensity: 'Density',
  toolbarDensityLabel: 'Density',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Comfortable',

  // Columns selector toolbar button text
  toolbarColumns: 'Oszlopok',
  toolbarColumnsLabel: 'Oszlopok kiválasztása',

  // Filters toolbar button text
  toolbarFilters: 'Szűrők',
  toolbarFiltersLabel: 'Szűrők mutatása',
  toolbarFiltersTooltipHide: 'Szűrök elrejtése',
  toolbarFiltersTooltipShow: 'Szűrők mutatása',
  toolbarFiltersTooltipActive: (count) => `${count} aktív szűrő`,

  // Export selector toolbar button text
  toolbarExport: 'Export',
  toolbarExportLabel: 'Export',
  toolbarExportCSV: 'Letöltés CSV-ként',
  toolbarExportPrint: 'Nyomtatás',

  // Columns panel text
  columnsPanelTextFieldLabel: 'Oszlop keresése',
  columnsPanelTextFieldPlaceholder: 'Oszlop cím',
  columnsPanelDragIconLabel: 'Oszlop újrarendezése',
  columnsPanelShowAllButton: 'Összes mutatása',
  columnsPanelHideAllButton: 'Összes elrejtése',

  // Filter panel text
  filterPanelAddFilter: 'Szűrő hozzáadása',
  filterPanelDeleteIconLabel: 'Törlés',
  filterPanelOperators: 'Operátorok',
  filterPanelOperatorAnd: 'És',
  filterPanelOperatorOr: 'Vagy',
  filterPanelColumns: 'Oszlopok',
  filterPanelInputLabel: 'Érték',
  filterPanelInputPlaceholder: 'Szűrő érték',

  // Filter operators text
  filterOperatorContains: 'tartalmaz',
  filterOperatorEquals: 'egyenlő',
  filterOperatorStartsWith: 'ezzel kezdődik',
  filterOperatorEndsWith: 'ezzel végződik',
  filterOperatorIs: 'is',
  filterOperatorNot: 'is not',
  filterOperatorAfter: 'is after',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'is before',
  filterOperatorOnOrBefore: 'is on or before',
  filterOperatorIsEmpty: 'üres',
  filterOperatorIsNotEmpty: 'nem üres',

  // Filter values text
  filterValueAny: 'bármi',
  filterValueTrue: 'igaz',
  filterValueFalse: 'hamis',

  // Column menu text
  columnMenuLabel: 'Menü',
  columnMenuShowColumns: 'Oszlopok megjelenítése',
  columnMenuFilter: 'Szűrés',
  columnMenuHideColumn: 'Elrejt',
  columnMenuUnsort: 'Rendezés törlése',
  columnMenuSortAsc: 'Növekvő sorrend',
  columnMenuSortDesc: 'Csökkenő sorrend',

  // Column header text
  columnHeaderFiltersTooltipActive: (count) => `${count} aktív szűrő`,
  columnHeaderFiltersLabel: 'Szűrők mutatása',
  columnHeaderSortIconLabel: 'Rendezés',

  // Rows selected footer text
  footerRowSelected: (count) => `${count} kiválasztott sor`,

  // Total rows footer text
  footerTotalRows: 'Sorok száma:',

  // Total visible rows footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount} a ${totalCount}-ből/ből`,

  // Checkbox selection text
  checkboxSelectionHeaderName: 'Checkbox kiválasztás',

  // Boolean cell text
  booleanCellTrueLabel: 'igaz',
  booleanCellFalseLabel: 'hamis',

  // Actions cell more text
  actionsCellMore: 'több',

  // Tree Data
  // @ts-ignore
  treeDataGroupingHeaderName: '',
  treeDataExpand: 'see children',
  treeDataCollapse: 'hide children',

  // Used core components translation keys
  MuiTablePagination: {},
};
