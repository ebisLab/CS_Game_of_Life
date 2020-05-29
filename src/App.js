import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import produce from 'immer'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'; 
// import Button from 'react-bootstrap/Button';


function App() {
  const[generation, setgeneration]=useState(0)
  const [speed, setSpeed]=useState(500)
  const[color, setColor]=useState('black')
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
        console.log('randomiii', row)

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
      },[coordinates])

console.log('speed', speed)
console.log('speed', typeof speed)

  return (
    <div className="App">
       <Button variant="primary" onClick={() => setShow(true)}>
        About
      </Button>
      <section>
      <h1>Conway Game of Life</h1>
      <button
      onClick={()=>{
          setRunProgram(!runProgram)
          // start_ProgramRef.current = true;
          start_Program()
          console.log('I clicked on start!')
        }}
      >{runProgram? 'Pause': 'Start'}</button>
      <button
      onClick={randomizeGrid}>Randomize</button>
      </section>

{/* grid */}
<div style={{display: 'inline-flex'}}>
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
        background: grid[i][j]? color : undefined,
         border: '1px solid black'}}>{cols}</div>
    ))
  ))}
</div>
<div style={{ padding: "20px", right:" 200px", position: "absolute"}}>
      <h3>Generation: {generation}</h3>
<div>
  <h2><input style={{border: 'none', fontSize: 40, width: 100, fontWeight: 'bolder'}}value={speed} onChange={changespeed}/></h2>
  <button onClick={increaseSpeed}>+</button>
  <button onClick={decreaseSpeed}>-</button>

</div>

<div>
  <h2>Color:</h2>
  <input type="color" value={color} onChange={(e)=> setColor(e.target.value)}/>
  {console.log('color', color)}
</div>

</div>
</div>


<Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
           About
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, 
          each of which is in one of two possible states, live or dead, (or populated and unpopulated, respectively). 
          Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or
           diagonally adjacent.
          </p>
        </Modal.Body>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
           Rules
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <ol>
          <li>Any live cell with two or three live neighbours lives on to the next generation.
</li>
<li>Any live cell with more than three live neighbours dies, as if by overpopulation.
</li>
<li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
</li>
</ol>          </p>
        </Modal.Body>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
           Get started
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <li>You have the option of manually selecting any number of tiles OR clicking the random button for a randomized pre selected tiles option</li>
            <li>Click the Play button </li>
            <li>Click pause button to pause the simulation</li>
            <h5>Custom Options</h5>
            <li>Click directly on speed value and type a value or use button to increase the speed, then click button</li>
            <li>Select selected tiles color from color picker</li>
         </p>
        </Modal.Body>
      </Modal>


    </div>
  
  
  );
}

export default App;
