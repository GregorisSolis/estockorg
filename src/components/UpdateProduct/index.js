import React, { useEffect, useState } from 'react'
import './updateProduct.css'
import api from '../../services/api'
import Info from '../../components/Info'

import { useSelector, useDispatch } from 'react-redux'
import { clickButton } from '../../store/actions'

export default function UpdateProduct(props){

	useEffect(() => {
	  	loadingDataProduct()
	}, []);

	const getID = useSelector(state => state.getIDState.productID)
	const dispatch = useDispatch() 

	const [name, setName] = useState('')
	const [barcode, setBarcode] = useState('')
	const [size, setSize] = useState('')
	const [typeMaterial, setTypeMaterial] = useState('')
	const [model, setModel] = useState('')
	const [companyCode, setCompanyCode] = useState('')
	const [color, setColor] = useState('')
	const [amount, setAmount] = useState('')
	const [text, setText] = useState('')
	const [isInfo, setIsInfo] = useState(false)

	const clearState = () =>{
		setTimeout(() => {
		  setIsInfo(false)
		}, 6000);
	}

	const loadingDataProduct = async ()=> {

		await api.get(`/product/product-data/${getID}`)
		.then(resp => {
			setName(resp.data.product.name)
			setBarcode(resp.data.product.barcode)
			setSize(resp.data.product.size)
			setTypeMaterial(resp.data.product.typeMaterial)
			setModel(resp.data.product.model)
			setCompanyCode(resp.data.product.companyCode)
			setColor(resp.data.product.color)
			setAmount(resp.data.product.amount)
		})
		.catch(err => {
			setIsInfo(true)
			setText('Erro ao conectar com o banco de dados.')
			clearState()
		})
	}

	const setUpdateProduct = () =>{

		api.put(`/product/edit-product/${getID}`,{name,barcode,size,typeMaterial,model,companyCode,color,amount})
		.then(resp =>{
			setIsInfo(true)
			setText('O produto foi editado com sucesso.')
			clearState()
			props.reloadProduct()
		})
		.catch(err => {
			console.log(err)
			setIsInfo(true)
			setText('O produto não foi editado.')
			clearState()
		})
	}

	return(
		<div className="container-update_product">
			
			{isInfo?<Info mensagen={text}/>:''}

			<div className="form-update_product">
				<div className="title_update_product">
					<h2>Editar Produto</h2>
				</div>
				<div className="input_update-product">
					<input type="text" name="name" placeholder="Nome do produto" defaultValue={name} onChange={e => setName(e.target.value)}/>
					<input type="text" name="model" placeholder="Modelo" defaultValue={model} onChange={e => setModel(e.target.value)}/>
					<input type="text" name="barcode" placeholder="Codigo de barra" defaultValue={barcode} onChange={e => setBarcode(e.target.value)}/>
					<input type="text" name="companyCode" placeholder="codigo" defaultValue={companyCode} onChange={e => setCompanyCode(e.target.value)}/>
					<input type="text" name="size" placeholder="Tamanho" defaultValue={size} onChange={e => setSize(e.target.value)}/>
					<input type="text" name="color" placeholder="Cor" defaultValue={color} onChange={e => setColor(e.target.value)}/>
					<input type="text" name="typeMaterial" placeholder="Material" defaultValue={typeMaterial} onChange={e => setTypeMaterial(e.target.value)}/>
					<input type="number" name="amount" placeholder="Quantidade" defaultValue={amount} onChange={e => setAmount(e.target.value)}/>
				</div>
				<div className="btns-update">
					<button className="btn_confirmar" onClick={() => setUpdateProduct()}>Confirmar</button>
					<button className="btn_cancelar" onClick={() => dispatch(clickButton(false))}>Fechar</button>
				</div>
			</div>
		</div>
	)
}