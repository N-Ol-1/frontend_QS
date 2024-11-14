import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Sidebar } from './Sidebar'

import { Header } from './Header'
import { Hero } from './Hero'

import { TestGrid } from './TestGrid'
import { EvaluationGrid } from './EvaluationGrid'
import { NewGrid } from './NewGrid'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <Sidebar/>
     
    
   
      <NewGrid/>
    
     
    
    </>
    
  )
}

export default App
