import {useContext, useEffect, useState} from 'react';
import {deleteWeightChange, getAllWeightChangeByUserId, updateWeightChange} from '../../utils/api/weight-change-api';
import {WeightChangeDTO} from '../../types/dto/WeightChangeDTO';
import GlobalContext from '../../store/global-context';
import DialogContext from '../../store/dialog-context';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {primaryColor} from '../../constants/stlyes';
import {WeightChangeDialog} from '../dialogs/weight-change-dialog';
import {deleteArrayElement, modifyArrayElement} from '../../utils/common-functions';

export function WeighChangeChart() {
  const globalContext = useContext(GlobalContext);
  const dialogContext = useContext(DialogContext);
  const [weightChanges, setWeightChanges] = useState<WeightChangeDTO[]>([]);
  const [dialogData, setDialogData] = useState<WeightChangeDTO>();

  useEffect(() => {
    getAllWeightChangeByUserId(globalContext.loggedInUserId!)
      .then(response => {
        if (response.length > 0 && new Date(response[response.length - 1].setDate).getDate() !== new Date().getDate()) {
          response.push({
            weight: response[response.length - 1].weight,
            setDate: new Date().toISOString().substring(0, 10)
          } as WeightChangeDTO);
        }
        setWeightChanges(response);
      })
      .catch(error => dialogContext.showRestCallErrorDialog(error));
  }, []);

  function openDialog(weightChange: WeightChangeDTO) {
    setDialogData(weightChange);
  }

  function closeDialog(action: 'update' | 'delete' | 'cancel', weightChange?: WeightChangeDTO) {
    if (action === 'delete') {
      deleteWeightChange(weightChange?.id!)
        .then(() => deleteArrayElement(weightChange, setWeightChanges))
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    } else if (action === 'update') {
      updateWeightChange(weightChange!, weightChange?.id!)
        .then(response => modifyArrayElement({
          ...response,
          setDate: new Date(weightChange?.setDate!).toISOString().substring(0, 10)
        }, setWeightChanges))
        .catch(error => dialogContext.showRestCallErrorDialog(error));
    }
    setDialogData(undefined);
  }

  return (
    <>
      <LineChart
        width={730} height={250} data={weightChanges}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="setDate"/>
        <YAxis dataKey="weight"/>
        <Tooltip/>
        <Legend/>
        <Line
          type="monotone" dataKey="weight" stroke={primaryColor} name="Súly (kg)"
          activeDot={{r: 7, onClick: (_, event: any) => openDialog(event.payload)}}/>
      </LineChart>
      <WeightChangeDialog weightChange={dialogData} onClose={closeDialog}/>
    </>
  );
}
