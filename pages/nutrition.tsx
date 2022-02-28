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

export default function NutritionPage() {
  const columns: GridColDef[] = [
    {
      field: 'nutritionDate', headerName: 'Étkezés időpontja', flex: 1,
      valueGetter: params => new Date(params.row.nutritionDate).toLocaleString()
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
      field: 'kcal', headerName: 'Kalória', flex: 1,
      valueGetter: params => `${params.row.kcal} kcal`
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
  const [nutritionList, setNutritionList] = useState<NutritionDTO[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    getAllNutritionByUserId(globalContext.loggedInUserId!)
      .then(value => setNutritionList(value))
      .catch(error => globalContext.showRestCallErrorDialog(error));
  }, []);

  function openDialog(nutrition?: NutritionDTO) {
    const isUpdate = Boolean(nutrition);
    globalContext.openFormDialog({
      title: isUpdate ? 'Étkezés adatainak módosítása' : 'Új étkezés hozzáadása',
      formName: 'nutrition-form',
      formComponent: <NutritionForm data={nutrition} onFormSubmit={formData => onSubmit(isUpdate, formData)}/>,
    });
  }

  const onSubmit = (isUpdate: boolean, formData: NutritionDTO) => {
    if (isUpdate) {
      updateNutrition(formData, formData.id)
        .then(response => {
          globalContext.closeFormDialog();
          modifyArrayElement(response, setNutritionList);
        })
        .catch(error => globalContext.showRestCallErrorDialog(error));
    } else {
      createNutrition(formData)
        .then(response => {
          globalContext.closeFormDialog();
          addArrayElement(response, setNutritionList);
        })
        .catch(error => globalContext.showRestCallErrorDialog(error));
    }
  };

  function deleteRow(nutrition: NutritionDTO) {
    deleteNutrition(nutrition.id)
      .then(() => deleteArrayElement(nutrition, setNutritionList))
      .catch(error => globalContext.showRestCallErrorDialog(error));
  }

  return (
    <div>
      <Head>
        <title>MAG Praktikum - Étkezés</title>
      </Head>
      <div className="actions">
        <Button startIcon={<Icon>add</Icon>} onClick={() => openDialog()}>
          Új étkezés felvétele
        </Button>
      </div>
      <Paper elevation={5} sx={{marginTop: '10px'}}>
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
