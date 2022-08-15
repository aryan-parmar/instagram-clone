import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import url from '../url.json'
export default function PostDisplayProfile(props) {
    let [mouse, setMouse] = React.useState(false);
    let post = props.post;
    let server = url.server;
    let Like = 12;
    function mouseOn(){
        setMouse(true);
    }
    function mouseOut(){
        setMouse(false);
    }
    return (
        <Link style={{ width: "100%", height: "100%", position: "relative",borderRadius: "10px" }} to={"/post/"+post._id}>
            <Image src={server+post.PostImage} alt="Post"/>
            <Data mouse={mouse} onMouseEnter={mouseOn} onMouseLeave={mouseOut}>
                <span><img src="/heart.png" alt=""/>{post.Likes}</span>
            </Data>
        </Link>
    )
}
let Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    `
let Data = styled.div`
    position: absolute;
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
    height: 100%;
    width: 100%;
    top: 0;
    opacity: 0;
    ${props => props.mouse && css`background-color: rgba(0,0,0,0.1); opacity: 1;`};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    span{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 600;
        pointer-events: none;
        user-select: none;
    }
    img{
        width: 6%;
        margin-right: 4px;
    }
`