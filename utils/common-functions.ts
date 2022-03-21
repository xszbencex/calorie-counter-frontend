import {Dispatch, SetStateAction} from 'react';
import {Gender} from '../types/enum/Gender';
import {PhysicalActivity} from '../types/enum/PhysicalActivity';
import {physicalActivityOptions} from '../constants/enum-label';

export function arraysEqual(a: any[], b: any[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function addArrayElement(newRow: any, stateSetter: Dispatch<SetStateAction<any[]>>) {
  stateSetter((prevState: any[]) => [...prevState, newRow]);
}

export function modifyArrayElement(modifiedRow: any, stateSetter: Dispatch<SetStateAction<any[]>>) {
  stateSetter((prevState: any[]) => {
    const rowIndex = prevState.findIndex(row => row.id === modifiedRow.id);
    const copy = [...prevState];
    copy[rowIndex] = modifiedRow;
    return copy;
  });
}

export function deleteArrayElement(rowToDelete: any, stateSetter: Dispatch<SetStateAction<any[]>>) {
  stateSetter((prevState: any[]) => {
    const rowIndex = prevState.findIndex(row => row.id === rowToDelete.id);
    const copy = [...prevState];
    copy.splice(rowIndex, 1);
    return copy;
  });
}

export function constructMapFromJsonObject(object: any): Map<any, any> {
  const map = new Map<any, any>();
  for (const key in object) {
    map.set(key, object[key]);
  }
  return map;
}

export function getAgeByBirthDate(birthdate: Date | string | number) {
  const ageDifMs = Date.now() - new Date(birthdate).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
