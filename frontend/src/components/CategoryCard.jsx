import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CategoryCard = ({ e, className }) => {
    const navigate = useNavigate()
    return (
        <div className={'' + className}>
            <div className={`bg-white border`}>
                <div className='d-flex align-items-end main-btn p-2'>
                    <img src={e.image} width={28} height={28} alt="" />
                    <h4 className='text-danger ms-2 mb-0'>  {e.title}</h4>
                </div>
                <ul className='mt-3'>
                    {
                        e.games.map((e) => {
                            return <li className='main-btn  px-2 py-1' onClick={()=>navigate('/puzzle/'+e.game_id)} key={e.title}>{e.title}</li>
                        })
                    }
                </ul>
                <h6 className='m-1 text-end' onClick={()=>{
                    navigate(`/cat/${e.title}`)
                }} style={{cursor:'pointer'}}>+{e.total_games > e.games.length ? e.total_games : ''} <i className="fas fa-external-link-alt"></i></h6>


            </div>
        </div>
    )
}
