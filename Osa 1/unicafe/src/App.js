import React, { useState } from 'react'

const Button = ({handler, text}) => (
  <button onClick={handler}>
    {text}
  </button>
)

const StatisticLine = ({text, num}) => (
  <tr>
    <td>{text}:</td>
    <td>{num}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  if(good + neutral + bad > 0) {
    return (
      <table>
        <StatisticLine text="Good" num={good} />
        <StatisticLine text="Neutral" num={neutral} />
        <StatisticLine text="Bad" num={bad} />
        <StatisticLine text="All" num={good + neutral + bad}/>
        <hr />
        <StatisticLine text="Average" num={((good - bad)/(good + bad + neutral)).toFixed(2)} />
        <StatisticLine text="Positive" num={(good/(good + bad + neutral)).toFixed(2)} />
      </table>
    )
  }
  else {
    return (
      <p>No feedback given!</p>
    )
  }
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <b>Feedback</b>
      <p>It's very important for us!</p>
      <hr />
      <p>How can you discribe our cafe?</p>
      <Button handler={() => setGood(good + 1)} text="Good" />
      <Button handler={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handler={() => setBad(bad + 1)} text="Bad" />
      <hr />
      <b>Statistics</b>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App