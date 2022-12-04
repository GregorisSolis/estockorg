import React, { Component } from 'react'
import Navbar from '../../components/Navbar'
import ItemProduct from '../../components/ItemProduct'
import api from '../../services/api'
import Info from '../../components/Info'
import './searchproduct.css'

export default class SearchProduct extends Component{

	state = {
		ID: '',
		name: '',
		size: '',
		companyCode: '',
		barcode: '',
		model: '',
		amount: '',
		typeMaterial: '',
		color: '',
		text: '',
		getBarcode: '',
		isInfo: false,
		confirmRemoveProdcut: '',
		isCompoentRemove: false
	}

	clearState = () =>{
		setTimeout(() => {
		  this.setState({isInfo: false})
		}, 6000);
	}

	loadingDataProduct = getBarcode => {
		api.get(`/product/product-info/${getBarcode}`)
		.then(res =>{
			this.setState({
				ID: res.data.product[0]._id,
				name: res.data.product[0].name,
				size: res.data.product[0].size,
				barcode: res.data.product[0].barcode,
				companyCode: res.data.product[0].companyCode,
				amount: res.data.product[0].amount,
				model: res.data.product[0].model,
				color: res.data.product[0].color,
				typeMaterial: res.data.product[0].typeMaterial,
			})
		})
		.catch(err => {
			this.setState({text: 'O codigo de barra não existe.', isInfo: true})
			this.clearState()
		})
	}

	searchProduct = e => {
		e.preventDefault()

		const { getBarcode } = this.state
		
		if(!getBarcode){
				this.setState({text: 'O codigo de barra não existe', isInfo: true})
				this.clearState()
		}else{
			this.loadingDataProduct(getBarcode)
		}
	}

	isProduct = () => {
		if(!this.state.ID){
			this.setState({text: 'O codigo de barra não existe.', isInfo: true})
			this.clearState()
		}else{
			this.setState({isCompoentRemove: true})
		}
	}

	removeProduct = e => {
		e.preventDefault()

		const { confirmRemoveProdcut, companyCode, ID, barcode } = this.state


		if(!barcode){
			this.setState({text: 'O codigo de barra não existe.', isInfo: true})
			this.clearState()
		}else{

			if(confirmRemoveProdcut !== companyCode){
				this.setState({text: 'Não foi possivel deletar o produto, digite o codigo por favor.', isInfo: true})
				this.clearState()
			}else{
				api.delete(`/product/delete-product/${ID}`)
				.then(res =>{
					this.setState({
						ID: '',
						name: '',
						size: '',
						barcode: '',
						companyCode: '',
						amount: '',
						model:'',
						color: '',
						typeMaterial: '',
						text: 'O produto foi deletado com sucesso.',
						isInfo: true,
						isCompoentRemove: false
					})
					this.clearState()			
				})
				.catch(err => {
					this.setState({text: 'O produto não foi deletado.', isInfo: true})
					this.clearState()
				})
				}

		}
	}


	render(){

		const { 
			barcode, 
			getBarcode, 
			isInfo, 
			text, 
			name, 
			size, 
			companyCode, 
			model, 
			amount, 
			ID, 
			color, 
			typeMaterial, 
			isCompoentRemove 
		} = this.state

		return(
			<div className="container-search">
				<Navbar/>
				{isInfo?<Info mensagen={text}/>:''}
				<div className="content-search">
					<form className="panel-search" onSubmit={this.searchProduct}>
						<input type="search" placeholder="buscar produto..." onChange={e => this.setState({getBarcode: e.target.value})}/>
						<div className="btn_actions">
							<button type="submit">Buscar <i className="icon-search"></i></button>
							<button onClick={() => this.isProduct()} className="btn-remover_product">Remover<i className="icon-delete"></i></button>
						</div>
					</form>

						<ItemProduct 
							key={ID}
							productID={ID}
							name={name} 
							model={model}
							barcode={barcode}
							size={size}
							color={color}
							companyCode={companyCode}
							typeMaterial={typeMaterial}
							amount={amount}
							reloadProduct={() => this.loadingDataProduct(getBarcode)}
						/>
				</div>

				{isCompoentRemove?
				<div className="input_confirmRemove">
					<form className="form_confirmRemove" onSubmit={this.removeProduct}>
						<label>{`Digite o codigo ${companyCode} para deletar`}</label>
						<input type="search" placeholder={`Digite o codigo...`} onChange={e => this.setState({confirmRemoveProdcut: e.target.value})}/>
						<div className="btn_actions">
							<button className="btn-remove" type="submit">Deletar</button>
							<button onClick={() => this.setState({isCompoentRemove: false})}>Cerrar</button>
						</div>
					</form>
				</div>:''}
			</div>
		)
	}
}
