import React, { useState } from 'react';
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


  // console.log(grid)
  return (
    <div className="App">
      <h1>Conway Game of Life</h1>
      <button>Play</button>

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
      key={`${i}-${j}`}
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
    </div>
  );
}

export default App;