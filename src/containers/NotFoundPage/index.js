import React from 'react'
import {Link} from 'react-router-dom'
import './notFoundPages.css'

export default function NotFoundPages(){

	return(
		<div className="container-notfound">
			<div className="content-notfound">
				<h2>Desculpa a ruta não foi encontrada.</h2>
					<div className="textErro"><h1>ERROR 40</h1><h1 className="rotate_textErro">4</h1></div>
				<Link to="/">Ir para Home pages</Link>
			</div>
		</div>
	)
}