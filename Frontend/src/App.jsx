import { useState,useEffect } from 'react'
import Addtodo from './components/Addtodo'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Todo from './components/Todo'

function App() {
  const [count, setCount] = useState(0);

  const render = ()=>{
    setCount((count+1)%2);
  }

  useEffect(()=>{
    console.log("loaded");
  }, [count])

  return (
    <div >
      <Navbar/>
      <Dashboard count={count}/>
      <Addtodo render={render}/>
      <Todo count={count} render={render}/>
    </div>
  )
}

export default App
