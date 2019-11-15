import React,{Fragment} from 'react'
import {Link} from 'react-router-dom';
import GoogleAuth from './GoogleAuth'

class Header extends React.Component{
    render(){
        return(
            <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div className="container">
                <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <GoogleAuth userEmail={this.props.userEmail} saveUser={this.props.saveUser}/>
                   
               </li>
                    {this.props.userEmail && 
                        <Fragment>
                            <li className="nav-item"><Link className="navbar-brand" to={'/module'}>Module</Link></li>
                            <li className="nav-item"><Link className="navbar-brand" to={'/quiz'}>Take Quiz</Link></li>
                        </Fragment>
                    }
                      </ul>
                    </div>
                </div>

                
            </div>
        )
    }
}
export default Header;