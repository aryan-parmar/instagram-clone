import React from 'react'
import { Link } from 'react-router-dom'
import { apiCheckLogin } from '../functions/basic'
import styled from "styled-components"

export default function Navbar(props) {
    let [opacity, setopacity] = React.useState('1')
    let [User, setUser] = React.useState(null)
    let show = props.show;
    let current = props.current;
    React.useEffect(() => {
        apiCheckLogin(setUser)
    }, [])
    function SetVisiblity(e) {
        let inp = e.target.value
        if (inp === '') {
            setopacity('1')
        } else {
            setopacity('0')
        }
    }
    return (
        <>

            <NavBar>
                <Nav>
                    <Link to='/'>
                        <Logo src='/logo.png' />
                    </Link>
                    <SearchContainer opacity={opacity}>
                        <Search placeholder="Search" onChange={SetVisiblity} />
                    </SearchContainer>
                    {User && !User['err'] ?
                        <IconGroup>
                            <Link to='/'>
                                <Icon fill="#262626" height="22" viewBox="0 0 48 48" width="22">
                                    <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
                                </Icon>
                            </Link>
                            <div style={{cursor: "pointer"}} onClick={()=> show(!current)}>
                                <Icon color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                    </path>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455">
                                    </line>
                                </Icon>
                            </div>
                            <Link to='/'>
                                <Icon color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z">
                                    </path>
                                </Icon>
                            </Link>
                            <Link to={"/" + User.user.Username}>
                                <Profile src={User.user.ProfilePicture} />
                            </Link>
                        </IconGroup>
                        :
                        <LoginButton to='/login'>LOGIN</LoginButton>
                    }
                </Nav>
            </NavBar>
        </>
    )
}

const NavBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgb(211, 211, 211);
    height: 50px;
    background-color: white;
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
    overflow: hidden;
`
const Nav = styled.div`
    max-width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width:100%;
    padding: 0;
    margin: 0;
    `
const Logo = styled.img`
    padding-top: 6%;
    cursor: pointer;
    align-self: flex-end;
`
const Search = styled.input`
    height:100%;
    transition: all 1s ease;
    border: 1px solid rgb(211, 211, 211);
    border-radius: 5px;
    outline: none;
    font-size: 0.9rem;
    width: 200px;
    background-color: rgb(251, 251, 251);
    &::placeholder{
        text-align: center;
        color: rgb(167, 167, 167);
    }
    &:focus::placeholder{
        text-align: left;
        padding-left: 9%;
    }
`
const SearchContainer = styled.div`
    height: 25px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before{
        content: url(/search-solid.svg);
        position: absolute;
        left: 30%;
        top: 30%;
        transform: translate(0,-50%);
        height:12px;
        width:12px;
        user-select: none;
        pointer-events: none;
        opacity: ${props => props.opacity};
    }
    &:focus-within::before{
        left: 3%;
    }
`
const IconGroup = styled.div`
    display: flex;
    justify-content:space-between;
    align-items:center;
`
const Icon = styled.svg`
    margin-left: 15px;
    `
const Profile = styled.img`
    border-radius: 50%;
    height: 24px;
    width:24px;
    margin-left: 15px;
`
const LoginButton = styled(Link)`
    color: white;
    background-color: rgb(0, 122, 255);
    text-decoration: none;
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    border-radius: 5px;
`