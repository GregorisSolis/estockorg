import React from 'react'
import './info.css'

export default function Info(props){
   
    return(
        <div className='container-info'>
            <p>{props.mensagen}</p>
        </div>
    )
}