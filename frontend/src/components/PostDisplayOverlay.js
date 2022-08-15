import React from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import apiPost from '../functions/basic'
import Post2 from './Post2'
import url from '../url.json'

export default function PostDisplayOverlay() {
    let { post } = useParams()
    let [data, setData] = React.useState(null)
    let server = url.server
    React.useEffect(() => {
        // apiCheckLogin(setUser)
        apiPost("post/getprofile", { post }, setData)
    }, [])
    React.useEffect(() => {
        if (data) {
            if (data['err']) {
                console.error("error:" + data.err)
            }
            else {
                console.log(data)
            }
        }
    }, [data])
    return (
        <>
            {data && !data.err ?
                <ScreenOverlay>
                    <Container>
                        <Post2 post={server + data.data.Posts.PostImage} from={data.data.Username} profile={server + data.data.ProfilePicture} comments={data.data.Posts.Comments} likes={data.data.Posts.Likes} date='' caption={data.data.Posts.Caption}
                            liked={data.data.Posts.LikedBy.includes(data.data.user_id)} />
                    </Container>
                </ScreenOverlay>
                :
                <div>Loading....</div>
            }
        </>
    )
}
let ScreenOverlay = styled.div`
    width: 100%;
    height: 90vh;
    position: relative;
    z-index: 13;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow: hidden; */
`
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    z-index: 12;
    height: 100%;
    width: 100%;
`