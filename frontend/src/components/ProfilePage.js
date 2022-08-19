import React from 'react'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PostDisplayOverlay from './PostDisplayOverlay'
import PostDisplayProfile from './PostDisplayProfile'
import apiPost, { apiCheckLogin } from '../functions/basic'
import url from '../url.json'
import Loading from './Loading'
export default function ProfilePage() {
    let { profileName } = useParams()
    let [User, setUser] = React.useState(null)
    let [data, setData] = React.useState(null)
    let [action, setAction] = React.useState(null)
    let server = url.server
    let navigate = useNavigate();
    React.useEffect(() => {
        // apiCheckLogin(setUser)
        if (!action) {
            apiPost("post/getprofile", { profileName }, setData)
        }
        else if (action && !action['err']) {
            apiPost("post/getprofile", { profileName }, setData)
        }
    }, [profileName, action])
    // React.useEffect(() => {
    //     if (User) {
    //         if (User['err'] === "A token is required for authentication" || User['err'] === "Invalid Token") {
    //             // navigate('/login')
    //         }
    //         // else console.info("error:"+User.err)
    //     }
    // },[User])

    React.useEffect(() => {
        if (data) {
            if (data['err'] === "Profile Not Found") {
                navigate('/')
            }
            else {

            }
        }
    })
    function profileAction() {
        if (data.data.RUser) {
            if (data.data.Username !== data.data.RUser){
                if (data.data.RUserInFollower) {
                    apiPost("profile/unfollow", { profileName }, setAction)
                }
                else {
                    apiPost("profile/follow", { profileName }, setAction)
                }
            }else{
                navigate('/account/edit')
            }
        }
        else {
            navigate('/login')
        }
    }
    return (
        <>
            {
                data && !data.err ?
                    <Container>
                        <div className='details'>
                            <ProfileImage src={server + data.data.ProfilePicture} />
                            <h1 className='username'>{data.data.Username}</h1>
                            <div className='data'>
                                <h4><span>{data.data.PostCount}</span> posts</h4>
                                <Link to="/" style={{ textDecoration: 'none' }}><h4><span>{data.data.Follower}</span> followers</h4></Link>
                                <Link to="/" style={{ textDecoration: 'none' }}><h4><span>{data.data.Following}</span> following</h4></Link>
                            </div>
                            <ProfileData>
                                <h3>{data.data.FullName}</h3>
                                <pre>
                                    {data.data.Bio}
                                </pre>
                            </ProfileData>
                            <div className='profile-action'>
                                <button onClick={profileAction}>
                                    {
                                        data.data.RUser ?
                                            <>
                                                {
                                                    data.data.Username === data.data.RUser ? "Edit Profile" :
                                                        <>
                                                            {!data.data.RUserInFollower ?
                                                                <>
                                                                    {data.data.RUserInPending ? "Requested" : "Follow"}
                                                                </>
                                                                :
                                                                "Unfollow"
                                                            }
                                                        </>
                                                }
                                            </>
                                            : "Sign up to follow"
                                    }

                                </button>
                            </div>
                        </div>
                        <div className="buttons">
                            <button>POSTS</button>
                            <button>REELS</button>
                        </div>
                        <div className="posts">
                            {data.data.Posts.length === 0 ?
                                <div className='empty-post-container'>
                                    <h1>
                                        {!data.data.Rejected ? <>{data.data.Username === data.data.RUser ? "NO POSTS ADD NEW POSTS" : "NO POSTS"}</> :
                                            "PRIVATE ACCOUNT"
                                        }
                                    </h1>
                                </div>
                                : <>
                                    {data.data.Posts.map((post, index) => (
                                        <PostDisplayProfile key={index} post={post} />
                                    ))}
                                </>
                            }
                        </div>
                        <footer></footer>
                    </Container>

                    : <Loading />
            }
        </>
    )
}
let Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    /* margin-top: 20px; */
    overflow-y: scroll;
    @media (min-width: 425px){
        width: 100%;
        /* justify-content: center; */
        height: 100%;
        padding-top: 3px;
    }
    @media (min-width: 768px){
        padding-top: 0px;
    }
    .empty-post-container{
        width: 100%;
        height: 40vh;
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: 1 / span 3;
        h1{
            font-weight: normal;
            font-size: 1.5em;
        }
    }
    .details{
        width: 90%;
        display: grid;
        grid-template-columns: 85px auto;
        grid-template-rows: 85px auto;
        align-items: center;
        column-gap: 30px;
        row-gap: 10px;
        margin-bottom: 0;
        margin-top: 10px;
        @media (min-width: 425px){
            width: 70%
        }
        @media (min-width: 768px){
            margin-bottom: 40px;
            margin-top: 0px;
            /* max-width: 70%; */
            row-gap: 0px;
            width: 60%;
            display: grid;
            grid-template-columns: 150px auto auto;
            grid-template-rows: auto auto auto;
            column-gap: 80px;
        }
        .profile-action{
            display: flex;
            justify-content: center;
            align-items: center;
            grid-column: 1 / span 2;
            button{
                width: 100%;
                padding: 10px 0px;
                margin-bottom: 20px;
                border-radius: 10px;
                border: none;
                outline: none;
                font-weight: bold;
            }
            @media (min-width: 768px){
                grid-column: 3;
                grid-row: 1;
                button{
                    margin-bottom: 0px;
                    padding: 5px 0px;
                    margin-top: 10px;
                }
            }
        }
        .username{
            margin:0;
            font-weight: 300;
            font-size: 28px;
            color: #262626;
            /* grid-column: 2;
            grid-row: 1; */
            display: none;
            @media (min-width: 768px){
                display: block;
                grid-column: 2;
                grid-row: 1;
            }
        }
        .data{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            grid-column: 2;
            grid-row: 1;
            @media (min-width: 768px){
                grid-column: 2 / span 3;
                grid-row: 2;
                width: 70%;
            }
            h4{
                font-weight: 400;
                font-size: 16px;
                color: #262626;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                @media (min-width: 425px){
                    display: flex;
                }
                span{
                    font-weight: bold;
                }
            }
        }
    }
    .buttons{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 100%;
        border-top: 1px solid rgb(211, 211, 211);
        @media (min-width: 425px){
            width: 70%;
        }
        button{
            height: 52px;
            border: none;
            background-color: transparent;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 1px;
            color: #8e8e8e;
            font-family: inherit;
            cursor: pointer;
        }
        button:first-child{
            color: #262626;
            margin-right: 15px;
            border-top: 1px solid grey;
        }
    }
    .posts{
        width: 98%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: repeat(auto-fill, 120px);
        gap: 1%;
        height: 400px;
        @media (min-width: 425px){
            grid-template-rows: repeat(auto-fill, 120px);
            width: 70%;
            gap: 10px;
        }
        @media (min-width: 768px){
            grid-template-rows: repeat(auto-fill, 200px);
            width: 70%;
            gap: 10px;
        }
    }
    footer{
        margin: 50px 0;
        color: #8e8e8e;
        font-size: 12px;
        font-weight: 400;
    }
`
let ProfileImage = styled.img`
    height: 85px;
    width: 85px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
    @media (min-width: 425px){
    }
    grid-column: 1;
    grid-row: 1;
    @media (min-width: 768px){
        width: 150px;
        height: 150px;
        grid-column: 1;
        grid-row: 1 / span 3;
    }
    
`
let ProfileData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    grid-column: 1 / span 2;
    grid-row: 2;
    @media (min-width: 768px){
        grid-column: 2 / span 3;
        grid-row: 3;
        width: max-content;
    }
    h3{
        margin: 0;
        font-weight: 600;
        color: #262626;
        font-size: 14px;
        margin-bottom: 1px;
        @media (min-width: 768px){
            font-size: 16px;
        } 
    }
    pre{
        font-size: 14px;
        margin-top: 0;
        font-weight: 400;
        color: #262626;
        word-wrap: break-word;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        line-height: 1.5;
        @media (min-width: 768px){
            font-size: inherit;
        } 
    }
`