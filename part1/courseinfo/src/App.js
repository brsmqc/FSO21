import React from 'react'

const Header = (props) => {
  const name = props.course.name
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Part = (props) => {
  const name = props.part.name
  const exercises = props.part.exercises

  return (
    <div>
      <p>{name} {exercises} </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce((a,b) => a + b.exercises, 0);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App