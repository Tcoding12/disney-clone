import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import ImagSlider from './ImagSlider'
import Movies from './Movies'
import Viewers from './Viewers'
import db from '../firebase'
import {useDispatch} from 'react-redux'
import {setMovies} from '../features/movie/movieSlice'

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        db.collection("movies").onSnapshot((snapshot) => {
            let tempMovies = snapshot.docs.map((doc) => {
                return {id:doc.id, ...doc.data()}
            })
            dispatch(setMovies(tempMovies))
            
            

        })
    }, [])

    return (
        <Wrapper>
            <ImagSlider/>
            <Viewers />
            <Movies />
        </Wrapper>
    )
}

export default Home

const Wrapper = styled.main`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.9vw + 5px);
    position: relative;
    overflow-x: hidden;

    &:before{
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }

`