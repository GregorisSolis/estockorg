import React, { useState } from 'react'
import api from '../../services/api'
import { login } from '../../services/auth'
import './resetpass.css'
import Info from '../../components/Info'


export default function ResetPassword(props){

	let [password, setPassword] = useState('')
	let [newPassword, setNewPassword] = useState('')
	let [newPasswordConfirm, setNewPasswordConfirm] = useState('')
	const [text, setText] = useState('')
	const [isInfo, setIsInfo] = useState(false)
	const ID = props.ID

	const clearState = () =>{
		setTimeout(() => {
		  setIsInfo(false)
		}, 5000);
	}

	const verifyInputs = e => {
		e.preventDefault()

		if(!password || !newPassword){
			setIsInfo(true)
			setText("Todos os campos deven ser prenchidos.")
		}else if(newPassword !== newPasswordConfirm){
			setIsInfo(true)
			setText("As senhas não coinciden.")
		}else if(newPassword.length < 7) {
			setIsInfo(true)
			setText("Senha muito fraca, tente novamente.")
		}else{
			verifyUser()
		}

		clearState()
	}

	const verifyUser = async () =>{
		let username = props.username
		try{
			const resdata = await api.post('/user/authenticar-user', {username, password})
			login(resdata.data.token)
			setPassUSer()
		}
		catch(err){
			setIsInfo(true)
			setText('Senha incorreta. tente novamente')
			clearState()
		}
	}

	const setPassUSer = () =>{
		if(!newPassword){
			setIsInfo(true)
			setText('Senha incorreta. tente novamente')
		}else{
			api.put(`user/reset-password/${ID}`,{password: newPassword})
			.then(resp =>{
				setIsInfo(true)
				setText('Nova senha foi criada com sucesso.')
			})
			.catch(err => {
				setIsInfo(true)
				setText('Não foi possivel criar uma nova senha.')
			})
		}

		clearState()
	}

	return(
		<div className="container-resetPass">
			{isInfo?<Info mensagen={text}/>:''}
			<form className="container-form" onSubmit={verifyInputs}>
				<div><h3>Mudar senha</h3></div>
				<input name="username" type="hidden" value={props.username} onChange={e => setPassword(e.target.value)}/>
				<input name="password" type="password" placeholder="Senha atual" onChange={e => setPassword(e.target.value)}/>
				<input name="newPassword" type="text" placeholder="Digite a nova senha" onChange={e => setNewPassword(e.target.value)}/>
				<input name="newPasswordConfirm" type="text" placeholder="Digite novamente a nova senha" onChange={e => setNewPasswordConfirm(e.target.value)}/>
				<div className="btn-actions_resetPassword">
					<button type="submit">Criar</button>
					<button className="btn-red" onClick={() => props.closeComponent()}>Fechar</button>
				</div>
			</form>
		</div>
	)
}