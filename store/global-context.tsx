import {createContext, ReactNode, useState} from 'react';
import {Alert, Button, Snackbar} from '@mui/material';
import {CCApplicationError, CCHTTPError} from '../utils/restCall';
import {MessageDialog} from '../components/dialogs/message-dialog';
import {FormDialog, FormDialogData} from '../components/dialogs/form-dialog';

type MessageDialogProps = {
  title: string;
  content: ReactNode | string;
  buttons?: ReactNode;
}

type SnackbarProps = {
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
}

const GlobalContext = createContext({
  showMessageDialog: (title: string, content: ReactNode | string) => {},
  showAlertDialog: (title: string, errorMessage: string) => {},
  showConfirmationDialog: (message: string, onConfirm: () => void, onCancel?: () => void, confirmButtonText?: string) => {},
  showRestCallErrorDialog: (error: CCHTTPError | CCApplicationError) => {},
  openFormDialog: (formDialogData: FormDialogData) => {},
  closeFormDialog: () => {},
  showSnackbar: (message: string, type: 'error' | 'warning' | 'info' | 'success') => {},
});

export function GlobalContextProvider(props: { children: ReactNode }) {
  const [messageDialogData, setMessageDialogData] = useState<MessageDialogProps | null>(null);
  const [formDialogData, setFormDialogData] = useState<FormDialogData | null>(null);
  const [snackbarData, setSnackbarData] = useState<SnackbarProps | null>(null);

  function showMessageDialog(title: string, content: ReactNode | string) {
    setMessageDialogData({
      title,
      content
    });
  }

  function showAlertDialog(title: string, errorMessage: string) {
    setMessageDialogData({
      title: title,
      content: errorMessage,
    });
  }

  function showRestCallErrorDialog(error: CCHTTPError | CCApplicationError) {
    if (error instanceof CCHTTPError) {
      showAlertDialog('Szolgáltatás hiba', `${error.status} ${error.statusText}`);
    } else {
      showAlertDialog(error.title, error.message);
    }
  }

  function showConfirmationDialog(message: string, onConfirm: () => void, onCancel?: () => void, confirmButtonText?: string) {
    const onConfirmClick = () => {
      onConfirm();
      onMessageDialogClose();
    };

    const onCancelClick = () => {
      if (onCancel) {
        onCancel();
      }
      onMessageDialogClose();
    };

    setMessageDialogData({
      title: 'Figyelem',
      content: message,
      buttons: (<>
        <Button onClick={onCancelClick}>Mégsem</Button>
        <Button onClick={onConfirmClick}>{confirmButtonText ?? 'Megerősít'}</Button>
      </>)
    });
  }

  function onMessageDialogClose() {
    setMessageDialogData(null);
  }

  function onSnackbarClose() {
    setSnackbarData(null);
  }

  function openFormDialog(formDialogData: FormDialogData) {
    setFormDialogData(formDialogData);
  }

  function closeFormDialog() {
    setFormDialogData(null);
  }

  function showSnackbar(message: string, type: 'error' | 'warning' | 'info' | 'success') {
    setSnackbarData({message, type});
  }

  const context = {
    showMessageDialog,
    showAlertDialog,
    showConfirmationDialog,
    showRestCallErrorDialog,
    openFormDialog,
    closeFormDialog,
    showSnackbar,
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
      {messageDialogData && (
        <MessageDialog
          open={Boolean(messageDialogData)}
          onClose={onMessageDialogClose}
          data={messageDialogData}
        />
      )}
      {formDialogData && (
        <FormDialog
          open={Boolean(formDialogData)}
          onClose={closeFormDialog}
          {...formDialogData}
        />
      )}
      {snackbarData && (
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={Boolean(snackbarData)}
          onClose={onSnackbarClose}
          autoHideDuration={1500}
        >
          <Alert onClose={onSnackbarClose} severity={snackbarData.type} elevation={6} variant="filled">
            {snackbarData.message}
          </Alert>
        </Snackbar>
      )}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;
