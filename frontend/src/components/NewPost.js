import React from 'react'
import styled from 'styled-components'
import { css } from 'styled-components'
export default function NewPost(props) {
    let show = props.show;
    let [buttonD, setButtonD] = React.useState(false);
    let [File, setFile] = React.useState(null);
    let [value, setValue] = React.useState('')
    let [showPart, setShowPart] = React.useState(false);
    let [showEmoji, setShowEmoji] = React.useState(false)
    let [len, setLen] = React.useState(0)
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            console.log(file);
            setFile(file);
            setShowPart(true);
        }
    };
    function changeHandler(e) {
        let val = e.target.value
        if (val.length <= 2200) {
            setValue(val)
        }
        setLen(val.length)
    }
    function openEmojiBox() {
        if (showEmoji) {
            setShowEmoji(false)
        }
        else {
            setShowEmoji(true)
        }
    }
    function addEmoji(e) {
        let emoji = e.target.innerText
        setValue(previous => previous + emoji)
        setButtonD(true)
    }
    return (
        <Wrapper>
            <Container show={showPart}>
                <Header>
                    {File ? 
                    <button>
                        <svg color="#262626" fill="#262626" height="24" viewBox="0 0 24 24" width="24">
                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004">
                            </line>
                            <polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            </polyline>
                        </svg>
                    </button>
                    : null}
                    <h4>Create new post</h4>
                    {File ? 
                    <button>Share</button>
                : null}
                </Header>
                <Form onDragEnter={handleDrag} onDrop={handleDrop} onDragOver={handleDrag}>
                    <FormContainer show={showPart}>
                        {
                            File ? <img src={URL.createObjectURL(File)} alt="" /> :
                                <>
                                    <svg color="#262626" fill="#262626" height="77" viewBox="0 0 97.6 77.3" width="96">
                                        <path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor">
                                        </path>
                                    </svg>
                                    <h3>Drag photos and videos here</h3>
                                    <label>
                                        Select image
                                        <Input type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange={(e)=> {setFile(e.target.files[0]); setShowPart(true);}}/>
                                    </label>
                                </>
                        }
                    </FormContainer>
                    {
                        showPart ?
                            <FormContainer2>
                                <div className='profile-dat'>
                                    <img className='profile' src="/user.jpg"></img>
                                    <h4>aryan</h4>
                                </div>
                                <div className='post-dat'>
                                    <textarea placeholder='Write a caption....' className='caption' onChange={changeHandler} value={value}></textarea>
                                    <CommentSection>
                                        <Svg aria-label="Emoji" fill="#262626" height="24" viewBox="0 0 48 48" width="24" onClick={openEmojiBox}>
                                            <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
                                        </Svg>
                                        <Emoji show={showEmoji} id="emoji">
                                            <span onClick={addEmoji}>😂</span>
                                            <span onClick={addEmoji}>😭</span>
                                            <span onClick={addEmoji}>😎</span>
                                            <span onClick={addEmoji}>🤯</span>
                                            <span onClick={addEmoji}>😤</span>
                                            <span onClick={addEmoji}>😞</span>
                                            <span onClick={addEmoji}>😖</span>
                                            <span onClick={addEmoji}>🙁</span>
                                            <span onClick={addEmoji}>😲</span>
                                            <span onClick={addEmoji}>🙃</span>
                                            <span onClick={addEmoji}>😕</span>
                                            <span onClick={addEmoji}>😔</span>
                                            <span onClick={addEmoji}>😓</span>
                                            <span onClick={addEmoji}>😒</span>
                                            <span onClick={addEmoji}>🤤</span>
                                            <span onClick={addEmoji}>😝</span>
                                            <span onClick={addEmoji}>😜</span>
                                            <span onClick={addEmoji}>😛</span>
                                            <span onClick={addEmoji}>😌</span>
                                            <span onClick={addEmoji}>😴</span>
                                            <span onClick={addEmoji}>😁</span>
                                            <span onClick={addEmoji}>🥱</span>
                                            <span onClick={addEmoji}>😫</span>
                                            <span onClick={addEmoji}>😯</span>
                                            <span onClick={addEmoji}>🤐</span>
                                            <span onClick={addEmoji}>😮</span>
                                            <span onClick={addEmoji}>😥</span>
                                            <span onClick={addEmoji}>😣</span>
                                            <span onClick={addEmoji}>🤩</span>
                                            <span onClick={addEmoji}>🤔</span>
                                            <span onClick={addEmoji}>🤨</span>
                                            <span onClick={addEmoji}>😐</span>
                                            <span onClick={addEmoji}>😑</span>
                                            <span onClick={addEmoji}>😶</span>
                                            <span onClick={addEmoji}>🙄</span>
                                            <span onClick={addEmoji}>😏</span>
                                            <span onClick={addEmoji}>👌</span>
                                            <span onClick={addEmoji}>⚡</span>
                                            <span onClick={addEmoji}>♥</span>
                                            <span onClick={addEmoji}>👄</span>
                                            <span onClick={addEmoji}>🤑</span>
                                            <span onClick={addEmoji}>😈</span>
                                            <span onClick={addEmoji}>💪</span>
                                            <span onClick={addEmoji}>🤭</span>
                                            <span onClick={addEmoji}>💝</span>
                                            <span onClick={addEmoji}>💕</span>
                                            <span onClick={addEmoji}>🖤</span>
                                            <span onClick={addEmoji}>❣</span>
                                            <span onClick={addEmoji}>💛</span>
                                        </Emoji>
                                        <h6>{len}/2,200</h6>
                                    </CommentSection>
                                </div>
                            </FormContainer2>
                            : null
                    }
                </Form>
            </Container>
        </Wrapper>
    )
}
let FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${props => props.show ? "#262626" : "white"};
    border-bottom-left-radius : 10px;
    h3{
        font-weight: normal;
    }
    label{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: rgb(0, 122, 255);
        padding : 0.3rem 1rem;
        border-radius: 10px;
        margin: 0;
        text-align: center;
        cursor: pointer;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-bottom-left-radius: 10px;
    }
`
const Svg = styled.svg`
    cursor: pointer;
    margin-left: 10px;
    position: relative;
    ${props => props.liked && css`
        stroke-width: 0rem;
        fill: red;
    `}
`
const CommentSection = styled.section`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    margin-bottom: 18px;
    position: relative;
    h6{
        margin: 0;
        color: #262626;
        opacity: 0.5;
        margin-right: 10px;
    }
`
const Emoji = styled.div`
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap: 5px;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: max-content;
    height: 0px;
    opacity: 0;
    span{
        text-align: center;
        cursor: pointer;
        user-select: none;
        --webkit-tap-highlight-color: transparent;
        opacity: 0;
        pointer-events: none;
    }
    ${props => props.show && css`
        height: 170px;
        opacity: 1;
        span{
            pointer-events: fill;
            opacity: 1;
        }
    `}
    overflow-y: scroll;
    font-size: 1.7rem;
    background-color: white;
    padding: 1%;
    top: -120px;
    transform: translate(0,-50%);
    overflow-y: scroll;
    -ms-overflow-style: none;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 grey;
    scrollbar-width: none;
    transition-duration: 0.3s;
    &::-webkit-scrollbar {
        display: none;
    }
    
`
let FormContainer2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 100%;
    .profile-dat{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        img{
            width: 35px;
            height:35px;
            object-fit: cover;
            border-radius: 50%;
            margin-left: 1rem;
        }
        h4{
            padding-left: 1rem;
        }
    }
    .post-dat{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        textarea{
            width: 90%;
            height: 100%;
            border:none;
            outline: none;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
            font-size: 1em;
            padding: 0 1;
            resize: none;
        }
    }
`
let Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 93%;
`
let Input = styled.input`
    display: none;
`
let Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    align-self: start;
    overflow: hidden;
`
let Container = styled.div`
    width: ${props => props.show ? "65%" : "35%"};
    height: 75%;
    background: white;
    border-radius: 10px;
`
let Header = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom: 1px solid rgb(211, 211, 211);
    justify-content: center;
    align-items: center;
    h4{
        margin: 0;
        font-size: 1rem;
        font-weight: 500;
        flex: 1;
        text-align: center;
    }
    button{
        margin: 0 10px;
        border: none;
        background: white;
        color: rgb(0, 122, 255);
        font-weight: bold;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`