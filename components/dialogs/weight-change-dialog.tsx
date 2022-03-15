import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, InputAdornment} from '@mui/material';
import {WeightChangeDTO} from '../../types/dto/WeightChangeDTO';
import * as yup from 'yup';
import {getNumberSchema} from '../../constants/common-schema';
import {commonStrings} from '../../constants/common-strings';
import {CCFormText} from '../input-fields/CCText';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect} from 'react';

type WeightChangeDialogProps = {
  weightChange?: WeightChangeDTO,
  onClose: (action: 'update' | 'delete' | 'cancel', weightChange?: WeightChangeDTO) => void
}

const schema = yup.object({
  weight: getNumberSchema(1, 1000).required(commonStrings.required)
});

export function WeightChangeDialog({weightChange, onClose}: WeightChangeDialogProps) {
  const methods = useForm<{weight: number}>({resolver: yupResolver(schema)});
  const {handleSubmit, control, setValue} = methods;

  useEffect(() => {
    if (weightChange) {
      setValue('weight', weightChange.weight);
    }
  }, [weightChange]);

  function onSubmit(formData: {weight: number}) {
    onClose('update', {...weightChange!, weight: formData.weight, setDate: new Date(weightChange?.setDate!).toISOString()});
  }

  return (
    <Dialog open={Boolean(weightChange)} onClose={() => onClose('cancel')} maxWidth={'xs'} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          Súly változás törlése/módosítása
          <IconButton onClick={() => onClose('cancel')} sx={{position: 'absolute', right: 12, top: 12}}>
            <Icon>close</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container columnSpacing={2}>
            <Grid item xs={2}/>
            <Grid item xs={4} className="center" sx={{fontWeight: 'bold'}}>
              {weightChange && new Date(weightChange.setDate).toLocaleDateString()}
            </Grid>
            <Grid item xs={3}>
              <CCFormText
                name="weight"
                control={control}
                label="Súly *"
                textFieldProps={{
                  type: 'number',
                  InputProps: {
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose('delete', weightChange)} startIcon={<Icon>delete</Icon>} color="error">Törlés</Button>
          <Button type={'submit'} startIcon={<Icon>edit</Icon>}>Módosítás</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
