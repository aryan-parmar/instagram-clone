import React from 'react'
import Post from './Post'
import styled from 'styled-components'
import apiPost from '../functions/basic'
import url from '../url.json'

export default function PostArea() {
    let [posts, setPosts] = React.useState({})
    let server = url.server
    React.useEffect(() => {
        apiPost('post/getpost',{}, setPosts)
    },[])
    React.useEffect(() => {
        if (posts) {
            if (posts['err']) {
                console.error("error:" + posts.err)
            }
        }
    }, [posts])
    return (
        <>
            <Container>
                <Post post='/user.jpg' from='Someone_' profile='/user.jpg' comments={[{from: 'aalok_', data:'nice pic'}]} likes='12' date='' caption='yo guys' liked={true}/>
                <Post post='/user.jpg' from='Someone_' profile='/user.jpg' comments={[{from: 'aalok_', data:'nice pic'}]} likes='12' date='' caption='yo guys' liked={true}/>
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