import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../context/Auto-Context';

class Login extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.displayNameEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    let displayName = null;

    if(!this.state.isLogin) { displayName = this.displayNameEl.current.value;}

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!, $displayName: String!) {
            createUser(userInput: {email: $email, password: $password, displayName: $displayName}) {
              _id
              email
              displayName
            }
          }
        `,
        variables: {
          email: email,
          password: password,
          displayName: displayName
        }
      };
    }

    fetch('http://23.239.2.183:8000/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>

<form onSubmit={this.submitHandler}>
<label>Inicia Sesión Electry</label>
<input type="email" name="email" placeholder="Email" ref={this.emailEl} autoComplete="off" required />
<input type="password" name="password" placeholder="Contraseña" autoComplete="off" id="password" ref={this.passwordEl} required />
{ !this.state.isLogin &&
    <input type="text" id="displayName" placeholder="Nombre" autoComplete="off" ref={this.displayNameEl} required />
}
<button type="submit">Enviar</button>
<button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
</form>
<div className="overlay" id="overlay"></div>

</div>
    );
  }
}

export default Login;