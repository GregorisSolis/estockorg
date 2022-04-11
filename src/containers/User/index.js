import React,{ useState, useEffect } from 'react'
import './user.css'
import Navbar from '../../components/Navbar'
import ResetPassword from '../../components/ResetPassword'
import api from '../../services/api'
import Logo from '../../assets/iconuser.png'


export default function User(){

	useEffect(() => {
		loadInfoProfile()
	})

	let getUsername = localStorage.getItem("@user-stock")
	let [name, setName] = useState('')
	let [company, setCompany] = useState('')
	let [username, setUsername] = useState(getUsername)
	let [permitType, setPermitType] = useState('')
	let [isReset, setIsReset] = useState(false)
	let [userID, setUserID] = useState('')
	
	const loadInfoProfile = async () => {
		await api.get(`user/data-user/${username}`)
		.then(res =>{
			setUserID(res.data.user._id)
			setName(res.data.user.name)
			setCompany(res.data.user.company)
			setUsername(res.data.user.username)
			if(res.data.user.permitType === '1'){
				setPermitType('Empresa')
			}else{
				setPermitType("Encarregado")
			}
		})
		.catch(err =>{
			console.log(err)
		})
	}

	function showHandleIsReset(){
		if(isReset){
			setIsReset(false)
		}else{
			setIsReset(true)
		}
	}

	return(
		<div className="container-user">

		{isReset?
			<ResetPassword 
				username={username}
				ID={userID}
				closeComponent={() =>showHandleIsReset()} 
			/>
		:""}

		<Navbar/>
			<div className="content-user">
				<div className="btn-update_user">
					<i className="icon-config" onClick={() => showHandleIsReset()}></i>
				</div>
				<div className="section-up">
					<div className="image_user"><img src={Logo} alt="image_do_usuario"/></div>
					<div className="nameFull"><h1>{name}</h1></div>
				</div>
				<div className="section-bottom">
					<div className="permitType"><label>Cargo</label><h2>{permitType}</h2></div>
					<div className="username"><h2>{username}</h2><label>username</label></div>
					<div className="nameComapany"><h2>{company}</h2><label>nome da empresa</label></div>
				</div>
			</div>
		</div>
	)
}