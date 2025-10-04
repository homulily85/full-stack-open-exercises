const Header = (props) => <h1>{props.name}</h1>

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)

const Total = (props) => <p>
    <b>Number of exercises {props.total}</b>
</p>

const Content = ({parts}) => {
    return <>
        {parts.map(part => <Part key={part.id} part={part}></Part>)}
    </>
}

const Course = ({course}) => {
    return <>
        <Header name={course.name}></Header>
        <Content parts={course.parts}></Content>
        <Total
            total={course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)}></Total>
    </>
}

export default Course