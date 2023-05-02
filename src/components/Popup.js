import React from 'react'

function Popup(props) {
    const {trigger,person}=props;
  return (trigger?(
    <div className='popup'>
        <div className='popup-inner'>
            <h5>{person.username}</h5>
            <h6>{person.email}</h6>
            <button className='close-btn btn btn-dark' onClick={()=>{props.setTrigger(false)}} onMouseLeave={()=>{props.setTrigger(false)}}>Close</button>
        </div>
    </div>
  ):"");
}

export default Popup