import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CategoryGameCard = ({className,e}) => {
    const navigate = useNavigate()
  return (
    <div style={{borderLeft:'6px solid #008080',minHeight:'100px'}} onClick={()=>navigate('/puzzle/'+e.game_id)} className={'p-2 '+className}>
        <h4 className='m-0 text-decoration-underline'>{e.title}</h4>
        <p className='text-success mt-2 fs-6'>{e.description}</p>
    </div>
  )
}
