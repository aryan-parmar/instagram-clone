import React from 'react'
import Post from './Post'
import styled from 'styled-components'
import apiPost from '../functions/basic'
import url from '../url.json'

export default function PostArea() {
    let [posts, setPosts] = React.useState(null)
    let server = url.server
    React.useEffect(() => {
        apiPost('post/getpost', {}, setPosts)
    }, [])
    React.useEffect(() => {
        if (posts) {
            if (posts['err']) {
                console.error("error:" + posts.err)
            }
            // console.log(posts)
        }
    }, [posts])
    return (
        <>
            <Container>
                {
                    posts && !posts['err'] ?
                        <>
                            {posts.posts.Timeline.length !== 0 ?
                                <>
                                    {
                                        posts.posts.Timeline.map((p, ind) => (
                                            <Post key={ind} _id={p._id} post={server + p.PostImage} from={p.User_id.Username} profile={server+p.User_id.ProfilePicture} comments={p.Comments} likes={p.Likes} date={p.Date} caption={p.Caption} liked={p.LikedBy.includes(posts.posts._id)} />
                                        ))
                                    }
                                </>

                                : 
                                <h3>Follow More people to see posts here</h3>
                            }
                        </>
                        :
                        null
                }
            </Container>
        </>
    )
}
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    @media (min-width: 1000px){
        width: fit-content;
    }
`