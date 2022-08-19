import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { apiCheckLogin } from '../functions/basic'
import Loading from './Loading'

export default function EditProfile() {
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
            else {
                setUsername(User.user.Username)
                setFullName(User.user.FullName)
                setBio(User.user.Bio)
                setEmail(User.user.Email)
                handleDisabled()
            }
        }
    }, [User])

    let [Username, setUsername] = React.useState('')
    let [FullName, setFullName] = React.useState('')
    let [Email, setEmail] = React.useState('')
    let [Bio, setBio] = React.useState('')
    let [showButton, setShowButton] = React.useState(false)
    let [file, setFile] = React.useState(null)
    function handleDisabled() {
        if (Username === '' || FullName === '' || Email === '') {
            setShowButton(false)
        }
        else if(file){
            setShowButton(true)
        }
        else if (Username === User.user.Username && FullName === User.user.FullName && Email === User.user.Email && Bio === User.user.Bio) {
            setShowButton(false)
        }
        else {
            setShowButton(true)
        }
    }
    function inputChange(e) {
        let { name, value } = e.target
        if (name === "Username") {
            setUsername(value.toLowerCase())
        }
        else if (name === "FullName") {
            setFullName(value)
        }
        else if (name === "Email") {
            setEmail(value)
        }
        else if (name === "Bio") {
            setBio(value)
        }
    }
    React.useEffect(() => {
        handleDisabled()
    }, [Username, FullName, Email, Bio, file])
    React.useEffect(() => {
        if (file) {
            document.querySelector('.profile').src = URL.createObjectURL(file)
        }
    }, [file])
    return (
        <>
            {User && !User['err']
                ?
                <Container>
                    <Form>
                        <h3>Edit Profile</h3>
                        <div className='profile-section'>
                            <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/png, image/jpg, image/gif, image/jpeg" />
                            <img src={User.user.ProfilePicture} className="profile" />
                            <h5>Change profile photo</h5>
                        </div>
                        <div className='fields'>
                            <label>Name</label>
                            <input type='text' placeholder='Name' name="FullName" value={FullName} onChange={(e) => inputChange(e)} />
                        </div>
                        <div className='fields'>
                            <label>Username</label>
                            <input type='text' placeholder='Username' name="Username" value={Username} onChange={(e) => inputChange(e)} />
                        </div>
                        <div className='fields'>
                            <label>Bio</label>
                            <textarea type='text' placeholder='Bio' name="Bio" value={Bio} onChange={(e) => inputChange(e)} />
                        </div>
                        <div className='fields'>
                            <label>Email</label>
                            <input type='text' placeholder='Email' name="Email" value={Email} onChange={(e) => inputChange(e)} />
                        </div>
                        <input type='submit' value='Save' disabled={!showButton} />
                    </Form>
                </Container>
                :
                <Loading />
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
`
let Form = styled.form`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 50%;
    .profile-section{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        position: relative;
        input{
            opacity: 0;
            position: absolute;
            height: 100%;
            width: 120px;
            cursor: pointer;
        }
        img{
            width: 100px;
            border-radius: 50%;
            height: 100px;
            object-fit: cover;
            pointer-events: none;
        }
        h5{
            cursor: pointer;
            margin: 0px;
            margin-top: 5px;
            color: #0095f6;
            pointer-events: none;
        }
    }
    .fields{
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        width: 60%;
        margin-top: 20px;
        input,textarea{
            height: 35px;
            outline: none;
            border: 1px solid rgb(211, 211, 211);
            border-radius: 5px;
            margin-left: 10px;
            font-size: 14px;
            width: 350px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
            padding-left:10px;
        }
        textarea{
            padding-top:10px;
            height: 50px;
        }
        label{
            font-weight: 600;
        }
    }
    input[type="submit"]{
        width: 60%;
        margin-top: 20px;
        height: 35px;
        outline: none;
        border: none;
        border-radius: 5px;
        background-color: #0095f6;
        color: white;
        font-weight: 600;
        &:disabled{
            opacity: 0.5;
        }
    }
`