import {NewPatient, NonsensitivePatient} from "../types";
import patientsData from "../data/patients";
import {v1 as uuid} from 'uuid';

const getAll = (): NonsensitivePatient[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
            id, name, dateOfBirth, gender, occupation
        })
    );
};

const add = (p: NewPatient) => {
    const id = uuid();
    const newPatient = {...p, id};
    patientsData.push(newPatient);
    return newPatient;
};

export default {getAll, add};