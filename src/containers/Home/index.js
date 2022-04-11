import React from 'react'
import Navbar from '../../components/Navbar'
import './home.css'
import Logo from '../../assets/logo.png'

export default function Home(){
    return(
        <>
        <div className="container-home">
        <Navbar/>
            <div className="content">
                <div className="title-home">
                    <h1>Estockorg</h1>
                <div className="subtitle-home">
                    <h2>A melhor opção para manter seu estoque organizado desde onde você quise.</h2>
                </div>
                </div>
                <div className="content_image">
                    <img src={Logo} alt="logo_estockorg" />
                </div>
            </div>

        </div>
        </>        
    )
}