
import React from 'react'

class GoogleAuth extends React.Component{
    state={
        isSignedIn: null
    }

    componentDidMount(){
        //when component mounts, we load the google client auth script
        window.gapi.load('client:auth2',()=>{
            //once the auth script is loaded, we initialize for our client id updated 
            window.gapi.client.init({
                clientId:'3407753133-e3et1npm884lr3limcsfmb2e9qc4snmg.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                //once the client is initialized, we check if user is signed in or not
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()})
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onSignIn = ()=>{
        this.auth.signIn().then(res=>{
            const userEmail = this.auth.currentUser.get().getBasicProfile().getEmail();
            const userName = this.auth.currentUser.get().getBasicProfile().getName();
            this.props.saveUser(userEmail)
           
        })
    }

    onSignOut = ()=>{
        this.auth.signOut();
        window.location.href="https://kenyaquiz.herokuapp.com/";
    }

    onAuthChange =()=>{
        this.setState({isSignedIn:this.auth.isSignedIn.get()})
    
    }


    render(){
        return(
            <div className="nav-link">
                   {this.state.isSignedIn && <p className="bs-component" onClick={this.onSignOut}>
                    <button type="button" className="btn btn-info">Sign Out</button>
                   </p>}

                   {!this.state.isSignedIn && <p className="bs-component" onClick={this.onSignIn}>
                    <button type="button" className="btn btn-primary">Sign In with Google</button>
                   </p>
                }
                
            </div>

        )
    }
}

export default GoogleAuth;