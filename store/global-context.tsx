import {createContext, ReactNode, useState} from 'react';
import {MessageDialog} from '../components/message-dialog';
import {Button} from '@mui/material';
import {CCApplicationError, CCHTTPError} from '../utils/restCall';

type MessageDialogProps = {
  title: string;
  content: ReactNode | string;
  buttons?: ReactNode;
}

const GlobalContext = createContext({
  showMessageDialog: (title: string, content: ReactNode | string) => {},
  showAlertDialog: (title: string, errorMessage: string) => {},
  showConfirmationDialog: (message: string, onConfirm: () => void, confirmButtonText?: string) => {},
  showRestCallErrorDialog: (error: CCHTTPError | CCApplicationError) => {}
});

export function GlobalContextProvider(props: {children: ReactNode}) {
  const [messageDialogData, setMessageDialogData] = useState<MessageDialogProps | null>(null);

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

  function showConfirmationDialog(message: string, onConfirm: () => void, confirmButtonText?: string) {
    const onConfirmClick = () => {
      onConfirm();
      onDialogClose();
    };

    setMessageDialogData({
      title: 'Figyelem',
      content: message,
      buttons: (<>
        <Button onClick={onDialogClose}>Mégsem</Button>
        <Button onClick={onConfirmClick}>{confirmButtonText ?? 'Megerősít'}</Button>
      </>)
    });
  }

  function onDialogClose() {
    setMessageDialogData(null);
  }

  const context = {
    showMessageDialog,
    showAlertDialog,
    showConfirmationDialog,
    showRestCallErrorDialog
  };

  return (
    <>
      <GlobalContext.Provider value={context}>
        {props.children}
      </GlobalContext.Provider>
      {messageDialogData && <MessageDialog open={Boolean(messageDialogData)} onClose={onDialogClose} data={messageDialogData}/>}
    </>
  );
}

export default GlobalContext;
