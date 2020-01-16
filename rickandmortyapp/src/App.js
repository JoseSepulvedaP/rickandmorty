import React, { Component } from 'react';
import reactDOM from 'react-dom';
import LoginBox from './containers/Login';
import RegisterBox from './containers/Register';
import Character from './containers/Character';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false,
      token: null
    };
  }

  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }



  showDataCharacters(token) {
    this.setState({token});
    reactDOM.render(
      <Character token={token}/>, document.getElementById("root"));
  }

  render() {

    return (
      <div className="root-container">

        { !this.state.token &&
          <div className="box-controller">
          <div
            className={"controller " + (this.state.isLoginOpen ? "selected-controller" : '')}
            onClick={this.showLoginBox.bind(this)}>
            Login
          </div>
          <div
            className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : '')}
            onClick={this.showRegisterBox.bind(this)}>
            Register
          </div>
        </div>
        }
 
        <div className="box-container">
          {this.state.isLoginOpen && <LoginBox callback={this.showRegisterBox.bind(this)} route={this.showDataCharacters.bind(this)}/>}
          {this.state.isRegisterOpen && <RegisterBox callback={this.showLoginBox.bind(this)} />}
        </div>

      </div>
    );

  }

}

export default App;

reactDOM.render(
  <App/>, document.getElementById("root"));
