import Head from 'next/head';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Button, Icon, IconButton, Paper, Tooltip} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {GRID_HUN_LOCALE_TEXT} from '../constants/grid-locale';
import GlobalContext from '../store/global-context';
import {addArrayElement, deleteArrayElement, modifyArrayElement} from '../utils/common-functions';
import {createProduct, deleteProduct, getAllProductByUserId, updateProduct} from '../utils/api/product-api';
import {ProductDTO} from '../types/dto/ProductDTO';
import {ProductForm} from '../components/forms/product-form';
import {unitOfMeasureOptions} from '../constants/enum-labels';

export default function UsersPage() {
  const columns: GridColDef[] = [
    {field: 'name', headerName: 'Név', flex: 1},
    {
      field: 'carbohydrate', headerName: 'Szénhidrát', flex: 1,
      valueGetter: params =>
        `${params.row.carbohydrate} g${unitOfMeasureOptions.find(value => value.value === params.row.unitOfMeasure)?.label}`
    },
    {
      field: 'protein', headerName: 'Fehérje', flex: 1,
      valueGetter: params =>
        `${params.row.protein} g${unitOfMeasureOptions.find(value => value.value === params.row.unitOfMeasure)?.label}`
    },
    {
      field: 'fat', headerName: 'Zsír', flex: 1,
      valueGetter: params =>
        `${params.row.fat} g${unitOfMeasureOptions.find(value => value.value === params.row.unitOfMeasure)?.label}`
    },
    {
      field: 'kcal', headerName: 'Kalória', flex: 1,
      valueGetter: params =>
        `${params.row.kcal} kcal${unitOfMeasureOptions.find(value => value.value === params.row.unitOfMeasure)?.label}`
    },
    {
      field: 'action', headerName: 'Műveletek',
      sortable: false, filterable: false, disableColumnMenu: true,
      align: 'center', headerAlign: 'center', flex: 0.6,
      renderCell: params => {
        return (
          <>
            <Tooltip title="Törlés">
              <IconButton color="error" onClick={() => deleteRow(params.row)}>
                <Icon>delete</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Módosítás">
              <IconButton color="primary" onClick={() => openDialog(params.row)}>
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ];

  const globalContext = useContext(GlobalContext);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    refreshTable();
  }, []);

  function refreshTable() {
    getAllProductByUserId(globalContext.loggedInUserId!)
      .then(value => setProducts(value))
      .catch(error => globalContext.showRestCallErrorDialog(error));
  }

  function openDialog(product?: ProductDTO) {
    const isUpdate = Boolean(product);
    globalContext.openFormDialog({
      title: isUpdate ? 'Étel/ital adatainak módosítása' : 'Új étel/ital hozzáadása',
      formName: 'product-form',
      formComponent: <ProductForm data={product} onFormSubmit={formData => onSubmit(isUpdate, formData)}/>,
    });
  }

  const onSubmit = (isUpdate: boolean, formData: ProductDTO) => {
    if (isUpdate) {
      updateProduct(formData, formData.id)
        .then(response => {
          globalContext.closeFormDialog();
          modifyArrayElement(response, setProducts);
        })
        .catch(error => globalContext.showRestCallErrorDialog(error));
    } else {
      createProduct(formData)
        .then(response => {
          globalContext.closeFormDialog();
          addArrayElement(response, setProducts);
        })
        .catch(error => globalContext.showRestCallErrorDialog(error));
    }
  };

  function deleteRow(product: ProductDTO) {
    deleteProduct(product.id)
      .then(() => deleteArrayElement(product, setProducts))
      .catch(error => globalContext.showRestCallErrorDialog(error));
  }

  return (
    <div>
      <Head>
        <title>MAG Praktikum - Felhasználók kezelése</title>
      </Head>
      <div className="actions">
        <Button startIcon={<Icon>add</Icon>} onClick={() => openDialog()}>
          Új étel/ital felvétele
        </Button>
      </div>
      <Paper elevation={5} sx={{marginTop: '10px'}}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 50, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          disableColumnSelector
          disableSelectionOnClick
          hideFooterSelectedRowCount
          rowHeight={65}
          autoHeight
          loading={false}
          localeText={GRID_HUN_LOCALE_TEXT}
        />
      </Paper>
    </div>
  );
}
