import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
export default function PostDisplayProfile() {
    let [mouse, setMouse] = React.useState(false);
    let Like = 12;
    let imageId = "kdoedkoed1234";
    function mouseOn(){
        setMouse(true);
    }
    function mouseOut(){
        setMouse(false);
    }
    return (
        <Link style={{ width: "100%", height: "100%", position: "relative",borderRadius: "10px" }} to="/post/mrfmigjirj">
            <Image src="/user.jpg" alt="Post"/>
            <Data mouse={mouse} onMouseEnter={mouseOn} onMouseLeave={mouseOut}>
                <span><img src="/heart.png" alt=""/>{Like}</span>
            </Data>
        </Link>
    )
}
let Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
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