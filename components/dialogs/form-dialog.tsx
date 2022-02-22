import {Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Icon, IconButton} from '@mui/material';
import {ReactNode} from 'react';

export type FormDialogData = {
  /**
   * Dialog címe.
   */
  title: string,

  /**
   * Form neve, amely megegyezik a form komponensben szereplő form nevével '<form name="...">.
   *
   * A submit gomb miatt van rá szükség.
   */
  formName: string,

  /**
   * A formot tartalmazó komponens.
   */
  formComponent: ReactNode,

  /**
   * Dialog komponens propertyk
   *
   * - [MUI DialogProps](https://mui.com/api/dialog/) propertyk leírása
   *
   * Leggyakrabban használtak:
   * - maxWidth
   * - fullWidth
   */
  dialogProps?: Omit<DialogProps, 'open' | 'onClose'>,

  /**
   * Ha nincsen szükség "Mentés" gombra, csak bezárás gombra.
   */
  onlyCloseButton?: boolean
}

type FormDialogProps = FormDialogData & {
  onClose: () => void,
  open: boolean,
}

export const FormDialog = ({onClose, open, title, formName, dialogProps, formComponent, onlyCloseButton}: FormDialogProps) => {
  const closeDialog = () => {
    onClose();
  };

  return (
    <Dialog
      {...dialogProps}
      onClose={closeDialog}
      open={open}
      maxWidth={dialogProps?.maxWidth ?? 'md'}
      fullWidth={dialogProps?.fullWidth ?? true}
    >
      <DialogTitle>
        {title}
        <IconButton onClick={closeDialog} sx={{position: 'absolute', right: 12, top: 12}}>
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{padding: '16px 40px'}}>
        {formComponent}
      </DialogContent>
      <DialogActions>
        {onlyCloseButton ? (
          <Button onClick={closeDialog}>Bezárás</Button>
        ): (
          <>
            <Button onClick={closeDialog}>Mégsem</Button>
            <Button form={formName} type="submit">Mentés</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
