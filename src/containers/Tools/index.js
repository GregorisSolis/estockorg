import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import './ferramenta.css'

export default function Tools() {
	
	return(
		<div className="container-ferramenta">
			<Navbar/>
			<div className="content-ferramenta">
				<Link className="card-ferramenta" to="/ferramenta/cadastrar-produto"><h1>Cadastrar novo producto</h1></Link>
				<Link className="card-ferramenta" to="/ferramenta/buscar-produto"><h1>Buscar e deletar producto</h1></Link>
			</div>
		</div>
	)
}