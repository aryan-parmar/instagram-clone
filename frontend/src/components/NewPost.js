import React from 'react'
import styled from 'styled-components'
export default function NewPost(props) {
    let show = props.show;
  return (
    <Wrapper onClick={()=>show(false)}>
        <Container>

        </Container>
    </Wrapper>
  )
}
let Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    align-self: start;
    overflow: hidden;
`
let Container = styled.div`
    width: 80%;
    height: 80%;
    background: white;
    border-radius: 10px;
`