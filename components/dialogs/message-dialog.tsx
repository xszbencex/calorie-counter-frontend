import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton} from '@mui/material';
import {DialogProps} from '../../types/DialogProps';

export const MessageDialog = (props: DialogProps) => {
  const {onClose, open, data} = props;

  const closeDialog = () => {
    onClose();
  };

  return (
    <Dialog onClose={closeDialog} open={open} maxWidth="xs" fullWidth>
      <DialogTitle>
        {data.title}
        <IconButton onClick={onClose} sx={{position: 'absolute', right: 12, top: 12}}>
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{padding: '16px 40px'}}>
        {data.content}
      </DialogContent>
      <DialogActions>
        {data.buttons ? data.buttons : (
          <Button onClick={closeDialog}>Bezár</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
