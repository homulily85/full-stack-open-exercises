import {useEffect, useState} from "react";
import type {NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather} from "./types.ts";
import dairyService from "./services/diaryService.ts";
import diaryService from "./services/diaryService.ts";
import EntryList from "./components/EntryList.tsx";
import CreateForm from "./components/CreateForm.tsx";
import axios from "axios";

function App() {
    const [diaryEntries, setDairyEntries] = useState<NonSensitiveDiaryEntry[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        dairyService.getAll().then(data => setDairyEntries(data));
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newEntry: NewDiaryEntry = {
            comment: (event.currentTarget.elements.namedItem('comment') as HTMLInputElement).value,
            visibility: (event.currentTarget.elements.namedItem('visibility') as HTMLInputElement).value as Visibility,
            weather: (event.currentTarget.elements.namedItem('weather') as HTMLInputElement).value as Weather,
            date: (event.currentTarget.elements.namedItem('date') as HTMLInputElement).value,
        };
        diaryService.create(newEntry).then(e => setDairyEntries([...diaryEntries, e]))
            .then(() => setError(''))
            .catch((e: unknown) => {
                if (axios.isAxiosError(e)) {
                    setError(e.response?.data);
                }
            });

    };

    return <>
        <CreateForm handleSubmit={handleSubmit} error={error}/>
        <EntryList entries={diaryEntries}/>
    </>;
}

export default App;