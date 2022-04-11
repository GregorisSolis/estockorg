import React, { Component } from 'react'
import api from '../../services/api'
import Navbar from '../../components/Navbar'
import Info from '../../components/Info'
import './configproduct.css'

export default class AddProduct extends Component{

	state = {
		name: '',
		barcode: '',
		companyCode: '',
		model:'',
		typeMaterial: '',
		color:'',
		size: '',
		amount: '',
		text: '',
		handleInfo: false,
		nameCompany: localStorage.getItem('@name-stock')
	}

	setNewProduct =  () => {
		const { name, barcode, companyCode, model, typeMaterial, color, size, amount, nameCompany } = this.state

		if(!name || !barcode || !companyCode || !model || !typeMaterial || !color || !size || !amount){
			this.setState({ handleInfo: true, text: 'Todos os campos deven ser prenchidos.' })
		}else if(isNaN(barcode) || barcode < 0){
			this.setState({ handleInfo: true, text: 'O companyCode de barra só pode conter numeros.' })
		}else if(isNaN(amount) || amount < 0){
			this.setState({ handleInfo: true, text: 'A quantidade do produto só pode conter numeros.' })
		}else{
			try{
				api.post('/product/add-product', {name, barcode, companyCode, model, typeMaterial, color, size, amount,  nameCompany})
				.then(res => {
					this.setState({ handleInfo: true, text: 'Produto cadastrado com sucesso.' })
					this.clearState()
				})
				.catch(err => {
					console.log(err)
					this.setState({ handleInfo: true, text: 'O codigo de barra ou o codigo da empresa ja foi cadastrado.'})
				})
			}
			catch(e){
					this.setState({ handleInfo: true, text: 'Erro ao cadastrar o produto.'})
			}
		}
		this.clearState()
	}

	
	clearState = () =>{
		setTimeout(() => {
		  this.setState({handleInfo: false})
		}, 4000);
	}

	render(){

		let { handleInfo, text } = this.state

	return(
		<div className="container-config_products">
			<Navbar/>
			{handleInfo?<Info mensagen={text}/>:''}
			<div className="content-config_products">
				<div className="title-config"><h1>Cadastrar Produto</h1></div>
				<form>
					<input name="name" type="text" placeholder="Nome do produto" onChange={e => this.setState({name: e.target.value})}/>
					<input name="barcode" type="text" placeholder="Codigo de barra" onChange={e => this.setState({barcode: e.target.value})}/>
					<input name="companyCode" type="text" placeholder="Codigo" onChange={e => this.setState({companyCode: e.target.value})}/>
					<input name="model" type="text" placeholder="Modelo" onChange={e => this.setState({model: e.target.value})}/>
					<input name="typeMaterial" type="text" placeholder="Material" onChange={e => this.setState({typeMaterial: e.target.value})}/>
					<input name="color" type="text" placeholder="Color" onChange={e => this.setState({color: e.target.value})}/>
					<input name="size" type="text" placeholder="Tamanho" onChange={e => this.setState({size: e.target.value})}/>
					<input name="amount" type="number" placeholder="Quantidade" onChange={e => this.setState({amount: e.target.value})}/>
				</form>
				<div className="btn-newProduct">
					<button onClick={() => this.setNewProduct()}>Agregar</button>
				</div>
			</div>
		</div>
	)
	}
}
