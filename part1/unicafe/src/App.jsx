import {useState} from 'react'

const Header = ({text}) => {
    return <h1>{text}</h1>
}

const Button = ({text, onClick}) => {
    return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({text, value}) => {
    return <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
}

const Statistic = ({good, neutral, bad}) => {
    const totalVote = good + neutral + bad
    const point = good - bad
    if (totalVote === 0) {
        return <>
            <p>No feedback given</p>
        </>
    }
    return <table>
        <tbody>
        <StatisticLine text={"good"} value={good}></StatisticLine>
        <StatisticLine text={"neutral"} value={neutral}></StatisticLine>
        <StatisticLine text={"bad"} value={bad}></StatisticLine>
        <StatisticLine text={"all"} value={totalVote}></StatisticLine>
        <StatisticLine text={"average"} value={(point / totalVote).toFixed(1)}></StatisticLine>
        <StatisticLine text={"positive"} value={(good / totalVote * 100).toFixed(1).toString() + "%"}></StatisticLine>
        </tbody>
    </table>
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <Header text={"give feedback"}></Header>
            <Button onClick={handleGoodClick} text={"good"}></Button>
            <Button onClick={handleNeutralClick} text={"neutral"}></Button>
            <Button onClick={handleBadClick} text={"bad"}></Button>
            <Header text={"statistic"}></Header>
            <Statistic bad={bad} good={good} neutral={neutral}></Statistic>
        </div>
    )
}

export default App