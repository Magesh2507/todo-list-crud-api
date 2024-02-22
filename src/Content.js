import React from 'react'
import ItemsList from './ItemsList';

const Content = ({items, handleChange, handleClick}) => {
       
  return (
    <>
      {(items.length)?(
      <ItemsList  items = {items} handleChange = {handleChange} handleClick = {handleClick}/>
      ):(
      <p style={{color : "red"}}>Your List Is Empty</p>)}
    </>
  )
}

export default Content