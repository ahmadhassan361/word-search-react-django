import React, { useEffect, useState, Fragment, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import APIClient from '../service/APIClient'
import { Unity, useUnityContext } from "react-unity-webgl";

export const Playgame = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [game, setGame] = useState(null)
    const [wordList, setwordList] = useState([])
    
    const fetchGame = async () => {
        const res = await APIClient.getGameByGameId(id)
        setGame(res)
        setLoading(false)
        console.log(res)
        const wordsLists = JSON.parse(res?.words_list.replace(/'/g, "\""));
        setwordList(JSON.parse(wordsLists))
    }
    
    const { unityProvider, sendMessage, addEventListener, removeEventListener } =
        useUnityContext({
            loaderUrl: "/build/word-puzzle.loader.js",
            dataUrl: "/build/webgl.data",
            frameworkUrl: "/build/build.framework.js",
            codeUrl: "/build/build.wasm",
        });
        const getparam = () => {
            // Define the behavior of getparam here
            console.log("calling get Param")
            sendMessage("GameData","SetData",JSON.stringify({
                columns: 14,
                rows: 12,
                words: wordList,
                homeUrl: "https://google.com"
            }))
          }
          
        window.getparam = getparam;
    const handleGameOver = useCallback(() => {
        console.log("object")
    }, []);

    useEffect(() => {
        addEventListener("getparam", handleGameOver);
        return () => {
            removeEventListener("getparam", handleGameOver);
        };
    }, [addEventListener, removeEventListener, handleGameOver]);

    useEffect(() => {

        fetchGame()

    }, [id])
    const [devicePixelRatio, setDevicePixelRatio] = useState(
        window.devicePixelRatio
      );
      useEffect(
        function () {
          // A function which will update the device pixel ratio of the Unity
          // Application to match the device pixel ratio of the browser.
          const updateDevicePixelRatio = function () {
            setDevicePixelRatio(window.devicePixelRatio);
          };
          // A media matcher which watches for changes in the device pixel ratio.
          const mediaMatcher = window.matchMedia(
            `screen and (resolution: ${devicePixelRatio}dppx)`
          );
          // Adding an event listener to the media matcher which will update the
          // device pixel ratio of the Unity Application when the device pixel
          // ratio changes.
          mediaMatcher.addEventListener("change", updateDevicePixelRatio);
          return function () {
            // Removing the event listener when the component unmounts.
            mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
          };
        },
        [devicePixelRatio]
      );
    return (
        <div className='my-5'>
            <h1 style={{ fontSize: '32px' }} className='m-0'>{game?.title}</h1>
            {/* <div className="row">
                <div className="col-md-7 col-12" > */}

                    <div className='bg-secondary text-center text-white' style={{ height: 'auto' }}>
                        <Fragment>
                            <Unity unityProvider={unityProvider}
                            // style={{ width: "400px", height: "400px" }}
                            devicePixelRatio={devicePixelRatio}
                            />                            
                        </Fragment>
                    </div>
                {/* </div>
                <div className="col-md-5"></div>
            </div> */}




        </div>
    )
}
