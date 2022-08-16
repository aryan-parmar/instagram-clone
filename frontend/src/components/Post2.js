import React from 'react'
import { css, keyframes } from 'styled-components'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export default function Post2(props) {
    let [buttonD, setButtonD] = React.useState(false);
    let [value, setValue] = React.useState('')
    let [showEmoji, setShowEmoji] = React.useState(false)
    let [AnimationState, setAnimationState] = React.useState('paused')
    let [likedState, setLikedState] = React.useState(props.liked)
    let displayComment
    if (props.comments !== []) { displayComment = props.comments }
    else { displayComment = [] }
    function changeHandler(e) {
        let val = e.target.value
        setValue(val)
        if (val === '') {
            setButtonD(false)
        } else {
            setButtonD(true)
        }
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
    function like() {
        setAnimationState('running')
        setTimeout(() => {
            setAnimationState('paused')
        }, 1000);
        setLikedState(true)
    }
    function likeButton() {
        if (likedState) {
            setLikedState(false)
        } else {
            setLikedState(true)
        }
    }
    return (
        <>
            <PostCard animation={AnimationState}>
                <Head>
                    <H to={"/"+props.from}><Profile src={props.profile} /></H>
                    <H to={"/"+props.from}>{props.from}</H>
                </Head>
                <div className='img-root'>
                    <PostImg src={props.post} draggable={false} onDoubleClick={like} />
                </div>
                <Foot>
                    <div className='comment-section'>
                        <div className='caption-section'>
                            <div><span><H to={"/"+props.from}>{props.from}</H></span><p>{props.caption}</p></div>
                        </div>
                        {displayComment === [] ? 'No comments' : <>
                            {displayComment.map((comment, index) => (
                                <div key={index} className='container'><p><span><H to={"/"+comment.from}>{comment.from}</H></span>{comment.data}</p></div>
                            ))}
                        </>}
                    </div>
                    <div className='button-group'>
                        <LikeSvg aria-hidden="true" focusable="false" role="img" viewBox="0 0 640 500" liked={likedState} onClick={likeButton}>
                            <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                        </LikeSvg>
                        <svg aria-label="Comment" fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                            <path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path>
                        </svg>
                        <h4>{props.likes} likes</h4>
                    </div>

                    <CommentSection>
                        <Svg aria-label="Emoji" fill="#262626" height="24" viewBox="0 0 48 48" width="24" onClick={openEmojiBox}>
                            <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
                        </Svg>
                        <Emoji show={showEmoji} id="emoji" onMouseLeave={console.log('r')}>
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
                        <input type='text' placeholder='Add a comment...' onChange={changeHandler} value={value} />
                        <input type='submit' value='Post' disabled={!buttonD} />
                    </CommentSection>
                </Foot>
            </PostCard>
        </>
    )
}

const LikeHeartAnimation = keyframes` 
    0% { opacity:0; transform:scale(0); }
    15% { opacity:.9; transform:scale(1.2); }
    30% { transform:scale(.95); }
    45%,
    80% { opacity:.9; transform:scale(1); }
`
const PostCard = styled.div`
    display: grid;
    grid-template-rows: 55px auto 150px;
    grid-template-columns: auto;
    /* flex-direction: column; */
    width: 96%;
    height: max-content;
    gap: 10px ;
    @media (min-width: 768px) {
        width: 90%;
        margin-top: 100px;
        grid-template-rows: 55px auto 200px;
    }
    @media (min-width: 1024px) {
        margin-top: 0;
        width: 70%;
        grid-template-rows: 55px auto;
    }
    @media (min-width: 1200px) {
        width: 60%;
        grid-template-rows: 55px auto;
    }
    @media (min-width: 1600px) {
        width: 50%;
        grid-template-rows: 55px auto;
    }
    @media (min-width: 1800px) {
        width: 40%;
        grid-template-rows: 55px auto;
    }
    .img-root{
        position: relative;
        background-color: white;
        width: 100%;
        max-height: 450px;
        background-color: #262626;
        /* height: 100%; */
        min-height: 300px;
        grid-column: 1;
        grid-row: 2;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center
        &::after{
            content:'';
            width: 100%;
            height: 15%;
            top: 43%;
            left:0;
            background: url("/heart.png") no-repeat center/contain;
            opacity: 0;
            position: absolute;
            transform: scale(0);
            animation: ${LikeHeartAnimation} 1s ease-in-out infinite;
            z-index: 54;
            animation-play-state: ${props => props.animation};
        }
    }
`
const Head = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: white;
    border: 1px solid rgb(211, 211, 211);
    height: 55px;
    border-radius: 10px;
    grid-row: 1;
    grid-column: 1;
    `
const Profile = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 10px;
    `
const H = styled(Link)`
    font-weight: 600;
    color: #262626;
    font-size: 14px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        text-decoration: underline;
    }
`
const PostImg = styled.img`
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    min-height: 300px;
    z-index: 50;
`
const Foot = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    grid-column: 2;
    grid-row: 1 / span 2;
    align-items: center;
    flex-direction: column;
    background-color: white;
    border: 1px solid rgb(211, 211, 211);
    border-radius: 10px;
    height: 100%;
    @media (max-width: 768px) {
        grid-column: 1;
        grid-row: 3
        /* height: 50px; */
    }
    .button-group{
        margin-top: 10px;
        width: 100%;
        display: flex;
        order: 0;
        @media (min-width: 768px) {
            order: 1;
        }
        /* justify-content: center; */
        align-items: center;
        h4{
            
            margin: 0;
            font-size: 14px;
            margin-left: 13px;
            font-weight: 600;
            flex: 1;
            text-align: end;
            margin-right: 10px;
        }
    }
    .caption-section{
        align-self: flex-start;
        /* width: 70%; */
        /* margin-left: 13px; */
        margin-bottom: 2px;
        div{
            text-align: left;
            display: flex;
            align-items: stretch;
            p{
                font-size: 14px;
                margin: 0;
                font-weight: 400;
                color: #262626;
                word-wrap: break-word;
            }
            a{
                width: max-content;
                margin-right: 5px;
            }
        }
    }
    .comment-button{
        align-self: flex-start;
        margin-left: 13px;
        color: #8e8e8e;
        text-decoration: none;
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 2px;
    }
    .comment-section{
        order: 1;
        align-self: flex-start;
        width: 92%;
        margin-left: 13px;
        margin-top: 13px;
        /* flex: 1; */
        height: 25rem;
        overflow-y: auto;
        @media (min-width: 768px) {
            order: 0;
        }
        .container{
            margin: 20px 0;
            text-align: left;
            display: flex;
            p{
                font-size: 14px;
                margin: 0;
                font-weight: 400;
                color: #262626;
            }
            a{
                width: max-content;
                margin-right: 5px;
            }
        }
    }
`
const LikeSvg = styled.svg`
    height: 24px;
    stroke: black;
    stroke-width: 1.7rem;
    margin-left: 10px;
    fill: white;
    cursor: pointer;
    --webkit-tap-highlight-color: transparent;
    ${props => props.liked && css`
        stroke-width: 0rem;
        fill: red;
    `}
    path{
        transform: translate(10%);
    }
    margin-right: 10px;
`
const Svg = styled.svg`
    cursor: pointer;
    margin-left: 10px;
    position: relative;
    ${props => props.liked && css`
        stroke-width: 0rem;
        fill: red;
    `}
    display: none;
    @media (min-width: 768px) {
        display: block;
    }
`
const CommentSection = styled.section`
    order:2;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    margin-bottom: 15px;
    position: relative;
    input[type='text']{
        width: 80%;
        border: none;
        outline: none;
        color: #262626;
        font-size: 14px;
        margin-left: 10px;
    }
    input[type='submit']{
        background-color: transparent;
        border: none;
        color: #0095f6;
        font-weight: 600;
        margin-right: 10px;
        cursor: pointer;
    }
    input[type='submit']:disabled{
        background-color: transparent;
        border: none;
        color: #0095f6;
        font-weight: 600;
        margin-right: 10px;
        opacity: 0.5;
        cursor: default;
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