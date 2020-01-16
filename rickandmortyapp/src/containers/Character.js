import React, { Component } from "react";
import { API_URL } from '../config/config';
import reactDOM from 'react-dom';
import App from '../App';
import Swal from 'sweetalert2';
import './Character.css';
 
class Character extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: null,
            token: props.token
        };
    }

    componentDidMount() {
        this.getDataCharacters()
    }

    getDataCharacters() {
        this.setState({isLoaded: false, data: null});
        fetch(`${API_URL}/character`, {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'token': this.state.token
            }
          }).then(res => res.json())
          .catch(error => {
            Swal.fire({
                title: 'No es posible obtener la data',
                text: 'Es imposible conectarse con el servidor, favor intente mas tarde',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.value) {
                  this.render();
                }
              });
          })
          .then(response => {
              if (!response.ok) {
                this.setState({isLoaded: true, data: []});
                Swal.fire({
                    title: 'Sesion expirada',
                    text: 'Desea iniciar sesion?',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result.value) {
                      this.backToLogin();
                    }
                  });
              } else {
                this.setState({isLoaded: true, data: response.data});
              }
          });
    }

    backToLogin() {
        reactDOM.render(
            <App/>, document.getElementById("root"));
    }

    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div className="loader-align"><div className="loader"></div></div>
        } else {
            return (
                <div className="container">
                    <h1 className="center">Personajes de Rick and Morty</h1>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th className="left" >Avatar</th>
                            <th className="center">Nombre</th>
                            <th className="center">Especie</th>
                            <th className="center">Genero</th>
                            <th className="center">status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map(item => (    
                            <React.Fragment key={item.image}>
                                <tr>
                                <td className="center"><img className="img" src={item.image}/></td>
                                <td className="center">{item.name}</td>
                                <td className="center">{item.species}</td>
                                <td className="center">{item.gender}</td>
                                <td className="center">{item.status}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                
                        </tbody>
                    </table>
                    <div className="right">
                        {this.state.data.length > 0 && 
                            <button
                                type="button"
                                className="login-btn"
                                onClick={this.getDataCharacters.bind(this)}>Refresh
                            </button>

                        }
                        {this.state.data.length === 0 && 
                            <button
                                type="button"
                                className="login-btn"
                                onClick={this.backToLogin.bind(this)}>Back to Login
                            </button>
                        }
                    </div>
                    
                </div>
            );
        }
    }
}
 
export default Character;

