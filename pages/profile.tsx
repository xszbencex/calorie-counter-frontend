import {ClientForm} from '../components/forms/client-form';
import {Button} from '@mui/material';
import {ClientDTO} from '../types/dto/ClientDTO';
import {useContext, useEffect, useState} from 'react';
import GlobalContext from '../store/global-context';
import {createClient, updateClient} from '../utils/api/client-api';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {getAllWeightChangeByUserId} from '../utils/api/weight-change-api';

export default function ProfilePage() {
  const globalContext = useContext(GlobalContext);
  const [weightChanges, setWeightChanges] = useState<any[]>([]);

  useEffect(() => {
    getAllWeightChangeByUserId(globalContext.loggedInUserId!)
      .then(response => {
        const mappedToChartData = response.map(value => ({name: new Date(value.setDate).toLocaleDateString(), weight: value.weight}));
        setWeightChanges(mappedToChartData);
      })
      .catch(error => globalContext.showRestCallErrorDialog(error));
  }, []);

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
      <LineChart
        width={730} height={250} data={weightChanges}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="weight" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
