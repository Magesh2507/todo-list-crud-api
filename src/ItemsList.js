import React from 'react'
import LineItems from './LineItems';


const ItemsList = ({items, handleChange, handleClick}) => {
  return (
    <ul>
      {items.map((item) => (
        <LineItems item = {item} key={item.id}
          handleChange = {handleChange} handleClick = {handleClick} />
      ))}
    </ul>
  )
}

export default ItemsList