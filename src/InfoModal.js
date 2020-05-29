import React from 'react'
import Modal from 'react-bootstrap/Modal'

const InfoModal = ({show, setShow})=>{
return(
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
          
            <ol>
          <li>Any live cell with two or three live neighbours lives on to the next generation.
</li>
<li>Any live cell with more than three live neighbours dies, as if by overpopulation.
</li>
<li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
</li>
</ol>         
        </Modal.Body>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
           Get started
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <li>You have the option of manually selecting any number of tiles OR clicking the random button for a randomized pre selected tiles option</li>
            <li>Click the Play button </li>
            <li>Click pause button to pause the simulation</li>
            <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
           Custom Options
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <li>Click directly on speed value and type a value or use button to increase the speed, then click play button</li>
            <li>You can customize active tiles color by selecting color input button</li>
            </Modal.Body>
         
        </Modal.Body>
      </Modal>
)
}

export default InfoModal