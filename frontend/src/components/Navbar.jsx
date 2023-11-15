import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LOGO from '../assets/logo.png'
export const Navbar = () => {
  const navigate = useNavigate()
  const [navWidth, setNavWidth] = useState(0);

  const openNav = () => {
    setNavWidth('100%');
  }

  const closeNav = () => {
    setNavWidth(0);
  }
  return (
    <>
    <div id="myNav" className="overlay" style={{ width: navWidth }}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
        <div className="overlay-content text-white text-start">
        <h1 className='ms-3  py-2 px-2 my-3' onClick={()=>{
          closeNav();
          navigate('/maker')}}><i className="fas fa-pencil-alt fs-3 text-danger"></i>&nbsp;Word Search Maker</h1>
            <h1 className='ms-3  py-2 px-2 my-3'  onClick={()=>{
                        closeNav();
              navigate('/')}}><i className="fas fa-home fs-3 text-danger"></i>&nbsp;More Puzzles</h1>

        </div>
      </div>
<div className='' style={{height: '80px'}}>
        <div className='d-flex p-2 justify-content-between align-items-end '>

        {/* <h1 className='my-0 main-heading' onClick={()=>navigate('/')}>
            Word <strong>Search</strong>
        </h1> */}
        <img src={LOGO} alt="" height={70} onClick={()=>navigate('/')}/>
        <div className='  align-items-end nav-line-btn'>
            <p className='ms-3 fs-5 nav-btn py-2 px-2 my-0' onClick={()=>navigate('/maker')}><i className="fas fa-pencil-alt fs-3 text-danger"></i>&nbsp;Word Search Maker</p>
            <p className='ms-3 fs-5 nav-btn py-2 px-2 my-0'  onClick={()=>navigate('/')}><i className="fas fa-home fs-3 text-danger"></i>&nbsp;More Puzzles</p>
            {/* <p className='ms-3 fs-5 nav-btn py-2 px-2 my-0'><i className="fas fa-search fs-3 text-danger"></i>&nbsp;Search</p> */}
        </div>
        <button className='btn bg-main p-1 rounded-0 text-white nav-menu-btn' onClick={openNav}>Menu</button>
        </div>
        <div style={{height:5,backgroundColor:'#974B40',width:'100%'}}></div>
    </div>
    </>
    
  )
}
