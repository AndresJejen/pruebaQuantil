import React, { Component } from 'react';
import { Redirect } from 'react-router'

import './Auth.css';

class Magia extends Component {

  constructor(props) {
    super(props);
    this.state = {
        title: '',
        back : false
    };
  }

  submitHandler = event => {
    event.preventDefault();
    let requestBody = {
        query: `
          query {
            nuevodia{
              fecha
              demanda
            }
          }
        `
      };

    // NuevoDato
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
        let response = resData.data.nuevodia;
        if (response) {
                console.log(response)
                this.setState({back: true});
                return 0;
        }
        console.log(this.state)
      })
      .catch(err => {
        console.log(err);
      });
}

render() {

    if (this.state.back === true) {
        return <Redirect to='/historico' />
      }
    return (
        <form onSubmit={this.submitHandler}>
            <button type="submit"> Nuevo Día </button>
        </form>
    );
  }
}

export default Magia;