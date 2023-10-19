import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='' style={{height: '80px'}}>
        <div className='d-flex p-2 justify-content-between align-items-end '>

        <h1 className='my-0 main-heading' onClick={()=>navigate('/')}>
            Word <strong>Search</strong>
        </h1>
        <div className='  align-items-end nav-line-btn'>
            <p className='ms-3 fs-5 nav-btn py-2 px-2 my-0' onClick={()=>navigate('/maker')}><i className="fas fa-pencil-alt fs-3 text-danger"></i>&nbsp;Word Search Maker</p>
            <p className='ms-3 fs-5 nav-btn py-2 px-2 my-0'  onClick={()=>navigate('/')}><i className="fas fa-home fs-3 text-danger"></i>&nbsp;More Puzzles</p>
            <p className='ms-3 fs-5 nav-btn py-2 px-2 my-0'><i className="fas fa-search fs-3 text-danger"></i>&nbsp;Search</p>
        </div>
        <button className='btn bg-main p-1 rounded-0 text-white nav-menu-btn'>Menu</button>
        </div>
        <div style={{height:5,backgroundColor:'#008080',width:'100%'}}></div>
    </div>
  )
}
