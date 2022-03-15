import {ClientForm} from '../components/forms/client-form';
import {Box, Button} from '@mui/material';
import {ClientDTO} from '../types/dto/ClientDTO';
import {useContext} from 'react';
import GlobalContext from '../store/global-context';
import {createClient, updateClient} from '../utils/api/client-api';
import DialogContext from '../store/dialog-context';

export default function ProfilePage() {
  const globalContext = useContext(GlobalContext);
  const dialogContext = useContext(DialogContext);

  function onSubmit(formData: ClientDTO) {
    if (globalContext.client) {
      updateClient(formData, globalContext.client.id)
        .then(response => globalContext.setClient(response))
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    } else {
      createClient(formData)
        .then(response => globalContext.setClient(response))
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    }
  }

  return (
    <Box sx={{maxWidth: 1000, mx: 'auto'}}>
      <ClientForm onFormSubmit={onSubmit}/>
      <Button type="submit" form="client-form">Mentés</Button>
    </Box>
  );
}
