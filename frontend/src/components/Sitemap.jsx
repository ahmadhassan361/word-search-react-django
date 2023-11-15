import React, { useEffect, useState } from 'react'
import APIClient from '../service/APIClient';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_BASE_URL } from '../service/contants';
import { CategoryGameCard } from './CategoryGameCard';

export const Sitemap = () => {
    const navigate = useNavigate()
    const [categoryGames, setCategoryGames] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCategory()

    }, [])

    const fetchCategory = async () => {
        setLoading(true)
        const res = await APIClient.getCategories();
        console.log(res)
        setCategoryGames(res)
        setLoading(false)
    }


    

    
    return (
        <div style={{ minHeight: '600px' }}>
            {loading ? <div className='w-100 d-flex justify-content-center py-5'>

                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : <></>}

                    <h1 style={{ fontSize: '32px' }} className='my-5'>Sitemap</h1>
            <ul>

            {
                categoryGames.map((e)=>{
                    return <li className='text-decoration-underline'  style={{cursor:'pointer'}} onClick={()=>navigate(`/cat/${e.title}`)}>
                        {e.title}
                        <ul>
                        {
                        e.games.map((j) => {
                            return <li className='text-decoration-underline' style={{cursor:'pointer'}} onClick={()=>navigate('/puzzle/'+j.game_id)} key={j.title}>{j.title}</li>
                        })
                    }
                        </ul>
                    </li>
                })
            }
            </ul>
        </div>
    )
}
