import { Avatar,  IconButton } from '@material-ui/core'
import React, {useEffect} from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {setSignOut, setUserLogin, selectUserName, selectUserEmail, selectUserPhoto} from '../features/user/userSlice'
import {auth, provider} from '../firebase';
import {useHistory} from 'react-router-dom';



function Header() {
    const name = useSelector(selectUserName);
    const email = useSelector(selectUserEmail);
    const photo = useSelector(selectUserPhoto);
    const dispatch = useDispatch()
    const history = useHistory();


    useEffect(() => {
        auth.onAuthStateChanged(async (user)=> {
            if(user){
                dispatch(setUserLogin({
                    name : user.displayName,
                    email : user.email,
                    photo : user.photoURL   
                }))
                history.push("/")

            }
        })
    }, [history])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) =>{
            let user = result.user
            dispatch(setUserLogin({
                name : user.displayName,
                email : user.email,
                photo : user.photoURL,    
            }))
            
            
        })


        
    }
    
    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSignOut())
            history.push("/login")
        })
    }

    return (
        <Nav>
            <Logo src="/images/logo.svg"/>
            {!name ? (
                <LoginContainer>
                    <Login onClick={signIn}>Login</Login>
                </LoginContainer>
            ):
                <>
                    <NavMenu>
                        <a href="/">
                            <img  src="/images/home-icon.svg"/>
                            <span>Home</span>
                            
                        </a>
                        
                        <a>
                            <img  src="/images/search-icon.svg"/>
                            <span>Search</span>
                        </a>
                        
                        <a>
                            <img  src="/images/watchlist-icon.svg"/>
                            <span>WatchList</span>
                        </a>
                        
                        <a>
                            <img  src="/images/original-icon.svg"/>
                            <span>Originals</span>
                        </a>
                        
                        <a>
                            <img  src="/images/movie-icon.svg"/>
                            <span>Movies</span>
                        </a>

                        <a>
                            <img  src="/images/series-icon.svg"/>
                            <span>Series</span>
                        </a>


                    </NavMenu>
                    <IconButton onClick={signOut}>
                        <UserImage src={photo} />
                    </IconButton>
                </>
            }   
        </Nav>
    )
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background-color: #090b13;
    display: flex;
    align-items: center;
    //TROUBLE           
    padding: 0 39px;
    overflow-x: hidden;


`

const Logo = styled.img`
    width: 80px;
`
const NavMenu = styled.div`
    display: flex;
    margin-left: 25px;
    flex: 1;
    align-items: center;
    
    

    a{
        display: flex;
        align-items: center;
        padding: 0 22px;
        cursor: pointer;
        text-decoration: none;
        color: white;
        

        img{
            height: 20px;
        }

        span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                background-color: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform-origin: left center;
                transform: scaleX(0)
            }

           
        }

        &:hover {
            span:after {
                opacity: 1;
                transform: scaleX(1);
            }
        } 
    }
`

const UserImage =styled(Avatar)`
    
`

const Login = styled.div`
    cursor: pointer;
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.2s ease 0s;

    &:hover{
       color: #000 ;
       background-color: #f9f9f9;
       border-color: transparent;

    }


`
const LoginContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;   
`
