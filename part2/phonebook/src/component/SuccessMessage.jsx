import "../app.css"

const SuccessMessage = ({message}) => {
    if (!message) {
        return null
    }
    return <div className={"message success"} >
        <p>{message}</p>
    </div>
}

export default SuccessMessage