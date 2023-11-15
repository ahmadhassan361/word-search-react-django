import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='py-5 mt-5' style={{backgroundColor:'#444444'}}>
        <div className="d-flex flex-column flex-md-row justify-content-center g-0 px-2">
            <h6 className='text-white text-decoration-underline mx-2' onClick={()=>navigate('/')}>Home</h6>
            <h6 className='text-white text-decoration-underline mx-2' onClick={()=>navigate('/sitemap')}>Sitemap</h6>
            <h6 className='text-white text-decoration-underline mx-2' onClick={()=>navigate('/about')}>About</h6>
            <h6 className='text-white text-decoration-underline mx-2' onClick={()=>navigate('/privacy')}>Privacy Policy</h6>
            <h6 className='text-white text-decoration-underline mx-2' onClick={()=>navigate('/terms-condition')}>Terms & Conditions</h6>
            <h6 className='text-white text-decoration-underline mx-2' onClick={()=>navigate('/cookie')}>Cookie Policy</h6>
            <h6 className='text-white text-decoration-underline mx-2' onClick={()=>navigate('/contact')}>Contact</h6>
        </div>
        <div className="d-flex justify-content-center mt-2 text-white">
          <a className='mx-2 fs-4 text-decoration-none text-white' href="https://www.facebook.com/profile.php?id=61552344121793">

        <i className="fab fa-facebook"></i>
          </a>
          <a className='mx-2 fs-4 text-decoration-none text-white' href="https://www.instagram.com/wordsearchcafe/">

          <i className="fab fa-instagram"></i>
          </a>
          <a className='mx-2 fs-4 text-decoration-none text-white' href="https://www.pinterest.co.uk/wordsearchcafe/">

          <i className="fab fa-pinterest-square"></i>
          </a>

            
        </div>
        <p className='text-center text-white'>Copyright © 2023 Word Search Cafe. All Rights Reserved</p>
    </div>
  )
}
