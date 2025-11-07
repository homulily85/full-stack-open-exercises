import {NewPatient, NewPatientSchema} from "./types";

// const isString = (text: unknown): text is string => {
//     return typeof text === 'string' || text instanceof String;
// };
//
// const isGender = (text: string): text is Gender => {
//     return Object.values(Gender).map(v => v.toString()).includes(text);
// };
//
// const parseString = (text: unknown) => {
//     if (!text || !isString(text)) {
//         throw new Error('Incorrect or missing fields');
//     }
//     return text;
// };
//
// const parseDateOfBirth = (text: unknown) => {
//     if (!text || !isString(text) || isNaN(Date.parse(text))) {
//         throw new Error('Incorrect or missing date of birth');
//     }
//     return text;
// };
//
// const parseGender = (text: unknown) => {
//     if (!text || !isString(text) || !isGender(text)) {
//         throw new Error('Incorrect or missing fields');
//     }
//     return text;
// };

export const toNewPatient = (object: unknown): NewPatient => {
    // if (!object || typeof object !== 'object') {
    //     throw new Error('Incorrect or missing data');
    // }
    //
    // if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    //     return {
    //         name: parseString(object.name),
    //         dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    //         ssn: parseString(object.ssn),
    //         gender: parseGender(object.gender),
    //         occupation: parseString(object.occupation),
    //     };
    // }
    //
    // throw new Error('Missing fields');

    return NewPatientSchema.parse(object);
};
