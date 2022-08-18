import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import apiPost, { apiCheckLogin } from '../functions/basic'
import Loading from './Loading'

import NBox from './NBox'

export default function Me() {
    let [User, setUser] = React.useState(null)
    let [data, setData] = React.useState(null)
    let navigate = useNavigate();
    React.useEffect(() => {
        apiCheckLogin(setUser)
    }, [])
    React.useEffect(() => {
        if (User) {
            if (User['err'] === "A token is required for authentication" || User['err'] === "Invalid Token") {
                navigate('/login')
            }
            else if (!User['err']) {
                apiPost('profile/me', {}, setData)
            }
        }
    }, [User])
    // React.useEffect(()=>{
    //     if(data){
    //         console.log(data.request)
    //     }
    // },[data])
    
    return (
        <>
            {User ?
                <Container>
                    <Box>
                        {data && !data['err'] ?
                            <>
                                {
                                    data.request.PendingRequest.map((req, index) => (
                                        <NBox req={req} key={index} user={data.request._id}/>
                                    ))

                                }
                            </>
                            : null}
                    </Box>
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
    overflow-y: scroll;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`
let Box = styled.div`
    margin-top: 10px;
    width:96%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (min-width: 768px){
        width:80%;
    }
    @media (min-width: 1100px){
        width:50%;
    }
`