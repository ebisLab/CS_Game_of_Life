import React from 'react'
import { Button } from 'react-bootstrap'; 


const ButtonController = ({runProgram, start_Program, randomizeGrid, setGrid,createGrid,setRunProgram,setgeneration})=>{
    return(
    <div>
      <Button
      className="topbtn"
      variant={runProgram? 'outline-danger': 'outline-success'}
      onClick={()=>{
          setRunProgram(!runProgram)
          start_Program()
        }}
      >{runProgram? 'Pause': 'Start'}</Button>
      <Button
      className="topbtn"
      variant="outline-warning"
      onClick={randomizeGrid}>Randomize</Button>
      <Button
        className="topbtn"
        variant="outline-info"
        onClick={()=>{
        setGrid(createGrid())
        setRunProgram(false)
        setgeneration(0)
        }}
      >clear</Button>
    </div>)
}

export default ButtonController