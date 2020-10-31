import React from 'react'
import { Button } from 'react-bootstrap'; 


const Sidebar = ({generation, increaseSpeed, speed, changespeed, decreaseSpeed, color, setColor})=>{
    return(
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
</div>

</div>    )
}

export default Sidebar