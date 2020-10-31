import React from 'react'


const Grid = ({cols_number,grid,produce,setGrid,color})=>{
    return(
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
      }}>
        {/* {cols} */}
      
      </div>
      
        
    ))
  ))}
</div>

        )
}

export default Grid