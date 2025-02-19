import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)

    const handleCardClick = (content) => {
        setInput(content)
    }

    return (
        <div className='main'>
            <div className="nav">
                <p>germini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult
                ?<>
                <div className="greet">
                    <p><span>Hello, Dev</span></p>
                    <p>How Can I help you today</p>
                </div>
                <div className="cards">
                    <div className="card" onClick={() => handleCardClick('Suggest Beautiful countries')}>
                        <p>Suggest Beautiful countries</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card" onClick={() => handleCardClick('Brainstorm maths ideas and concepts')}>
                        <p>Brainstorm maths ideas and concepts</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card" onClick={() => handleCardClick('Improve readability of the following text')}>
                        <p>Improve readability of the following text</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card" onClick={() => handleCardClick('Improve the readability of this code')}>
                        <p>Improve the readability of this code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                </div>
                </>
                :<div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading ?<div className='loader'><hr /> <hr />  <hr /> </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
                </div>
                
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e)=> setInput(e.target.value)} value={input} type="text" placeholder='Enter Prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                        {input? <img onClick={()=>onSent()}    src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <p className="bottom-info">
                            Gemini may display inaccurate info, including about people, so double-check its response. Your privacy and Gemini App.
                    </p>
                    
                </div>
            </div>
        </div>
    )
}

export default Main
