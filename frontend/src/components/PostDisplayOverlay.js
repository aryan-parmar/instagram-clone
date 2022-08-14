import React from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import Post2 from './Post2'

export default function PostDisplayOverlay() {
    let { post } = useParams()
    return (
        <ScreenOverlay onClick={() => console.log("yo")}>
            <Container>
                <Post2 post='/img.jpg' from='aryan_' profile='/img.jpg' comments={[{ from: 'someone_', data: 'nice one' },
                 { from: 'aary_', data: 'nice one' },
                ]} likes='12' date='' caption='this is a caption yo'
                    liked={false} />
            </Container>
        </ScreenOverlay>
    )
}
let ScreenOverlay = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 13;
    background-color: #fafafa;
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