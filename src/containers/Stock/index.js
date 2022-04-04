import React,{Component} from 'react'
import Navbar from '../../components/Navbar'
import ItemProduct from '../../components/ItemProduct'
import NotProduct from '../../components/NotProduct'
import Info from '../../components/Info'
import './stock.css'

import api from '../../services/api'


export default class Stock extends Component{

	componentDidMount(){
		this.getProduct()
	}

	state = {
		list: [],
		nameCompany: localStorage.getItem("@name-stock"),
		text: '',
		isInfo: false,
		isProduct: true,
		getBarcode: ''
	}

	getProduct = () => {
		 api.get(`product/list-product/${this.state.nameCompany}`)
		.then(res => {
			if(res.data.products.length > 0){
				this.setState({list: res.data.products, isProduct: false})
			}
		})
		.catch(e => {
			this.setState({text: 'Erro ao conectar.', isInfo: true})
			this.clearState()
		})
	}

	searchProduct = e => {
		e.preventDefault()
		if(this.state.getBarcode !== ''){
			api.get(`/product/product-info/${this.state.getBarcode}`)
			.then(res =>{
				if(res.data.product.length === 0){
					this.setState({text: 'O codigo de barra não existe.', isInfo: true})
				}else{
					this.setState({list: res.data.product})
				}
			})
			.catch(err => {
				this.setState({text: 'O codigo de barra não existe.', isInfo: true})
			})
		}
		this.clearState()
	}

	clearState = () =>{
		setTimeout(() => {
		  this.setState({isInfo: false})
		}, 4000);
	}

	render(){
		return(
			<div className="container-stock">
				<Navbar/>

				<div className="panel-stock">
					<div className="showData">
						<div className="item-showData">
							<p><strong>Quantidade de produto:</strong></p><p>{this.state.list.length}</p>
						</div>
						<div className="item-showData">
							<p><strong>Nome da empresa:</strong></p><p>{this.state.nameCompany}</p>
						</div>						
						<div className="item-showData-input">
							<form className="panel-search_stock" onSubmit={this.searchProduct}>
								<input type="search" placeholder="Digite o codigo de barra..." onChange={e => this.setState({getBarcode: e.target.value})}/>
								<button type="submit">Buscar<i className="icon-search"></i></button>
							</form>
						</div>
					</div>
				</div>

				{this.state.isInfo?<Info mensagen={this.state.text}/>:
				<div className="content-stock">
					{this.state.isProduct ? <NotProduct text="Ainda não tem produtos cadastrados"/>:''}
					{this.state.list.map((item) => (
						<ItemProduct 
							key={item._id}
							productID={item._id}
							name={item.name} 
							model={item.model}
							barcode={item.barcode}
							size={item.size}
							color={item.color}
							companyCode={item.companyCode}
							typeMaterial={item.typeMaterial}
							amount={item.amount}
							reloadProduct={() => this.getProduct()}
						/>
					))}
				</div>
				}
			</div>
		)
	}
}