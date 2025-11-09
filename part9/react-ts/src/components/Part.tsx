import type {CoursePart} from "../types.ts";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const renderPart = (coursePart: CoursePart) => {
    switch (coursePart.kind) {
        case "basic":
            return <>
                <p><em>{coursePart.description}</em></p>
            </>;
        case "group":
            return <>
                <p> project exercises: {coursePart.groupProjectCount}</p>
            </>;
        case "background":
            return <>
                <p><em>{coursePart.description}</em></p>
                <p>Background Material: {coursePart.backgroundMaterial}</p>
            </>;
        case "special":
            return <>
                <p><em>{coursePart.description}</em></p>
                <p>Required skill: {coursePart.requirements.join(', ')}</p>
            </>;
        default:
            assertNever(coursePart);
    }
};

const Part = ({coursePart}: { coursePart: CoursePart }) => {
    return <>
        <p><strong>{coursePart.name} {coursePart.exerciseCount}</strong></p>
        {renderPart(coursePart)}
    </>;
};

export default Part;