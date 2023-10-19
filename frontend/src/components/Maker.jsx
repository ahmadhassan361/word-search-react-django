import React, { useEffect, useState } from 'react'
import APIClient from '../service/APIClient';
import { useNavigate } from 'react-router-dom';
import { MakerPuzzle } from './MakerPuzzle';

export const Maker = () => {
    const [inputs, setInputs] = useState(Array(32).fill(''));
    const [errors, setErrors] = useState(Array(32).fill(''));
    const [isFamily, setIsFamily] = useState(null)
    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [mainError, setMainError] = useState('')
    const [radioError, setRadioError] = useState(false)
    const navigate = useNavigate()
    const [show, setshow] = useState(false)
    const [game_res, setgame_res] = useState(null)
    const handleChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;

        // Check for validation errors
        const newErrors = [];
        if (value.length > 14) {
            newErrors[index] = 'Max 14 characters allowed';
        } else if (!/^[a-zA-Z]+$/.test(value)) {
            newErrors[index] = 'Only alphabetic characters allowed';
        } else if (newInputs.filter(input => input === value).length > 1) {
            newErrors[index] = 'Duplicate value found';
        } else {
            newErrors[index] = '';
        }

        setInputs(newInputs);
        setErrors(newErrors);
    };




    const handleSubmit = async () => {
        console.log(isFamily)
        const filledInputs = inputs.filter(input => input !== '');
        console.log(filledInputs.length)
        if (title === '' || title === undefined || title === null) {
            setTitleError(true)
            return
        } else {
            setTitleError(false)
        }
        if (description === '' || description === undefined || description === null) {
            setDescriptionError(true)
            return
        } else {
            setDescriptionError(false)
        }

        if (filledInputs.length < 10) {
            // alert('You must fill exactly 10 fields');
            setMainError('You must fill exactly 10 fields');
            return
        } else if (errors.some(error => error !== '')) {
            setMainError('Please fix the validation errors');
            return
        } else {
            setMainError('')
        }
        if (isFamily === null) {
            setRadioError(true)
            return
        }

        const valData = {
            'words_list': JSON.stringify(filledInputs),
            'title': title,
            'description': description
        }
        {
            const res = await APIClient.createGame(
                valData
                )
                console.log(res)
            // if(res.status === 201){
                console.log("save")
                // navigate('/maker/'+res.game_id)
                setgame_res(res)
                setTimeout(() => {
                    
                    setshow(true)
                }, 2000);
            // }
        }
    };

    return (
        <>
        
        {
            show ? 
            <>
            {
                game_res !== null ?
                <MakerPuzzle id={game_res?.game_id} /> : <></>  
            }
            </>
  :      
        <div className='mt-5'>
            <h5 className='fw-bold text-main'>Title</h5>
            <input type="text" className='form-control rounded-0' value={title} onChange={(e) => {
                const valTItle = e.target.value;
                if (valTItle === '' || valTItle === undefined || valTItle === null) {
                    setTitleError(true)
                } else {
                    setTitleError(false)
                }
                settitle(e.target.value)
            }} />
            {
                titleError ?
                    <p className='bg-danger text-white p-1 w-100'>Title is required</p>
                    : <></>
            }
            <h5 className='fw-bold mt-3 text-main'>Description</h5>
            <textarea name="desc" id="desc" rows="3" className='form-control rounded-0' value={description} onChange={(e) => {
                const valDesc = e.target.value;
                if (valDesc === '' || valDesc === undefined || valDesc === null) {
                    setDescriptionError(true)
                } else {
                    setDescriptionError(false)
                }
                setdescription(e.target.value)

            }}></textarea>
            {
                descriptionError ?
                    <p className='bg-danger text-white p-1 w-100'>Description is required</p>
                    : <></>
            }


            <h5 className='fw-bold mt-3 text-main'>Word List</h5>
            <p>Between 10 and 32 words. Puzzles are randomly generated using a selection of your words at play time.</p>
            <div className="row g-0">
                {inputs.map((value, index) => (
                    <div key={index} className='col-lg-3 col-md-3 col-sm-6 col-12'>
                        <input
                            type="text"
                            value={value}
                            className='form-control rounded-0'
                            onChange={e => handleChange(index, e.target.value)}
                        />
                        {
                            errors[index] !== '' && errors[index] !== null && errors[index] !== undefined ?
                                <p className='bg-danger text-white p-1 w-100'>{errors[index]}</p>
                                : <></>
                        }
                    </div>
                ))}
                {
                    mainError !== '' && mainError !== undefined && mainError !== null ?
                        <p className='col-12 bg-danger text-white p-1 w-100'>{mainError}</p>
                        : <></>
                }
            </div>
            <h5 className='fw-bold text-main mt-3'>Subject</h5>
            <div className='d-flex  '>
                <div className="form-check mt-2">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={isFamily === null ? false : isFamily} onChange={() => {
                        setIsFamily(true)
                        setRadioError(false)
                    }} />
                    <label className="form-check-label" htmlFor='flexRadioDefault1'>
                        Myself, family, friends etc
                    </label>
                </div>
                <div className="form-check ms-lg-3 ms-md-3 mt-2">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={isFamily === null ? false : !isFamily} onChange={() => {
                        setIsFamily(false)
                        setRadioError(false)
                    }} />
                    <label className="form-check-label" htmlFor='flexRadioDefault2'>
                        Non-Personal (recommended)
                    </label>
                </div>

            </div>
            {
                radioError ?
                    <p className='col-12 bg-danger text-white p-1 '>Please select a subject</p>
                    : <></>
            }
            <button style={{ backgroundColor: '#FFC107' }} className='w-100 p-3 border-0 btn fs-4 fw-bold mt-3 rounded-0' onClick={handleSubmit}>Submit</button>


            <div className='bg-main py-4 px-3' style={{ marginTop: '100px' }}>
                <h5 className='fw-bold' style={{ color: '#FFC107' }}>Instructions</h5>
                <ul className='text-white'>
                    <li>To create a word search puzzle you must supply a word list of at least 10 words.</li>
                    <li>The word list should be based on a single theme or topic. For example a television show or a movie you enjoy.</li>
                    <li>Words can only contain the letters a-z and a maximum of two spaces or dashes. Spaces and dashes will be removed when words are added to the word search grid.</li>
                    <li>Words can have a maximum length of 14 letters</li>
                    <li>All puzzles created will remain on the site for at least 30 days, but the very best puzzles may be permanently added to our collection.</li>
                    <li>Do not include any personally identifiable information in your puzzles</li>
                </ul>

            </div>
        </div> }
        </>
    )
}
