import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import apiPost, { apiCheckLogin } from '../functions/basic'
export default function Login() {
    let [Email, setEmail] = React.useState('')
    let [Password, setPassword] = React.useState('')
    let [pSC, setPSC] = React.useState(true)
    let [eSC, setESC] = React.useState(true)
    let [Submit, setSubmit] = React.useState(true)
    let [User, setUser] = React.useState(null)
    let [error, setError] = React.useState(null)
    let navigate = useNavigate();
    React.useEffect(() => {
        apiCheckLogin(setUser)
    }, [])
    function handleEmail(e) {
        let val = e.target.value
        setEmail(val)
        if (val === '') {
            setESC(true)
        } else {
            setESC(false)
        }
        if (val !== '' && Password !== '') {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }
    function handlePassword(e) {
        let val = e.target.value
        setPassword(val)
        if (val === '') {
            setPSC(true)
        } else {
            setPSC(false)
        }
        if (val !== '' && Email !== '') {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        await apiPost('auth/login', { Email, Password }, setUser)
    }
    React.useEffect(() => {
        if (User) {
            console.log(User)
            if (User['err'] === null) {
                navigate('/')
            }
            else if (User['err'] === "Invalid Email" || User['err'] === "Invalid Password") {
                setError(User['err'])
            }
        }
    }, [User])
    return (
        <Container>
            <FormRoot>
                <Logo src='/logo2x.png' />
                <Form esc={eSC} psc={pSC} onSubmit={handleSubmit}>
                    <div >
                        <Label1 esc={eSC}>Email</Label1>
                        <Input className='e' type='email' required={true} value={Email} onChange={handleEmail} />
                    </div>
                    <div >
                        <Label2 psc={pSC}>Password</Label2>
                        <Input className='p' type='password' required={true} value={Password} onChange={handlePassword} />
                    </div>
                    {error ? <Error>{error}</Error> : null}
                    <Input type='submit' value='Log in' disabled={Submit} />
                </Form>
            </FormRoot>
            <FormRoot style={{ marginTop: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '400', color: '#262626' }}>Don't have an account? <Link to='/signup' style={{ color: '#009586', fontWeight: '600', textDecoration: 'none' }}>Sign up</Link></h4>
            </FormRoot>
        </Container>
    )
}
const Error = styled.h6`
    color: #ff0000;
    margin: 0.5em;
    weight:100%;
    font-weight: 600;
`
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    flex-direction: column;
`
const FormRoot = styled.div`
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid rgb(211, 211, 211);
    border-radius: 10px;
    width: 90vw;
    @media (min-width: 425px) {
        width: 50vw;
    }
    @media (min-width: 1024px) {
        width: 40vw;
    }
    @media (min-width: 1440px) {
        width: 20vw;
    }
`
const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 30px;
    width: 70%;
    div{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border: 1px solid rgb(211, 211, 211);
        background-color: rgb(251, 251, 251);
        font-size: 12px;
        border-radius: 5px;
        margin: 3px 0;
        width: 100%;
        outline-color: #d5d5d5;
        flex-direction: column;
        height: 35px;
    }
    .e{
        ${props => !props.esc && css`
            padding: 1.3% 0;
        `}
    }
    .p{
        ${props => !props.psc && css`
            padding: 1.3% 0;
        `}
    }
`
const Label1 = styled.label`
    position: absolute;
    left: 4%;
    font-size: 12px;
    pointer-events: none;
    color: grey;
    transition: all 0.1s ease;
    ${props => !props.esc && css`
    position: relative;
    align-self: flex-start;
    font-size: 9px;
    `}
    `
const Label2 = styled.label`
    position: absolute;
    left: 4%;
    font-size: 12px;
    pointer-events: none;
    color: grey;
    transition: all 0.1s ease;
    ${props => !props.psc && css`
        position: relative;
        align-self: flex-start;
        font-size: 9px;
    `}
`
const Input = styled.input`
    width: 91%;
    background-color: transparent;
    padding: 4% 4%;
    border: none;
    outline: none;
    &[type='submit']{
        background-color: #0095f6;
        padding: 4% 4%;
        color: white;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        border-radius: 5px;
        margin: 3px 0;
        width: 100%;
    }
    &[type='submit']:disabled{
        cursor: default;
        opacity: 0.5;
    }
`
const Logo = styled.img`
    width: 171px;
    padding: 30px;
`