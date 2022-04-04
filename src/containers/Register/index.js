import React, { Component } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../../services/api'
import { login } from '../../services/auth'
import './register.css'
import Info from '../../components/Info'


export default class Register extends Component{

	state = {
		username: '',
		name: '',
		password: '',
		passwordConfirm: '',
		typeUser: '',
		text: '',
		isInfo: false
	}

	clearState = () =>{
		setTimeout(() => {
		 	this.setState({text: '', isInfo: false})
		}, 6000);
	}

	veryficInputs = e => {
		e.preventDefault()

		const { username, name, password, passwordConfirm, typeUser, isActive } = this.state

		//PASARLO AL BACKEND
		if(!username || !name || !password || !passwordConfirm || typeUser === "0"){
			this.setState({text: 'Todos os campos deven ser prenchidos.', isInfo: true})
		}else if(password !== passwordConfirm){
			this.setState({text: 'As senhas não são iguais.', isInfo: true})
		}else if(password.length < 7) {
			this.setState({text: 'A senha e muito fraca.', isInfo: true})
		}else{

			this.setRegister()
		}

		this.clearState()
	}

	setRegister = async () =>{

		const { username, name, password, typeUser } = this.state
		let company = ''
		let isActive = ''
		let permitType = ''
		

		if(typeUser === "1"){
			company = username
			isActive = true
			permitType = 'boss'
		}else if(typeUser === "2"){
			company = 'notdefined'
			isActive = false
			permitType = 'auxi'
		}

		try{
			const resdata = await api.post('/user/new-user',{username, password, name,company,isActive,permitType})
			login(resdata.data.token)
			localStorage.setItem('@name-stock', resdata.data.user.company)
			window.location.href = "/stock"
		}
		catch(err){
			this.setState({text: 'O username ja foi cadastrado por outro usuario.', isInfo: true})
		}
		this.clearState()
	}
	

		render(){

			const { text, isInfo } = this.state

		return(
			<div className='container-register'>
				<form className="container-form" onSubmit={this.veryficInputs}>
					<div className="title-logo"><h2 className="logo-name">Estockorg</h2></div>
					<div className="content_inputs">
						<input type="text" name="nome" placeholder='nome completo' onChange={e => this.setState({name: e.target.value})}/>
						<input type="text" name="username" placeholder='username' onChange={e => this.setState({username: e.target.value})}/>
						<select className="select" onChange={e => this.setState({typeUser: e.target.value})}>
							<option value="0">Tipo de Usuario</option>
							<option value="2">Funcionario</option>
							<option value="1">Empresa</option>
						</select>

						<input type="text" name="password" placeholder='senha' onChange={e => this.setState({password: e.target.value})}/>
						

						<input type="text" name="passwordConfirm" placeholder='Digite a senha novamente' onChange={e => this.setState({passwordConfirm: e.target.value})}/>
						<button type="submit" >Confirmar</button>
					</div>
				</form>
				{isInfo ? <Info mensagen={text}/> : ''}
			</div>
		)
	}
}