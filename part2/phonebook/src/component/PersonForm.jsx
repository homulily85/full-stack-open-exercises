const PersonForm = ({
                        newNameInputValue,
                        onNewNameInputValueChange,
                        newNumberInputValue,
                        onNewNumberInputValueChange,
                        onSubmit
                    }) => {
    return <form>
        <div>
            name: <input onChange={onNewNameInputValueChange} value={newNameInputValue}/>
        </div>
        <div>
            number: <input onChange={onNewNumberInputValueChange} value={newNumberInputValue}/>
        </div>
        <div>
            <button type="submit" onClick={onSubmit}>add</button>
        </div>
    </form>
}

export default PersonForm