import React from 'react'

const Footer = ({length}) => {

  return (
    <footer>{length} List {length===1?"Item": length===0? "empty":"Items"}</footer>
    
  )
}

export default Footer