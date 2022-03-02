import {ClientForm} from '../components/forms/client-form';
import {Button} from '@mui/material';
import {ClientDTO} from '../types/dto/ClientDTO';
import {useContext} from 'react';
import GlobalContext from '../store/global-context';
import {createClient, updateClient} from '../utils/api/client-api';

export default function ProfilePage() {
  const globalContext = useContext(GlobalContext);

  function onSubmit(formData: ClientDTO) {
    if (globalContext.client) {
      updateClient(formData, globalContext.client.id)
        .then(response => globalContext.setClient(response))
        .catch(error => globalContext.showRestCallErrorDialog(error));
    } else {
      createClient(formData)
        .then(response => globalContext.setClient(response))
        .catch(error => globalContext.showRestCallErrorDialog(error));
    }
  }

  return (
    <div>
      <ClientForm onFormSubmit={onSubmit}/>
      <Button type="submit" form="client-form">Mentés</Button>
    </div>
  );
}
