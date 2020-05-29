import React from 'react'
import { Button } from 'react-bootstrap'; 
import Grid from './Grid'


const Sidebar = ({setShow, cols_number,speed, grid, produce, setGrid, color, generation, increaseSpeed, changespeed, decreaseSpeed, setColor})=>{
    return(
<div style={{display: 'inline-flex'}}>
  <div className="modalmenu"><Button variant="warning" onClick={() => setShow(true)}>
        About
      </Button></div>

<Grid cols_number={cols_number} grid={grid} produce={produce} setGrid={setGrid} color={color} />
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
    )
}

export default Sidebar