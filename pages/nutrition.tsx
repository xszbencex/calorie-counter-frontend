import Head from 'next/head';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Button, Icon, IconButton, Paper, Tooltip} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {GRID_HUN_LOCALE_TEXT} from '../constants/grid-locale';
import GlobalContext from '../store/global-context';
import {addArrayElement, deleteArrayElement, modifyArrayElement} from '../utils/common-functions';
import {NutritionDTO} from '../types/dto/NutritionDTO';
import {createNutrition, deleteNutrition, getAllNutritionByUserId, updateNutrition} from '../utils/api/nutrition-api';
import {NutritionForm} from '../components/forms/nutrition-form';
import DialogContext from '../store/dialog-context';
import {unitOfMeasureOptions} from '../constants/enum-label';

export default function NutritionPage() {
  const columns: GridColDef[] = [
    {
      field: 'nutritionDate', headerName: 'Étkezés napja', flex: 1,
      valueGetter: params => new Date(params.row.nutritionDate).toLocaleDateString()
    },
    {
      field: 'carbohydrate', headerName: 'Szénhidrát', flex: 1,
      valueGetter: params => `${params.row.carbohydrate} g`
    },
    {
      field: 'protein', headerName: 'Fehérje', flex: 1,
      valueGetter: params => `${params.row.protein} g`
    },
    {
      field: 'fat', headerName: 'Zsír', flex: 1,
      valueGetter: params => `${params.row.fat} g`
    },
    {
      field: 'calorie', headerName: 'Kalória', flex: 1,
      valueGetter: params => `${params.row.calorie} kcal`
    },
    {
      field: 'product', headerName: 'Étel/Ital', flex: 1,
      valueGetter: params => params.row.product
        // eslint-disable-next-line max-len
        ? `${params.row.quantity} ${unitOfMeasureOptions.find(value => value.value === params.row.product.unitOfMeasure)?.unit} ${params.row.product.name}`
        : 'Egyéb'
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
  const [nutritionList, setNutritionList] = useState<NutritionDTO[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    getAllNutritionByUserId(globalContext.loggedInUserId!)
      .then(value => setNutritionList(value))
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }, []);

  function openDialog(nutrition?: NutritionDTO) {
    const isUpdate = Boolean(nutrition);
    dialogContext.openFormDialog({
      title: isUpdate ? 'Étkezés adatainak módosítása' : 'Új étkezés hozzáadása',
      formName: 'nutrition-form',
      formComponent: <NutritionForm data={nutrition} onFormSubmit={formData => onSubmit(isUpdate, formData)}/>,
    });
  }

  const onSubmit = (isUpdate: boolean, formData: NutritionDTO) => {
    if (isUpdate) {
      updateNutrition(formData, formData.id)
        .then(response => {
          dialogContext.closeFormDialog();
          modifyArrayElement(response, setNutritionList);
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    } else {
      createNutrition(formData)
        .then(response => {
          dialogContext.closeFormDialog();
          addArrayElement(response, setNutritionList);
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    }
  };

  function deleteRow(nutrition: NutritionDTO) {
    deleteNutrition(nutrition.id)
      .then(() => deleteArrayElement(nutrition, setNutritionList))
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }

  return (
    <div>
      <Head>
        <title>Kalóriaszámláló - Étkezés</title>
      </Head>
      <div className="actions">
        <Button startIcon={<Icon>add</Icon>} onClick={() => openDialog()}>
          Új étkezés felvétele
        </Button>
      </div>
      <Paper elevation={5} sx={{marginTop: '10px', backgroundColor: 'transparent'}}>
        <DataGrid
          rows={nutritionList}
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
