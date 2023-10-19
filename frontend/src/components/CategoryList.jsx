import React, { useEffect, useState } from 'react'
import APIClient from '../service/APIClient';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_BASE_URL } from '../service/contants';
import { CategoryGameCard } from './CategoryGameCard';

export const CategoryList = () => {
    let { name } = useParams();
    const navigate = useNavigate()
    const [categoryGames, setCategoryGames] = useState([])
    const [category, setCategory] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCategory()

    }, [name])

    const fetchCategory = async () => {
        setLoading(true)
        const res = await APIClient.getGamesByCategory(name)
        console.log(res)
        setCategoryGames(res)
        setCategory(res[0]?.category)
        setLoading(false)
    }


    
    const [cats, setcats] = useState([])

    useEffect(() => {
        fetchCats();
    }, [])
    
    const fetchCats = async () => {
        const res = await APIClient.getCategories();
        setcats(res)
    }
    return (
        <div style={{ minHeight: '600px' }}>
            {loading ? <div className='w-100 d-flex justify-content-center py-5'>

                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : <></>}
            <div className='d-flex mt-5 align-items-center ' >

                <img src={MAIN_BASE_URL + category?.image} width={70} height={70} alt='' className='img-fluid' />
                <div className='ms-3 d-flex flex-column justify-content-center' style={{ height: '100%' }}>
                    <h1 style={{ fontSize: '32px' }} className='m-0'>{category?.title}</h1>
                    <h6>{category?.description}</h6>

                </div>
            </div>
            <div className="row mt-5 g-0">
                <div className="col-md-9 pe-5">

                    <div className="row g-0">
                        {
                            categoryGames.map((e, index) => {
                                return <div className='col-md-6 col-12 px-1 mt-2' key={e.title}>
                                    <CategoryGameCard e={e} className={'w-100 bg-white'} />
                                </div>
                            })
                        }

                    </div>
                </div>
                <div className="col-md-3  mt-2">
                    {
                            cats.map((e,index)=>{
                                return <div onClick={()=>navigate('/cat/'+e.title)} className='w-100 p-3 d-flex text-white align-items-center category-tile'>
                                    <img src={e.image} alt="" width={40} height={40} />
                                    <h4 className='ms-3 text-decoration-underline'>{e.title}</h4>
                                </div>
                            })
                    }
                </div>
            </div>
        </div>
    )
}
