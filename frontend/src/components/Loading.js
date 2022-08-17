import React from 'react'
import styled from 'styled-components'

export default function Loading() {
  return (
    <Container>
        <img src="/loading.gif" alt="loading" />
    </Container>
  )
}
let Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`