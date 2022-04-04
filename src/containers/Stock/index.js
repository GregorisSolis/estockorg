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
		isProduct: true
	}

	getProduct = () =>{
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

	clearState = () =>{
		setTimeout(() => {
		  this.setState({isInfo: true})
		}, 6000);
	}

	render(){
		return(
			<div className="container-stock">
				<Navbar/>
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