import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import produce from 'immer'



function App() {
  const rows_number = 20; //TO BE DYNAMIC
  const cols_number = 20; //TO BE DYNAMIC


  const createGrid=()=>{
    const rows = []

    for(let i=0; i< rows_number; i++){
      rows.push(Array.from(Array(rows_number), ()=>0))
    }
    return rows
  }

  const [grid, setGrid]= useState(createGrid)

  const [running, setRunning]= useState(false)

  const start_ProgramRef= useRef(running);
  start_ProgramRef.current=running

  const start_Program = useCallback(() => {
      console.log('similuation is supposed to run')
      if (!start_Program.current){
          return;
      }

      //need to mutate new grid values
      setGrid((current_grid)=>{
          return produce(current_grid, gridCopy=>{
            for (let i=0; i<rows_number; i++){
                for (let j=0; j<cols_number; j++){
                    //find neighbors
                    let neighbor = 0;

                    if(gridCopy[i][j+1]===1){
                      neighbor +=1
                    }
                    if(gridCopy[i-1][j+1]===1){
                      neighbor -=1
                    }

      
                }
            }
          })

      })

      //if 2 neighbors have live
    //   for (let i=0; i<rows_number; i++){
    //       for (let j=0; i<cols_number; i++){

    //       }
    //   }

      //simulation
      setTimeout(start_Program, 100);


      },[])


  // console.log(grid)
  return (
    <div className="App">
      <h1>Conway Game of Life</h1>
      <button
      onClick={()=>{
          setRunning(!running)
          start_Program.current = true;
          start_Program()
          console.log('I clicked on start!')
        }}
      >Play</button>

{/* grid */}
<div 
style={{display: 'grid',
justifyContent: 'center',
padding: 10,
gridTemplateColumns: `repeat(${cols_number}, 21px)`}}>
  {grid.map((rows,i)=>(
    //for every row render a column
    rows.map((cols,j) =>(
      <div 
      key={`${Math.floor(new Date().valueOf() * Math.random())}`}
      onClick={()=>{
        //set current value to 1
        //we need to mutate the state
        const newGrid = produce(grid, gridCopy => {
          //creating a new grid value
          //alive || dead toggle
          gridCopy[i][j]=grid[i][j]? 0: 1
        } )
        setGrid(newGrid)
        console.log('I clicked this')
      }}
      style={{width: 20, 
        height: 20,
        background: grid[i][j]?'black': undefined,
         border: '1px solid black'}}>{cols}</div>
    ))
  // <div style={{border: '1px solid black', display: 'grid'}}>{row}</div>
  ))}
</div>
<div>
  <h3>Generation: </h3>
</div>
    </div>
  
  
  );
}

export default App;
