import React, { useEffect, useState } from 'react'
import HOME from '../assets/home.png'
import { CategoryCard } from './CategoryCard'
import APIClient from '../service/APIClient'
export const Home = () => {

    const [cats, setcats] = useState([])

    useEffect(() => {
        fetchCats();
    }, [])
    
    const fetchCats = async () => {
        const res = await APIClient.getCategories();
        setcats(res)
    }

    return (
        <div className='mt-md-3 mt-1'>
            <div className='row border bg-white g-0'>
                <div className=' bg-main p-1 col-lg-5 col-12'>
                    <img src={HOME} alt=""  className='img-fluid' />
                    <h5 className='my-3 text-center text-white d-lg-block d-md-block d-none'>Thousands ready to play online</h5>
                </div>
                <div className='d-flex flex-column justify-content-center py-3 px-3 col-lg-7 col-12'>
                    <h1 style={{ fontSize: '32px' }}>Word Search</h1>
                    <h6>We have the best collection of word search puzzles online, with new ones being added regularly.</h6>
                    <br />
                    <p>
                        They are fun to play, but also educational, in fact, many teachers make use of them.
                        <br />
                        <br />
                        Puzzles are 100% free to play and work on desktop pc, mac, mobile and tablet. Or you can go old school and print them to enjoy offline later.
                        <br />
                        <br />
                        Plus, if you're feeling a little more adventurous, why not create your very own with our simple to use <span className='text-decoration-underline'>Word Search Maker</span>, and then share them with your friends.
                        <br />
                        <br />
                        To get started playing, just select a game from below. Best of luck.
                    </p>
                </div>
            </div>


            <div className="row g-1 mt-3 mb-3 justify-content-between">
                {
                    cats.map((e,index)=>{
                        return <CategoryCard
                        key={index+index}
                        className={'col-md-3 p-1'}
                        e={e} 
                        />
                    })
                }
                
            </div>

        </div>
    )
}
