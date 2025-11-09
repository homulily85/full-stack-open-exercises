import type {NonSensitiveDiaryEntry} from "../types.ts";
import Entry from "./Entry.tsx";

const EntryList = ({entries}: { entries: NonSensitiveDiaryEntry[] }) => {
    return <>
        <h1>Dairy Entries</h1>
        {entries.map(e => (<Entry key={e.id} entry={e}/>))}
    </>;
};

export default EntryList;