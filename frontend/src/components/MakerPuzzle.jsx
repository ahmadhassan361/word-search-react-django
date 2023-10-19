import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import APIClient from '../service/APIClient'
import { MAIN_BASE_URL } from '../service/contants'

export const MakerPuzzle = ({ id }) => {

    // const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [game, setGame] = useState(null)
    const [wordList, setwordList] = useState([])
    const [baseURL, setBaseURL] = useState('');
    const [wordsMatrix, setWordsMatrix] = useState(null)
    const [wordLoc, setWordLoc] = useState([])
    const [mainWordLoc, setMainWordLoc] = useState([])
    useEffect(() => {
        const { protocol, hostname, port } = window.location;
        const url = `${protocol}//${hostname}${port ? `:${port}` : ''}/`;
        setBaseURL(url);
        fetchGame()

    }, []);
    const fetchGame = async () => {
        const res = await APIClient.getGameByGameId(id)
        setGame(res)
        setLoading(false)
        console.log(res)
        const wordsLists = JSON.parse(JSON.parse(res?.words_list.replace(/'/g, "\"").toUpperCase()));

        console.log(typeof (wordsLists))
        setwordList(wordsLists)
        const { matrix, wordLocations } = convertWordsToMatrix(wordsLists);
        console.log(matrix, wordLocations)
        setWordsMatrix(matrix)
        setWordLoc(wordLocations)
        // setTimeout(() => {
        runIt()

        // }, 3000);
    }
    // useEffect(() => {

    // }, [id])
    let isIncrease = true;
    // const [isIncrease, setIsIncrease] = useState(true)
    // const [index, setindex] = useState(0)
    let index = -1;
    useEffect(() => {
        let intervalId;
        if (wordLoc.length > 0) {
            // runIt()
            intervalId = setInterval(() => {

                setMainWordLoc(prev => [...prev, wordLoc[index]]);
                if (index + 1 >= wordLoc.length) {
                    setMainWordLoc([])
                    index = -1;
                }
                else {

                    index = index + 1;
                }

            }, 1300);
        }
        return () => {
            clearInterval(intervalId); // Clear the interval when component unmounts
        };
    }, [wordLoc])


    function runIt() {
        console.log("first", wordLoc.length)

        if (wordLoc.length > 0) {
            console.log("first")
            setInterval(() => {

                setMainWordLoc(prev => [...prev, wordLoc[index]]);
                if (index + 1 >= wordLoc.length) {
                    setMainWordLoc([])
                    index = -1;
                }
                else {

                    index = index + 1;
                }

            }, 1300);
        }
    }


    return (
        <div className='my-5'>
            {
                loading ?
                    <div className='w-100 d-flex justify-content-center py-5'>

                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <>
                        <h1 style={{ fontSize: '32px' }} className='mb-2'>Puzzle Updated</h1>
                        <h6 className='mt-5'>Play link</h6>
                        <input type="text" className='w-100' value={`${baseURL}puzzle/${game?.game_id}/`} readOnly />
                        <h6 className='mt-3'>Secret Edit link</h6>
                        <input type="text" className='w-100' value={`${baseURL}maker-edit/${game?.game_id}/${game?.key}`} readOnly />
                        <p style={{ fontSize: '13px' }}>⚠️ Keep the secret edit link somewhere safe and don't share it. You need it if you want to make changes to this puzzle.</p>

                        <div className="d-flex mt-5">
                            <button className='btn btn-warning rounded-0 fw-bold fs-5' style={{ borderLeft: '6px solid #000' }}>edit</button>
                            <button className='btn btn-warning rounded-0 fw-bold fs-5' style={{ borderLeft: '6px solid #000' }}>play</button>
                            <button className='btn btn-warning rounded-0 fw-bold fs-5' style={{ borderLeft: '6px solid #000' }}>delete</button>
                            <button className='btn btn-warning rounded-0 fw-bold fs-5' style={{ borderLeft: '6px solid #000' }}>download</button>
                        </div>
                        <div className="row mt-1 g-0">
                            <div className="col-md-8 bg-white border border-dark border-3 p-3 col-12">
                                <h1 style={{ fontSize: '42px' }} className='mb-2'>{game?.title}</h1>
                                {/* {
                                wordsMatrix !== null?
                                <Grid matrix={wordsMatrix} />
                                : <></>
                            } */}
                                <div className="row mt-2">

                                    {
                                        wordsMatrix !== null ?
                                            <>
                                                <div className=' col-12 col-sm-12 col-md-9 col-lg-9'>

                                                    <HighlightedGrid wordLocations={mainWordLoc} matrix={wordsMatrix} />
                                                </div>
                                                <div className="col-12 col-sm-12 col-lg-3 col-md-3 d-lg-block d-md-block ">
                                                    {/* {

                                                        wordLoc.map((e, i) => {
                                                            let throug_line = true;
                                                            if (mainWordLoc.length >= i) {
                                                                e.word === mainWordLoc[i]?.word ? throug_line = false : throug_line = true
                                                            }
                                                            return <h5 className={`${throug_line ? 'text-decoration-line-through' : ''}`} key={e.word} style={{ color: e.color }}>{e.word}</h5>
                                                        })
                                                    } */}
                                                    <div className="row">
                                                        {
                                                            wordLoc.map((e, i) => {
                                                                let throug_line = true;
                                                                if (mainWordLoc.length >= i) {
                                                                    e.word === mainWordLoc[i]?.word ? throug_line = false : throug_line = true
                                                                }
                                                                return (
                                                                    <div className="col-auto col-md-12" key={e.word}>
                                                                        <h5 className={`${throug_line ? 'text-decoration-line-through' : ''}`} style={{ color: e.color, display: 'inline-block' }}>
                                                                            {e.word}
                                                                        </h5>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                </div>
                                            </>
                                            : <></>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className=" w-100 px-3 py-3 mt-2 text-secondary" style={{ backgroundColor: '#f3f3f3' }} >
                            <h4 className='mb-3'>Notes</h4>
                            <h6 className='mb-3'>The above is just a sample</h6>
                            <h6 className='mb-3'>Everytime the puzzle is played online, the player will see a random grid of letters containing a selection of words from the list you supplied. (as not all words fit in every grid)</h6>
                            <h6>Images for printing are generated online only once, if you wish to be sure that all of your words appear in the printable puzzle images, then don't add more than 14-16 words to your puzzle. The more words you add, the less likely they'll all fit in the generated puzzle images.</h6>

                        </div>
                    </>
            } </div>
    )
    function HighlightedGrid({ matrix, wordLocations }) {

        return (
            // <div class="table-responsive">

                <table className="table-bordered border-dark">
                    <tbody>
                        {matrix.map((row, rowIndex) => {
                            return <tr key={rowIndex}>
                                {row.map((cell, colIndex) => {
                                    // const isHighlighted = wordLocations.some(word => (
                                    //   word.indexes.some(coord => coord[0] === rowIndex && coord[1] === colIndex)
                                    // ));
                                    let highlightedColor = null;

                                    wordLocations.forEach(word => {
                                        if (word.indexes.some(coord => coord[0] === rowIndex && coord[1] === colIndex)) {
                                            highlightedColor = word.color;
                                        }
                                    });
                                    return (
                                        <td
                                            key={`${colIndex}${cell}`}
                                            className={`py-xl-2 text-center  `} style={{ backgroundColor: `${highlightedColor !== null ? highlightedColor : 'transparent'}` }}>
                                            {cell}
                                        </td>
                                    );
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            // </div>
        );
    }
}
function Grid({ matrix }) {

    return (
        <table>
            <tbody>
                {matrix.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex}>{cell || ' '}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}



function convertWordsToMatrix(wordlist) {
    const matrix = Array(14).fill(null).map(() => Array(14).fill(null));
    const wordLocations = [];

    function fillRandomAlphabets() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 14; i++) {
            for (let j = 0; j < 14; j++) {
                if (matrix[i][j] === null) {
                    matrix[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
                }
            }
        }
    }


    function placeWord(word) {
        for (let attempt = 0; attempt < 10; attempt++) {
            const orientation = Math.floor(Math.random() * 4); // 0 for horizontal, 1 for vertical, 2 for diagonal top-left to bottom-right, 3 for diagonal top-right to bottom-left
            const startX = Math.floor(Math.random() * 14);
            const startY = Math.floor(Math.random() * 14);

            let isValid = true;
            const wordCoords = [];

            for (let i = 0; i < word.length; i++) {
                let currentX = startX;
                let currentY = startY;

                if (orientation === 0) {
                    currentX += i;
                } else if (orientation === 1) {
                    currentY += i;
                } else if (orientation === 2) {
                    currentX += i;
                    currentY += i;
                } else if (orientation === 3) {
                    currentX -= i;
                    currentY += i;
                }

                if (
                    currentX >= 14 ||
                    currentY >= 14 ||
                    currentX < 0 ||
                    currentY < 0 ||
                    (matrix[currentY][currentX] !== null && matrix[currentY][currentX] !== word[i])
                ) {
                    isValid = false;
                    break;
                }

                matrix[currentY][currentX] = word[i];
                wordCoords.push([currentY, currentX]);
            }

            if (isValid) {
                const color = getRandomColor()
                wordLocations.push({ word, indexes: wordCoords, color });
                return true;
            }
        }

        return false; // Could not place the word after multiple attempts
    }

    for (const word of wordlist) {
        let wordPlaced = false;
        for (let retry = 0; retry < 5; retry++) { // You can adjust the number of retries here
            wordPlaced = placeWord(word.replace(/\s/g, ''));
            if (wordPlaced) {
                break;
            }
        }
        if (!wordPlaced) {
            // Skip the word or handle it as needed
            console.log(`Could not place the word "${word}" after multiple attempts.`);
        }
    }

    fillRandomAlphabets();

    return { matrix, wordLocations };
}
function getRandomColor() {
    const red = Math.floor(Math.random() * 128) + 125; // Red component between 128 and 255
    const green = Math.floor(Math.random() * 128) + 128; // Green component between 128 and 255
    const blue = Math.floor(Math.random() * 128) + 128; // Blue component between 128 and 255

    const randomColor = `rgb(${red}, ${green}, ${blue})`;
    return randomColor;
}
