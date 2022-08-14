import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { apiCheckLogin } from '../functions/basic'
import PostArea from './PostArea'
import ProfileData from './ProfileData'
export default function Main() {
    let [User, setUser] = React.useState(null)
    let navigate = useNavigate();
    React.useEffect(() => {
        apiCheckLogin(setUser)
    }, [])
    React.useEffect(() => {
        if (User) {
            if (User['err'] === "A token is required for authentication" || User['err'] === "Invalid Token") {
                navigate('/login')
            }
            // else console.info("error:"+User.err)
        }
    }, [User])
    return (
        <>
            <Container>
                {
                    User ?
                        <>
                            <PostArea user={User.user} />
                            <ProfileData user={User.user} />
                        </>
                        : <div>Loading...</div>
                }
            </Container>
        </>
    )
}
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`