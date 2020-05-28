import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import produce from 'immer'



function App() {
  const[generation, setgeneration]=useState(0)
  const rows_number = 20; //TO BE DYNAMIC
  const cols_number = 20; //TO BE DYNAMIC

  //location of each neighbor surrounding
  const coordinates = [[1,0],[-1,0],[-1,-1],[1,-1],[0,1],[0,-1],[1,1],[-1,1]]


  const createGrid=()=>{
    const rows = []

    for(let i=0; i< rows_number; i++){
      rows.push(Array.from(Array(rows_number), ()=>0))
    }
    return rows
  }

  const [grid, setGrid]= useState(createGrid)

  const [runProgram, setRunProgram]= useState(false)

  const start_ProgramRef= useRef(runProgram);
  start_ProgramRef.current=runProgram


  const start_Program = useCallback(() => {
        setgeneration(prevstate =>(prevstate+=1))

      console.log('similuation is supposed to run')

      //need to mutate new grid values
      setGrid((current_grid)=>{


          return produce(current_grid, gridCopy=>{
            for (let i=0; i<rows_number; i++){
                for (let j=0; j<cols_number; j++){
                    //find neighbors
                    let neighbor = 0;
                    coordinates.forEach(([x,y])=>{

                        //current position
                        // + x offset
                        //turn it into a tile)
                        
                        //total up values in the array (you will receive neighbors)
                        // if cell dies/lives

                        const offset_J= y+j;
                        const offset_I= x+i;
                        
                        //checking bounds
                        //if //sum less than 0 (out of bound)
                        //return 0
                        if (offset_I >= 0 && offset_I < rows_number && offset_J >= 0 && offset_J < cols_number){
                            neighbor += current_grid[offset_I][offset_J]
                        }
                    });


                    if (neighbor < 2 || neighbor >3){
                        gridCopy[i][j]=0;
                    }
                    else if(current_grid[i][j]===0 && neighbor ===3){
                        gridCopy[i][j]=1; //will create a new grid and update the setGrid
                    }

      
                }
            }
          })

      })


      //simulation
      setTimeout(()=>{
        if (!start_ProgramRef.current){
          return
      }
        start_Program()}, 500);
      },[])


  return (
    <div className="App">
      <h1>Conway Game of Life</h1>
      <h3>{generation}</h3>
      <button
      onClick={()=>{
          setRunProgram(!runProgram)
          start_ProgramRef.current = true;
          start_Program()
          console.log('I clicked on start!')
        }}
      >{runProgram? 'Pause': 'Start'}</button>

{/* grid */}
<div 
style={{display: 'grid',
justifyContent: 'center',
padding: 10,
gridTemplateColumns: `repeat(${cols_number}, 26px)`}}>
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
          gridCopy[i][j]=grid[i][j] ? 0: 1
        } )
        setGrid(newGrid)
        console.log('I clicked this')
      }}
      style={{width: 25, 
        height: 22,
        background: grid[i][j]?'black': undefined,
         border: '1px solid black'}}>{cols}</div>
    ))
  ))}
</div>
<div>
  <h3>Generation: </h3>
</div>
    </div>
  
  
  );
}

export default App;
