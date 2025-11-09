import type {NonSensitiveDiaryEntry} from "../types.ts";

const Entry = ({entry}: { entry: NonSensitiveDiaryEntry }) => {
    return <>
        <h2>{entry.date}</h2>
        <p>visibility: {entry.visibility}</p>
        <p>weather: {entry.weather}</p>
    </>;
};

export default Entry;