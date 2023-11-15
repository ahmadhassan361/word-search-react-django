import React, { useEffect, useState, Fragment, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import APIClient from '../service/APIClient'
import { Unity, useUnityContext } from "react-unity-webgl";
import { useRef } from 'react';

export const Playgame = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // useEffect(() => {
    //   const handleResize = () => {
    //     setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    //   };
  
    //   // Initial check on component mount
    //   handleResize();
  
    //   // Listen for resize events
    //   window.addEventListener('resize', handleResize);
  
    //   // Clean up event listener on component unmount
    //   return () => {
    //     window.removeEventListener('resize', handleResize);
    //   };
    // }, []);
  
  
    useEffect(() => {
      console.log(isMobile)
    }, [isMobile])
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [game, setGame] = useState(null)
    const [wordList, setwordList] = useState([])

  
    const fetchGame = async () => {
        const res = await APIClient.getGameByGameId(id)
        setGame(res)
        setLoading(false)
        console.log(res)
        const wordsLists = res?.words_list.replace(/'/g, "\"").split(',');
        setwordList(wordsLists)
    }
    
    const { unityProvider, sendMessage, addEventListener, removeEventListener } =
        // useUnityContext({
        //     loaderUrl: LOADER,
        //     dataUrl: BUILD_DATA,
        //     frameworkUrl: FRAMEWORK,
        //     codeUrl: WASM,
        // });
        useUnityContext({
            loaderUrl: "/static/media/build/build.loader.js",
            dataUrl: "/static/media/build/build.data.unityweb",
            frameworkUrl: "/static/media/build/build.framework.js.unityweb",
            codeUrl: "/static/media/build/build.wasm.unityweb",
        });
        const getparam = () => {

            // Define the behavior of getparam here
            console.log("calling get Param")
            console.log("wordlist print by muneeb**", wordList)
            const { protocol, hostname, port } = window.location;
        const url = `${protocol}//${hostname}${port ? `:${port}` : ''}/`;
            sendMessage("GameData","SetData",JSON.stringify({
                columns: 14,
                rows: 12,
                words: wordList,
                homeUrl: url,
                isMobileVersion: isMobile,
                width: window.innerWidth,
                height: window.innerHeight
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
    const divRef = useRef(null);

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
        <div className='my-5' ref={divRef}>
            <h1 style={{ fontSize: '42px' }} className='my-3'>{game?.title}</h1>
            {/* <div className="row">
                <div className="col-md-7 col-12" > */}

                    <div className=' text-start text-white'  style={{ height: 'auto' }}>
                        <Fragment>
                            {/* <Unity unityProvider={unityProvider}
                            style={{ width: isMobile? window.innerWidth:"850px", height: "600px" }}
                            devicePixelRatio={devicePixelRatio}
                            />                             */}
                            <Unity unityProvider={unityProvider}
                            style={{ width: isMobile? divRef?.current?.offsetWidth:"850px", height: "600px" }}
                            devicePixelRatio={devicePixelRatio}
                            />                            
                        </Fragment>
                    </div>
                {/* </div>
                <div className="col-md-5"></div>
            </div> */}
            
            <button className='btn btn-warning rounded-0 fw-bold fs-5 px-5' onClick={()=>navigate(`/puzzle/${game?.game_id}/download`)} style={{ borderLeft: '6px solid #000' }}>download</button>

            <h1 style={{ fontSize: '30px' }} className='mt-5 text-decoration-underline'>Description</h1>
            <h6>{game?.description}</h6>
        </div>
    )
}
