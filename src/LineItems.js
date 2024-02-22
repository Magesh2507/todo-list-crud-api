import React from 'react';
import { FaTrashAlt } from "react-icons/fa";

const LineItems = ({item, handleChange, handleClick}) => {
  return (   
        <li className="item" key={item.id}>
            <input
            type='checkbox'
            checked = {item.checked}
            onChange={()=>handleChange(item.id)}
            />
        <label 
            style = {(item.checked)? {textDecoration: "line-through"} : null}
            onDoubleClick={()=>handleClick(item.id)}>{item.item}
        </label>
        <FaTrashAlt
            role='button'
            tabIndex="0"
        onClick={()=>handleClick(item.id)}
        />
       </li>   
  )
}

export default LineItems