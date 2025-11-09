import type {FormEventHandler} from "react";
import {visibilityList, weatherList} from "../types.ts";

const CreateForm = ({handleSubmit, error}: {
    handleSubmit: FormEventHandler<HTMLFormElement>,
    error?: string
}) => {
    return <>
        <h1>Add new entry</h1>
        <p style={{color: "red"}}>{error}</p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date"/><br/>

            <label htmlFor="visibility">Visibility:</label>
            {visibilityList.map(w => (
                <span key={w}>
                    <input type="radio" name="visibility" id={w} value={w}/>
                    <label htmlFor={w}>{w}</label>
                </span>
            ))}
            <br/>

            <label htmlFor="weather">Weather:</label>
            {weatherList.map(w => (
                <span key={w}>
                    <input type="radio" name="weather" id={w} value={w}/>
                    <label htmlFor={w}>{w}</label>
                </span>
            ))}
            <br/>

            <label htmlFor="comment">Comment</label>
            <input type="text" name="comment" id="comment"/><br/>
            <button type={"submit"}>Add</button>
        </form>
    </>;
};

export default CreateForm;