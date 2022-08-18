import React from 'react'
import styled from 'styled-components'
import apiPost from '../functions/basic'
import url from '../url.json'

export default function NBox(props) {
    let req = props.req
    let user = props.user
    let [a,setA] = React.useState(null)
    let [c,setC] = React.useState(null)
    let server = url.server
    let [show,setShow] = React.useState(false)
    let [b,setB] = React.useState(req.Follower.includes(user))
    function accept(id) {
        apiPost('profile/confirmFriend', {id}, setA)
    }
    function reject(id) {
        apiPost('profile/rejectFriend', {id}, setA)
    }
    React.useEffect(()=>{
        if(a && !a['err']){
            setShow(true)
        }
    },[a])
    return (
        <NotificationContainer>
            <img src={server + req.ProfilePicture}></img>
            <div className='data'>
                <h4>{req.Username}</h4>
                <h5>has requested to follow you</h5>
            </div>
            <div className='action'>
                {!show?
                <>
                <button className='positive' onClick={() => accept(req._id)}>Confirm</button>
                <button onClick={() => reject(req._id)}>Delete</button>
                </>    
            :    
            <>{b ?
                <button onClick={() => {apiPost("profile/unfollow", { profileName:req.Username }, setC); setB(!b)}}>{
                    c ? <>{c.status}</>
                    : "Unfollow" 
                }</button>
                : 
                <button className='positive' onClick={() => {apiPost("profile/follow", { profileName:req.Username }, setC); setB(!b)}}>Follow Back</button>
            }</>
        }
            </div>
        </NotificationContainer>
    )
}
let NotificationContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(211, 211, 211);
    border-radius: 10px;
    margin-top:10px;
    img{
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
        margin: 5px 10px;
    }
    .data{
        flex:1;
        display:flex;
        align-item:flex-start;
        justify-content:center;
        flex-direction: column;
        h4{
            margin:0px 0;
            margin-top: 5px;
            @media(min-width:425px){
                margin:5px 0;
            }
        }
        h5{
            margin:5px 0;
            margin-top:0;
            font-weight:normal;
        }
    }
    .action{
        margin-right: 10px;
        display:flex;
        align-items: center;
        justify-content: space-between;
        button{
            border:none;
            outline:none;
            font-weight:bold;
            margin: 0 5px;
            padding:6px 15px;
            border-radius:10px;
        }
        .positive{
            background: #0095f6;
            color:white;
        }
    }
`