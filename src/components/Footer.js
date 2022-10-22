import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>Copyright &copy; {new Date().getFullYear()}
        <Link to='/about'>About</Link>
    </footer>
    
  )
}

export default Footer