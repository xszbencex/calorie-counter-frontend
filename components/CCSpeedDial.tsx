import {Icon, SpeedDial, SpeedDialAction, SpeedDialIcon} from '@mui/material';
import {NutritionDTO} from '../types/dto/NutritionDTO';
import {NutritionForm} from './forms/nutrition-form';
import {createNutrition} from '../utils/api/nutrition-api';
import {ReactElement, useContext} from 'react';
import DialogContext from '../store/dialog-context';
import GlobalContext from '../store/global-context';
import {ProductDTO} from '../types/dto/ProductDTO';
import {ProductForm} from './forms/product-form';
import {createProduct} from '../utils/api/product-api';

type Actions = {
  tooltip: string,
  icon: ReactElement,
  onClick: () => void
}

export function CCSpeedDial() {
  const speedDialActions: Actions[] = [
    {tooltip: 'Termék felvétele', icon: <Icon>add_shopping_cart</Icon>, onClick: openProductDialog},
    {tooltip: 'Étekezés hozzáadása', icon: <Icon>local_dining</Icon>, onClick: openNutritionDialog}
  ];

  const globalContext = useContext(GlobalContext);
  const dialogContext = useContext(DialogContext);

  function openNutritionDialog() {
    dialogContext.openFormDialog({
      title: 'Új étkezés hozzáadása',
      formName: 'nutrition-form',
      formComponent: <NutritionForm onFormSubmit={formData => onNutritionSubmit(formData)}/>,
    });
  }

  const onNutritionSubmit = (formData: NutritionDTO) => {
      createNutrition(formData)
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
