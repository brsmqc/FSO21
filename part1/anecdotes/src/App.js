import React, { useState } from 'react'

const Button = ({ handle, text }) => {
  return (
    <button onClick={handle}>
      {text}
    </button>
  )
}

const Display = ({ anecdote, votes}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdote} <br />
      has {votes} votes
    </div>
  )
}

const HighestVotes = ({anecdote, votes}) => {
  if (anecdote === undefined || votes === undefined) {
    return (
      <div>
        <h1>Anecdote with the most votes</h1>
        none right now. Get to voting!
      </div>
    )
  }
  
  return (
    <div>
      <h1>Anecdote with the most votes</h1>
      {anecdote} <br />
      has {votes} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ]
  const voteArr = new Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(Math.floor(Math.random()*anecdotes.length))
  const [votes, setVotes] = useState(voteArr)

  const handleChange = () => {
    let newState = () => Math.floor(Math.random()*anecdotes.length)
    while (newState === selected) {
      newState()
    }
    setSelected(newState)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const checkVotes = () => {
    const max = Math.max(...votes)
    const index = votes.indexOf(max)
    return index
  }

  return (
    <div>
      <Display anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handle={handleVote} text='vote' />
      <Button handle={handleChange} text='next anecdote' />
      <HighestVotes anecdote={anecdotes[checkVotes()]} votes={votes[checkVotes()]} />
    </div>
  )
}

export default App