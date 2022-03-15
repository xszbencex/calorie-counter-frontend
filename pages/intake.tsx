import Head from 'next/head';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Button, Icon, IconButton, Paper, Tooltip} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {GRID_HUN_LOCALE_TEXT} from '../constants/grid-locale';
import GlobalContext from '../store/global-context';
import {addArrayElement, deleteArrayElement, modifyArrayElement} from '../utils/common-functions';
import {IntakeDTO} from '../types/dto/IntakeDTO';
import {createIntake, createWaterIntake, deleteIntake, getAllIntakeByUserId, updateIntake} from '../utils/api/intake-api';
import {NutrientIntakeForm} from '../components/forms/nutrient-intake-form';
import DialogContext from '../store/dialog-context';
import {unitOfMeasureOptions} from '../constants/enum-label';
import {ProductType} from '../types/enum/ProductType';
import {WaterIntakeForm} from '../components/forms/water-intake-form';
import {localeStringFormatter} from '../constants/common-values';

export default function IntakePage() {
  const nutrientIntakeColumns: GridColDef[] = [
    {
      field: 'intakeDate', headerName: 'Étkezés ideje', flex: 1,
      valueGetter: params => new Date(params.row.intakeDate).toLocaleString([], localeStringFormatter)
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
        ? `${params.row.quantity} ${unitOfMeasureOptions.find(value => value.value === params.row.product.unitOfMeasure)?.unit} ` +
        params.row.product.name
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
              <IconButton color="primary" onClick={() => openNutrientIntakeDialog(params.row)}>
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ];

  const waterIntakeColumns: GridColDef[] = [
    {
      field: 'intakeDate', headerName: 'Ivás ideje', flex: 1,
      valueGetter: params => new Date(params.row.intakeDate).toLocaleString([], localeStringFormatter)
    },
    {
      field: 'quantity', headerName: 'Mennyiség', flex: 1,
      valueGetter: params =>
        `${params.row.quantity} ${unitOfMeasureOptions.find(value => value.value === params.row.product.unitOfMeasure)?.unit}`
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
              <IconButton color="primary" onClick={() => openWaterIntakeDialog(params.row)}>
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
  const [nutrientIntakes, setNutrientIntakes] = useState<IntakeDTO[]>([]);
  const [waterIntakes, setWaterIntakes] = useState<IntakeDTO[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    getAllIntakeByUserId(globalContext.loggedInUserId!)
      .then(response => {
        const [nutrient, water] = response.reduce((previousValue, currentValue) => {
          previousValue[currentValue.product?.productType === ProductType.WATER ? 1 : 0].push(currentValue);
          return previousValue;
        }, [[] as IntakeDTO[], [] as IntakeDTO[]]);
        setNutrientIntakes(nutrient);
        setWaterIntakes(water);
      })
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }, []);

  function openNutrientIntakeDialog(intake?: IntakeDTO) {
    const isUpdate = Boolean(intake);
    dialogContext.openFormDialog({
      title: isUpdate ? 'Étkezés adatainak módosítása' : 'Új étkezés hozzáadása',
      formName: 'nutrient-intake-form',
      formComponent: <NutrientIntakeForm data={intake} onFormSubmit={formData => onNutrientIntakeSubmit(isUpdate, formData)}/>,
      dialogProps: {maxWidth: 'sm'}
    });
  }

  const onNutrientIntakeSubmit = (isUpdate: boolean, formData: IntakeDTO) => {
    if (isUpdate) {
      updateIntake(formData, formData.id)
        .then(response => {
          dialogContext.closeFormDialog();
          modifyArrayElement(response, setNutrientIntakes);
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    } else {
      createIntake(formData)
        .then(response => {
          dialogContext.closeFormDialog();
          addArrayElement(response, setNutrientIntakes);
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    }
  };

  function openWaterIntakeDialog(intake?: IntakeDTO) {
    const isUpdate = Boolean(intake);
    dialogContext.openFormDialog({
      title: isUpdate ? 'Ivás adatainak módosítása' : 'Új ivás hozzáadása',
      formName: 'water-intake-form',
      formComponent: <WaterIntakeForm data={intake} onFormSubmit={formData => onWaterIntakeSubmit(isUpdate, formData)}/>,
      dialogProps: {maxWidth: 'xs'}
    });
  }

  const onWaterIntakeSubmit = (isUpdate: boolean, formData: IntakeDTO) => {
    if (isUpdate) {
      updateIntake(formData, formData.id)
        .then(response => {
          dialogContext.closeFormDialog();
          modifyArrayElement(response, setWaterIntakes);
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    } else {
      createWaterIntake(formData)
        .then(response => {
          dialogContext.closeFormDialog();
          addArrayElement(response, setWaterIntakes);
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    }
  };

  function deleteRow(intake: IntakeDTO) {
    deleteIntake(intake.id)
      .then(() => deleteArrayElement(intake, setNutrientIntakes))
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }

  return (
    <div>
      <Head>
        <title>Kalóriaszámláló - Étkezés</title>
      </Head>
      <div className="actions">
        <Button startIcon={<Icon>add</Icon>} onClick={() => openNutrientIntakeDialog()}>
          Új étkezés felvétele
        </Button>
      </div>
      <Paper elevation={5} sx={{marginTop: '10px', backgroundColor: 'transparent'}}>
        <DataGrid
          rows={nutrientIntakes}
          columns={nutrientIntakeColumns}
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

      <div className="actions" style={{marginTop: 20}}>
        <Button startIcon={<Icon>add</Icon>} onClick={() => openWaterIntakeDialog()}>
          Új Ivás felvétele
        </Button>
      </div>
      <Paper elevation={5} sx={{marginTop: '10px', backgroundColor: 'transparent'}}>
        <DataGrid
          rows={waterIntakes}
          columns={waterIntakeColumns}
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
