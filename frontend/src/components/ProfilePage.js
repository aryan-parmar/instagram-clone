import React from 'react'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import PostDisplayOverlay from './PostDisplayOverlay'
import PostDisplayProfile from './PostDisplayProfile'
import apiPost, { apiCheckLogin } from '../functions/basic'
import url from '../url.json'
export default function ProfilePage() {
    let { profileName } = useParams()
    let { selectedId, setSelected } = React.useState(" ")
    let [User, setUser] = React.useState(null)
    let [data, setData] = React.useState(null)
    let server = url.server
    let navigate = useNavigate();
    React.useEffect(() => {
        // apiCheckLogin(setUser)
        apiPost("post/getprofile", { profileName }, setData)
    }, [])
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
            if (data['err']==="Profile Not Found") {
                navigate('/')
            }
            else {
                console.log(data)
            }
        }
    })
    // document.body.style.overflow = "hidden"
    return (
        <>
            {
                data && !data.err ?
                    <div style={{ position: "relative", overflow: " hidden" }}>
                        {/* <PostDisplayOverlay selectedId={selectedId} setSelected={setSelected} /> */}
                        <Container>
                            <div className='details'>
                                <ProfileImage src={server+data.data.ProfilePicture} />
                                <ProfileData>
                                    <h1>{data.data.Username}</h1>
                                    <div>
                                        <h4><span>{data.data.Posts.length}</span> posts</h4>
                                        <Link to="/" style={{ textDecoration: 'none' }}><h4><span>{data.data.Follower}</span> followers</h4></Link>
                                        <Link to="/" style={{ textDecoration: 'none' }}><h4><span>{data.data.Following}</span> following</h4></Link>
                                    </div>
                                    <h3>{data.data.FullName}</h3>
                                    <p>
                                        {data.data.Bio}
                                    </p>
                                </ProfileData>
                            </div>
                            <div style={{ borderTop: "1px solid rgb(211, 211, 211)", width: "70%" }} className="buttons">
                                <button>POSTS</button>
                                <button>REELS</button>
                            </div>
                            <div className="posts">
                                {data.data.Posts.map((post, index) => (
                                    <PostDisplayProfile key={index} post={post}/>
                                ))}
                            </div>
                            <footer>Instagram (R) clone by ARYAN PARMAR</footer>
                        </Container>

                    </div> : <div>Loading</div>
            }
        </>
    )
}
let Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 30px;
    .details{
        max-width: 70%;
        width: 60%;
        display: flex;
        align-items: flex-start;
        margin-bottom: 40px;
    }
    .buttons{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
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
        width: 70%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 25px;
    }
    footer{
        margin: 50px 0;
        color: #8e8e8e;
        font-size: 12px;
        font-weight: 400;
    }
`
let ProfileImage = styled.img`
    height: 150px;
    border-radius: 50%;
    cursor: pointer;
`
let ProfileData = styled.div`
    margin-left: 10%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 45%;
    h1{
        margin:0;
        font-weight: 300;
        font-size: 28px;
        color: #262626;
    }
    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        h4{
            font-weight: 400;
            font-size: 16px;
            color: #262626;
            margin-bottom: 12px;
            span{
                font-weight: 600;
            }
        }
    }
    h3{
        margin: 0;
        font-weight: 600;
        color: #262626;
        font-size: 16px;
        margin-bottom: 1px;
    }
    p{
        margin-top: 0;
        font-weight: 400;
        color: #262626;
    }
`