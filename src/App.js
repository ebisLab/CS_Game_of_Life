import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import produce from 'immer'
import { Button } from 'react-bootstrap'; 
import InfoModal from './InfoModal'
import ButtonController from './ButtonControllers';
import Grid from './Grid';
import Sidebar from './SideBar';


function App() {
  const[generation, setgeneration]=useState(0)
  const [speed, setSpeed]=useState(500)
  const[color, setColor]=useState('white')
  const [show, setShow] = useState(false);
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



  const randomizeGrid=()=>{
    const row=[];
        for(let i=0; i<rows_number; i++){
          row.push(Array.from(Array(cols_number), ()=>Math.random()>0.5 ? 1:0))
        }
    setGrid(row)
  }

  const changespeed= (e)=>{
    setSpeed(Number(e.currentTarget.value))
    }

  const increaseSpeed = e=>{
    setSpeed(speed +10)
  }

  const decreaseSpeed = e=>{
    setSpeed(speed -10)
  }



  const [grid, setGrid]= useState(createGrid)

  const [runProgram, setRunProgram]= useState(false)

  const start_ProgramRef= useRef(runProgram);
  start_ProgramRef.current=runProgram


  const start_Program = useCallback(() => {

        setgeneration(prevstate =>(prevstate+=1))

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

                    //between 2 and 3 it does nothing
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
        start_Program()}, speed);
      },[coordinates, speed])


  return (
<div className="App">
      <section>
      <h1>Conway Game of Life</h1>
      <ButtonController
      runProgram={runProgram}
      setRunProgram={setRunProgram}
      start_Program={start_Program}
      randomizeGrid={randomizeGrid}
      setGrid={setGrid}
      createGrid={createGrid}
      setgeneration={setgeneration}
       />
      </section>

{/* grid */}
<div style={{display: 'inline-flex'}}>
<div className="modalmenu">
    <Button variant="warning" onClick={() => setShow(true)}> About</Button>
  </div>

<Grid cols_number={cols_number} grid={grid} produce={produce} setGrid={setGrid} color={color} />

<Sidebar 
setShow={setShow}
cols_number={cols_number}
grid={grid}
color={color}
generation={generation}
increaseSpeed={increaseSpeed}
speed={speed}
changespeed={changespeed}
decreaseSpeed={decreaseSpeed}
setColor={setColor}
/>
</div>



<InfoModal setShow={setShow} show={show}/>


    </div>
  
  
  );
}

export default App;
