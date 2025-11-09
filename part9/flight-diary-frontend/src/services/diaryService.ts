import axios from "axios";
import type {NewDiaryEntry, NonSensitiveDiaryEntry} from "../types.ts";

const URL = '/api/diaries';

const getAll = async () => {
    const response = await axios.get<NonSensitiveDiaryEntry[]>(URL);
    return response.data;
};

const create = async (entry: NewDiaryEntry): Promise<NonSensitiveDiaryEntry> => {
    const response = await axios.post<NonSensitiveDiaryEntry>(URL, entry);
    return response.data;
};

export default {getAll, create};
