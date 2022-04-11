import React from 'react'
import './itemProduct.css'
import UpdateProduct from '../../components/UpdateProduct'
import { useSelector, useDispatch } from 'react-redux'
import { clickButton } from '../../store/actions'
import { setProductID } from '../../store/actions'


export default function ItemProduct(props){

	const handleEdit = useSelector(state => state.updateComponentState.value)
	const dispatch = useDispatch() 

	const switchUpdateProduct = () =>{
		dispatch(setProductID(props.productID))
		dispatch(clickButton(true))
	}

	return(
		<>

		{handleEdit?<UpdateProduct reloadProduct={props.reloadProduct}/>:''}

		<div className="item-product">
			<div className="title-product">
				<h1>{props.name}</h1>
			</div>
			<div className="description-product">
				<div className="section-product">				
					<div className="content-info_item"><p><strong>Modelo</strong></p><p className="response_product">{props.model}</p></div>
					<div className="content-info_item"><p><strong>Color</strong></p><p className="response_product">{props.color}</p></div>
					<div className="content-info_item"><p><strong>barcode</strong></p><p className="response_product">{props.barcode}</p></div>
				</div>

				<div className="section-product">	
					<div className="content-info_item"><p><strong>quantidade</strong></p><p className="response_product">{props.amount}</p></div>
					<div className="content-info_item"><p><strong>codigo</strong></p><p className="response_product">{props.companyCode}</p></div>
				</div>

				<div className="section-product">
					<div className="content-info_item"><p><strong>tamanho</strong></p><p className="response_product">{props.size}</p></div>
					<div className="content-info_item"><p><strong>Material</strong></p><p className="response_product">{props.typeMaterial}</p></div>
					<div className="btn_actions">
						<button onClick={() => switchUpdateProduct()} className="btn-edit">editar</button>
					</div>
				</div>
			</div>
		</div>
		</>
	)
}