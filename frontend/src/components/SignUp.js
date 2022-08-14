import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import apiPost, {apiCheckLogin} from '../functions/basic';
export default function Login() {
    let [Email, setEmail] = React.useState('')
    let [Password, setPassword] = React.useState('')
    let [pSC, setPSC] = React.useState(true)
    let [eSC, setESC] = React.useState(true)
    let [FullName, setFullName] = React.useState('')
    let [Username, setUsername] = React.useState('')
    let [fSC, setFSC] = React.useState(true)
    let [uSC, setUSC] = React.useState(true)
    let [Submit, setSubmit] = React.useState(true)
    let [User, setUser] = React.useState(null)
    let navigate = useNavigate();
    function handleEmail(e) {
        let val = e.target.value
        setEmail(val)
        if (val === '') {
            setESC(true)
        } else {
            setESC(false)
        }
        if (val !== '' && Password !== '' && FullName !== '' && Username !== '') {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }
    function handleFName(e) {
        let val = e.target.value
        setFullName(val)
        if (val === '') {
            setFSC(true)
        } else {
            setFSC(false)
        }
        if (Email !== '' && Password !== '' && val !== '' && Username !== '') {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }
    function handleUsername(e) {
        let val = e.target.value
        setUsername(val)
        if (val === '') {
            setUSC(true)
        } else {
            setUSC(false)
        }
        if (Email !== '' && Password !== '' && FullName !== '' && val !== '') {
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
        if (Email !== '' && val !== '' && FullName !== '' && Username !== '') {
            setSubmit(false)
        } else {
            setSubmit(true)
        }
    }
    React.useEffect(() => {
        apiCheckLogin(setUser)
    },[])
    async function handleSubmit(e) {
        e.preventDefault()
        await apiPost('auth/signup', { Email, FullName, Username, Password }, setUser)
    }
    React.useEffect(() => {
        if (User) {
            console.log(User)
            if (User['err'] === null) {
                navigate('/')
            }
            else if (User['err'] === "Invalid Email" || User['err'] === "Invalid Password") {
                setESC(false)
                setPSC(false)
            }
        }
    },[User])
    return (
        <Container>
            <FormRoot>
                <Logo src='/logo2x.png' />
                <Form esc={eSC} psc={pSC} fsc={fSC} usc={uSC} onSubmit={handleSubmit}>
                    <div >
                        <Label1 esc={eSC}>Email</Label1>
                        <Input className='e' type='email' required={true} value={Email} onChange={handleEmail} />
                    </div>
                    <div >
                        <Label3 fsc={fSC}>Full Name</Label3>
                        <Input className='f' type='text' required={true} value={FullName} onChange={handleFName} />
                    </div>
                    <div >
                        <Label4 usc={uSC}>Username</Label4>
                        <Input className='u' type='text' required={true} value={Username} onChange={handleUsername} />
                    </div>
                    <div >
                        <Label2 psc={pSC}>Password</Label2>
                        <Input className='p' type='password' required={true} value={Password} onChange={handlePassword} />
                    </div>
                    <Input type='submit' value='Sign up' disabled={Submit} />
                </Form>
            </FormRoot>
            <FormRoot style={{ marginTop: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '400', color: '#262626' }}>have an account? <Link to='/login' style={{ color: '#009586', fontWeight: '600', textDecoration: 'none' }}>Log in</Link></h4>
            </FormRoot>
            {User === null ? null : <div style={{ textAlign: 'center', marginTop: '20px' }}>{User.Email}</div>}
        </Container>
    )
}
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
    .u{
        ${props => !props.usc && css`
            padding: 1.3% 0;
        `}
    }
    .f{
        ${props => !props.fsc && css`
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
const Label3 = styled.label`
    position: absolute;
    left: 4%;
    font-size: 12px;
    pointer-events: none;
    color: grey;
    transition: all 0.1s ease;
    ${props => !props.fsc && css`
        position: relative;
        align-self: flex-start;
        font-size: 9px;
    `}
`
const Label4 = styled.label`
    position: absolute;
    left: 4%;
    font-size: 12px;
    pointer-events: none;
    color: grey;
    transition: all 0.1s ease;
    ${props => !props.usc && css`
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