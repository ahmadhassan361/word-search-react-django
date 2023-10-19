import React from 'react'

export const Footer = () => {
  return (
    <div className='py-5 mt-5' style={{backgroundColor:'#444444'}}>
        <div className="d-flex justify-content-center">
            <h6 className='text-white text-decoration-underline mx-2'>Data Consent Preferences</h6>
            <h6 className='text-white text-decoration-underline mx-2'>Site Map</h6>
            <h6 className='text-white text-decoration-underline mx-2'>Privacy Policy</h6>
            <h6 className='text-white mx-2'>© TheWordSearch.com</h6>
        </div>
        <div className="d-flex justify-content-center mt-2">
            <h6 className='text-white text-decoration-underline mx-2'>Printable Word Searches</h6>
            <h6 className='text-white text-decoration-underline mx-2'>Play Hangman</h6>
            
        </div>
    </div>
  )
}
