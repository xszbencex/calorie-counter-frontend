import {Icon, SpeedDial, SpeedDialAction, SpeedDialIcon} from '@mui/material';
import {IntakeDTO} from '../types/dto/IntakeDTO';
import {NutrientIntakeForm} from './forms/nutrient-intake-form';
import {createIntake, createWaterIntake} from '../utils/api/intake-api';
import {ReactElement, useContext} from 'react';
import DialogContext from '../store/dialog-context';
import GlobalContext from '../store/global-context';
import {ProductDTO} from '../types/dto/ProductDTO';
import {ProductForm} from './forms/product-form';
import {createProduct} from '../utils/api/product-api';
import {WaterIntakeForm} from './forms/water-intake-form';
import {WaterIntakeRequest} from '../types/request/WaterIntakeRequest';
import {WeightChangeDTO} from '../types/dto/WeightChangeDTO';
import {WeightChangeForm} from './forms/weight-change-form';
import {createWeightChange} from '../utils/api/weight-change-api';

type Actions = {
  tooltip: string,
  icon: ReactElement,
  onClick: () => void
}

export function CCSpeedDial() {
  const speedDialActions: Actions[] = [
    {tooltip: 'Termék felvétele', icon: <Icon>add_shopping_cart</Icon>, onClick: openProductDialog},
    {tooltip: 'Étekezés hozzáadása', icon: <Icon>local_dining</Icon>, onClick: openNutrientIntakeDialog},
    {tooltip: 'Ivás hozzáadása', icon: <Icon>bloodtype</Icon>, onClick: openWaterIntakeDialog},
    {tooltip: 'Súlyváltozás naplózása', icon: <Icon>fitness_center</Icon>, onClick: openWeightChangeDialog},
  ];

  const globalContext = useContext(GlobalContext);
  const dialogContext = useContext(DialogContext);

  function openNutrientIntakeDialog() {
    dialogContext.openFormDialog({
      title: 'Étkezés hozzáadása',
      formName: 'nutrient-intake-form',
      formComponent: <NutrientIntakeForm onFormSubmit={formData => onNutrientIntakeSubmit(formData)}/>,
      dialogProps: {maxWidth: 'sm'}
    });
  }

  const onNutrientIntakeSubmit = (formData: IntakeDTO) => {
      createIntake(formData)
        .then(() => {
          dialogContext.closeFormDialog();
          globalContext.refreshDailyProgress();
        })
        .catch(error => dialogContext.showRestCallErrorDialog(error));
  };

  function openProductDialog() {
    dialogContext.openFormDialog({
      title: 'Új étel/ital hozzáadása',
      formName: 'product-form',
      formComponent: <ProductForm onFormSubmit={formData => onProductSubmit(formData)}/>,
    });
  }

  const onProductSubmit = (formData: ProductDTO) => {
    createProduct(formData)
      .then(() => dialogContext.closeFormDialog())
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  };

  function openWaterIntakeDialog() {
    dialogContext.openFormDialog({
      title: 'Víz fogyasztás felvétele',
      formName: 'water-intake-form',
      formComponent: <WaterIntakeForm onFormSubmit={formData => onWaterIntakeSubmit(formData)}/>,
      dialogProps: {maxWidth: 'xs'}
    });
  }

  const onWaterIntakeSubmit = (formData: WaterIntakeRequest) => {
    createWaterIntake(formData)
      .then(() => {
        dialogContext.closeFormDialog();
        globalContext.refreshDailyProgress();
      })
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  };

  function openWeightChangeDialog() {
    dialogContext.openFormDialog({
      title: 'Súlyváltozás naplózása',
      formName: 'weight-change-form',
      formComponent: <WeightChangeForm onFormSubmit={formData => onWeightChangeSubmit(formData)}/>,
      dialogProps: {maxWidth: 'xs'}
    });
  }

  const onWeightChangeSubmit = (formData: WeightChangeDTO) => {
    createWeightChange(formData)
      .then(() => dialogContext.closeFormDialog())
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  };

  return (
    <SpeedDial
      ariaLabel="Gyors elérésű gombok"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {speedDialActions.map((action, index) => (
        <SpeedDialAction
          key={index}
          icon={action.icon}
          tooltipTitle={action.tooltip}
          onClick={() => action.onClick()}
        />
      ))}
    </SpeedDial>
  );
}
