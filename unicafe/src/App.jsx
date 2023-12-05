import { useState } from 'react'

const Button = ({name,onClick})=>{
  return(
    <button onClick={onClick}>{name}</button>
  )
}

const StatisticLine = ({name , state , extra=""})=>{
  return(
    <tr>
      <td>{name}</td>
      <td>{state}{extra}</td>
    </tr>
  )
}

const BtnGroup = ({feedbacks , handelClick})=>{
  return(
    feedbacks.map(feedback=>{
      return(<Button name={feedback} onClick={handelClick(feedback)} key={feedback}/>)
    })
  )
}

const Statistics = ({feedbacks , states})=>{
  const [good,neutral,bad]=states;
  let all = good+neutral+bad;
  if(all===0){
    return(<p>No feedback given</p>)
  }
  return(
    <table>
        <StatisticLine name={feedbacks[0]} state={good}/>
        <StatisticLine name={feedbacks[1]} state={neutral}/>
        <StatisticLine name={feedbacks[2]} state={bad}/>
        <StatisticLine name="all" state={all}/>
        <StatisticLine name="average" state={(good-bad)/all}/>
        <StatisticLine name="positive" state={(good/all)*100} extra='%'/>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedbacks = ["good","neutral","bad"]
  function handelClick (feedback){
    if(feedback==='good'){
      return ()=>setGood(good+1)
    }else if(feedback==="bad"){
      return ()=>setBad(bad+1)
    }else if(feedback==='neutral'){
      return ()=>setNeutral(neutral+1)
    }
  }
  return (
    <div>
      <h1>give feedback</h1>
      <BtnGroup feedbacks={feedbacks} handelClick={handelClick}/>
      <h2>statistics</h2>
      <Statistics feedbacks={feedbacks} states={[good,neutral,bad]}/>
    </div>
  )
}

export default App