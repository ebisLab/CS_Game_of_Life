import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import produce from 'immer'
import { Button } from 'react-bootstrap'; 
import InfoModal from './InfoModal'


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
       {/* <Button variant="primary" onClick={() => setShow(true)}>
        About
      </Button> */}
      <section>
      <h1>Conway Game of Life</h1>
      <Button
      className="topbtn"
      variant={runProgram? 'outline-danger': 'outline-success'}
      onClick={()=>{
          setRunProgram(!runProgram)
          // start_ProgramRef.current = true;
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
      </section>

{/* grid */}
<div style={{display: 'inline-flex'}}>
  <div className="modalmenu"><Button variant="warning" onClick={() => setShow(true)}>
        About
      </Button></div>

<div 
style={{display: 'grid',
justifyContent: 'center',
padding: 10,
gridTemplateColumns: `repeat(${cols_number}, 20px)`}}>
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
      style={{width: 20, 
        height: 20,
        boxShadow: grid[i][j]? "0px 0px 10px 0px #b3d8ff": undefined,
        background: grid[i][j]? color : undefined,
        border: '1px solid #21a0a0'

        // border: '1px solid #68ffff'
      }}>{cols}</div>
        
    ))
  ))}
</div>
{/* side bar */}
<div style={{ padding: "20px", right:" 100px", position: "absolute"}}>
      <h3>Generation: {generation}</h3>


<div style={{display: 'inline-flex'}}>

  <Button variant="danger" style={{height: "40px", top: "30px", position: "relative"}} onClick={increaseSpeed}>+</Button>
  <div className="cursor" style={{ position:"relative", padding:0, margin:0}}>
  <input className="rq-form-element" style={{border: 'none', fontSize: 40, width: '140px', fontWeight: 'bolder',padding: '20px', background: "#301547",
    color: "#ff1696"}} value={speed} onChange={changespeed}/>
    <i></i>
    </div>
  <Button variant="danger" style={{height: "40px", top: "30px", position: "relative"}} onClick={decreaseSpeed}>-</Button>

</div>

<div>
  <h2>Color:</h2>
  <input type="color" value={color} onChange={(e)=> setColor(e.target.value)}/>
  {console.log('color', color)}
</div>

</div>
</div>


<InfoModal setShow={setShow} show={show}/>


    </div>
  
  
  );
}

export default App;
