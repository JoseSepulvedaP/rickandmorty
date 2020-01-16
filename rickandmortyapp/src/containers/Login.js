import React, { Component } from 'react';
import './Forms.css';
import { API_URL } from '../config/config';
import Swal from 'sweetalert2';

class LoginBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: []
    };
  }

  onUsernameChange(e) {
    this.setState({username: e.target.value});
    this.clearValidationErr('username');
  }

  onPasswordChange(e) {
    this.setState({password: e.target.value});
    this.clearValidationErr('password');
  }

  showValidationErr(elm, msg) {
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors, {
          elm,
          msg
        }
      ]
    }));
  }

  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    });
  }


  login() {
    let data = {
      username: this.state.username ? this.state.username : '',
      password: this.state.password ? this.state.password : ''
    }
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .catch(error => {
      Swal.fire({
        title: 'No es posible iniciar sesion',
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
    .then(response => 
    {
      if (!response.ok) {
        Swal.fire({
          title: response.err.message,
          text: response.err.message === 'No existe el usuario, favor registrarse' ? 'Desea registrarse?' : '',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
            if (response.err.message !== 'No existe el usuario, favor registrarse') {
                this.render();
            } else {
              this.props.callback();
            }
            
          }
        });
      } else {
        this.props.route(response.token);
      }
    });
  }

  submitLogin(e) {

    if (this.state.username === '') {
      this.showValidationErr('username', 'El campo Usuario no puede estar vacío');
    }
    if (this.state.password === '') {
      this.showValidationErr('password', 'El campo Contraseña no puede estar vacío');
    }

    if (this.state.username !== '' && this.state.password !== '') {
        this.login();
    }

  }

  render() {

    let usernameErr = null;
    let passwordErr = null;

    for (let err of this.state.errors) {
      if (err.elm == 'username') {
        usernameErr = err.msg;
      }
      if (err.elm == 'password') {
        passwordErr = err.msg;
      }
    }
    
    return (
      <div className="inner-container">
        <div className="header">
          Login
        </div>
        <div className="box">

        <form></form>
          <div className="input-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this.onUsernameChange.bind(this)}/>
              <small className="danger-error">
                {usernameErr ? usernameErr : ''}
              </small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onPasswordChange.bind(this)}/>
              <small className="danger-error">
                {passwordErr ? passwordErr : ''}
              </small>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this.submitLogin.bind(this)}>Login
          </button>

        </div>
      </div>
    );
  }

}

export default LoginBox;