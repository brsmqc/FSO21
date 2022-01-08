import React, { useState } from 'react'

const Display = () => {
  return (
    <h1>
      give feedback
    </h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }
  
  return (
    <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad
  const average = ((props.good + (props.bad * -1))/sum).toFixed(1)
  const posPercent = (props.good/sum*100).toFixed(1)
  
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticsLine text='good' value={props.good} />
        <StatisticsLine text='neutral' value={props.neutral} />
        <StatisticsLine text='bad' value={props.bad} />
        <StatisticsLine text='all' value={sum} />
        <StatisticsLine text='average' value={average} />
        <StatisticsLine text='positive' value={posPercent} />
        </tbody>
      </table>
    </div>
  )
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
      <Display />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App