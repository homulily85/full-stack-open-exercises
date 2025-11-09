import type {CoursePart} from "../types.ts";
import Part from "./Part.tsx";

const Content = ({courseParts}: { courseParts: CoursePart[] }) => {
    return <>
        {courseParts.map(p => (
            <Part coursePart={p}/>
        ))}
    </>;
};

export default Content;