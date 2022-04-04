import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import api from '../../services/api'
import { login } from '../../services/auth'
import './login.css'
import Info from '../../components/Info'



export default function Login() {

	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [text, setText] = useState('')
	const [isInfo, setIsInfo] = useState(false)

	const clearState = () =>{
		setTimeout(() => {
		  setIsInfo(false)
		}, 4000);
	}

	const setLogin = async e =>{
		e.preventDefault()

		if(!username || !password){
			setIsInfo(true)
			setText('Digite o username e a senha, por favor.')
			clearState()
		}else{

			try{
				const resdata = await api.post('/user/authenticar-user', {username, password})
				login(resdata.data.token)
				localStorage.setItem('@name-stock', resdata.data.user.company)
				navigate("/stock")
			}
			catch(err){
				setIsInfo(true)
				setText('Username ou senha errada.')
				clearState()
			}

		}
	}

		return(
			<div className='container-login'>
				<form className="container-form" onSubmit={setLogin}>
					<div><h2 className="logo-name">Estockorg</h2></div>
					<input type="text" name="username" placeholder='username' onChange={e => setUsername(e.target.value)}/>
					<input type="password" name="password" placeholder='senha' onChange={e => setPassword(e.target.value)}/>
					<button type="submit" >Entrar</button>
					<div className="link_backs">
						<Link to="/">Voltar para Home</Link>|
						<Link to="/register">Criar uma conta</Link>
					</div>
				</form>
				{isInfo ? <Info mensagen={text}/> : ''}
			</div>
		)
	}