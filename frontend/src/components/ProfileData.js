import React from 'react'
import styled from 'styled-components'
export default function ProfileData() {
    let data = {name: 'aryn__', profile:"/user.jpg", displayName: "__Aryan__"}
    return (
        <>
        <Container>
            <Head>
                <H href=''><Profile src={data.profile} /></H>
                <div>
                    <H href=''>{data.name}</H>
                    <h5>{data.displayName}</h5>
                </div>
            </Head>
            <h5 style={{marginLeft: "10px", color: "#8e8e8e", fontWeight:'600', fontSize: "14px"}}>Your Friends</h5>
        </Container>
        </>
    )
}
const Container = styled.div`
    width: 20vw;
    margin-left: 20px;
    position: sticky;
    top: 80px;
    left: 20px;
`
const Head = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    div{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        h5{
            margin: 3px 0;
            color: #8e8e8e;
            font-size: 14px;
            font-weight: 400;
        }
    }
`
const Profile = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 10px;
`
const H = styled.a`
    font-weight: 600;
    color: #262626;
    font-size: 14px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        text-decoration: underline;
    }
`