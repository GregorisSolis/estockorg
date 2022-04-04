import React from 'react'
import './notproduct.css'

export default function NotProduct(props){

	return(
		<div className="container-notProduct">
			<p>{props.text}</p>
		</div>
	)
}