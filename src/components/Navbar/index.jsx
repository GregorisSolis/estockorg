import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { logout } from '../../services/auth'


export default function Navbar(){

    let isAuthentication = false
    const TOKEN = localStorage.getItem('stock-token')

    if(TOKEN !== null){
        isAuthentication = true
    }

    return(
        <div className='container-nav'>
            { isAuthentication ? 
                <nav className="nav_estockor">
                    <Link  className="item-link" to='/stock'><i className="icon-stock"></i><p>Estoque</p></Link>
                    <Link  className="item-link" to='/ferramenta'><i className="icon-config"></i><p>Ferramenta</p></Link>
                    <Link  className="item-link" to='/user'><i className="icon-user"></i><p>User</p></Link>
                    <Link  className="item-link" to='/login' onClick={() => logout()}><i className="icon-logout"></i><p>Sair</p></Link>
                </nav> :
                <nav className="isNotUser_nav">
                    <div>
                        <h1>Estockorg</h1>
                    </div>
                    <div className="btn-link">
                        <Link  className="item-link" to='/login'>Login</Link>
                        <Link  className="item-link" to='/register'>Register</Link>
                    </div>
                </nav>
            }
        </div>
    )
}