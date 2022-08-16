import React from 'react'
import Post from './Post'
import styled from 'styled-components'
import apiPost from '../functions/basic'
export default function PostArea() {
    let [posts, setPosts] = React.useState({})
    React.useEffect(() => {
        apiPost('post/getpost',{}, setPosts)
    },[])
    React.useEffect(() => {
        console.log(posts)
    },[posts])
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