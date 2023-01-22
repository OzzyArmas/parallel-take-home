import React, { useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { type } from 'os';

const workflowTriggerURL = "https://us-west1-esoteric-dryad-120201.cloudfunctions.net/executeWorkflow";


async function getFizzBuz(input: number, callback: any) { 
    const response = await axios.post(workflowTriggerURL, {input: input})
    callback(JSON.parse(response.data.result))
    console.log(response)
}

// const getFizzBuzz = () => {}
type FizzBuzzProps = {
  result: string[]
}

function FizzBuzzResult(props: FizzBuzzProps)  {
  console.log('does this even get tried?')
  const [result, setResult] = useState<any[]>()
  useEffect(() => {
    if (props.result) {
      setResult(props.result.map((item) => <li> {item} </li>))
    }
  })
  return <ul style={{listStyleType: 'none'}}>{result}</ul>
}
function App() {
  const [input, setInput ] = useState({value: ''})
  const [waitState, setWait] = useState({waiting: false})
  const [fizzBuzzResult, setFizzBuzzResult] = useState<string[]>([])


  const handleOnChange = (e: any) => {
    return setInput(() => {
        return {value: e.target.value}
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input style={{width: 500}} placeholder= "Enter your FizzBuzz number"
            onKeyDown={
              (e: any) => {
                  if (e.key === 'Enter' && input.value.length > 0 && Number(input.value) > 0) {
                      setWait({waiting: true})
                      getFizzBuz(Number(input.value), (result: string[]) => {
                        setFizzBuzzResult(result)
                        setWait({waiting: false})
                      })
                  }
                }
              }
            onChange={(e) => { handleOnChange(e) }}/>
        {waitState.waiting ? <h2> Waiting.... </h2> : <a></a>}
        <FizzBuzzResult result={fizzBuzzResult}/>

      </header>
    </div>
  );
}

export default App;
