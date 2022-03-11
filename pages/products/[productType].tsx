import {Avatar, Button, Icon, IconButton, Paper, Tooltip} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useContext, useEffect, useState} from 'react';
import {EnumLabel, ProductOptionsProps, productTypeOptions, unitOfMeasureOptions} from '../../constants/enum-label';
import GlobalContext from '../../store/global-context';
import DialogContext from '../../store/dialog-context';
import {ProductDTO} from '../../types/dto/ProductDTO';
import {ProductForm} from '../../components/forms/product-form';
import {
  createProduct,
  deleteProduct,
  getAllProductByProductTypeAndUserId,
  updateProduct
} from '../../utils/api/product-api';
import {addArrayElement, deleteArrayElement, modifyArrayElement} from '../../utils/common-functions';
import {GRID_HUN_LOCALE_TEXT} from '../../constants/grid-locale';
import {useRouter} from 'next/router';
import {ProductType} from '../../types/enum/ProductType';
import Head from 'next/head';
import Link from 'next/link';

export default function ProductTypePage() {
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
      field: 'calorie', headerName: 'Kalória', flex: 1,
      valueGetter: params =>
        `${params.row.calorie} kcal${unitOfMeasureOptions.find(value => value.value === params.row.unitOfMeasure)?.label}`
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
  const dialogContext = useContext(DialogContext);
  const router = useRouter();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [productType, setProductType] = useState<ProductOptionsProps>();

  useEffect(() => {
    const type = (typeof router.query.productType === 'object' ? router.query.productType[0] : router.query.productType) as ProductType;
    refreshTable(type);
    setProductType(productTypeOptions.find(value => value.value === type));
  }, []);

  function refreshTable(type: ProductType) {
    getAllProductByProductTypeAndUserId(type, globalContext.loggedInUserId!)
      .then(value => setProducts(value))
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }

  function openDialog(product?: ProductDTO) {
    const isUpdate = Boolean(product);
    dialogContext.openFormDialog({
      title: isUpdate ? 'Étel/ital adatainak módosítása' : 'Új étel/ital hozzáadása',
      formName: 'product-form',
      formComponent: <ProductForm data={product} onFormSubmit={formData => onSubmit(isUpdate, formData)}/>,
    });
  }

  const onSubmit = (isUpdate: boolean, formData: ProductDTO) => {
    if (isUpdate) {
      updateProduct(formData, formData.id)
        .then(response => {
          dialogContext.closeFormDialog();
          modifyArrayElement(response, setProducts);
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    } else {
      createProduct(formData)
        .then(response => {
          dialogContext.closeFormDialog();
          addArrayElement(response, setProducts);
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    }
  };

  function deleteRow(product: ProductDTO) {
    deleteProduct(product.id)
      .then(() => deleteArrayElement(product, setProducts))
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }

  return (
    <>
      <Head>
        <title>Kalóriaszámláló - {productType?.label}</title>
      </Head>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Link href={'/products'} passHref>
          <a>
            <Button startIcon={<Icon>arrow_back</Icon>}>Vissza</Button>
          </a>
        </Link>
        <div style={{display: 'flex', alignItems: 'center', fontSize: 'xx-large', fontWeight: 'bold', marginBottom: 10}}>
          <Avatar src={productType?.imageSrc} sx={{width: 60, height: 60, mr: 1}}/>
          <div className="gradient-text" style={{backgroundImage: productType?.gradient}}>
            {productType?.label}
          </div>
        </div>
        <Button startIcon={<Icon>add</Icon>} onClick={() => openDialog()}>
          Új étel/ital felvétele
        </Button>
      </div>
      <Paper elevation={5} sx={{marginTop: '10px', backgroundColor: 'transparent'}}>
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
    </>
  );
}
