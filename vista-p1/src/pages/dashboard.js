import React, {Component} from 'react';

import Grafica from '../components/grafica/grafica';

import './dashboard.css';

import { NavLink } from 'react-router-dom';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "Historico",
            fecha: '',
            demanda: 0,
            demandas: [],
            fechas: []
        }
    }

    componentDidMount(){
        this.Traerdata();    
    }

    Traerdata(){
    
        let requestBody = {
          query: `
            query {
              demandassemana{
                fecha
                demanda
              }
            }
          `
        };

        let requestHoyBody = {
            query: `
              query {
                demandahoy{
                  fecha
                  demanda
                }
              }
            `
          };

        let demandas = [];
        let fechas = [];
    
        // Semana
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
            let response = resData.data.demandassemana;
            if (response) {
                this.setState({fechas: [],demandas: []});
                response.map(doc => {
                    demandas.push(doc.demanda);
                    fechas.push(doc.fecha); 

                    this.setState({fechas: fechas,demandas: demandas})
                    //this.setState({fechas: this.state.fechas.push(doc.fecha),demandas: this.state.demandas.push(doc.demanda)})
                    return 0;
                });
            }
            console.log(this.state)
          })
          .catch(err => {
            console.log(err);
          });


          fetch('http://23.239.2.183:8000/api', {
            method: 'POST',
            body: JSON.stringify(requestHoyBody),
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
              let response = resData.data.demandahoy;
              if (response) {
                  response.map(doc => {
                      this.setState({fecha: doc.fecha,demanda: doc.demanda})
                      //this.setState({fechas: this.state.fechas.push(doc.fecha),demandas: this.state.demandas.push(doc.demanda)})
                      return 0;
                  });
              }
              console.log(this.state)
            })
            .catch(err => {
              console.log(err);
            });
      };

    render(){
        return(
            <div className="main-wrapper">
                <div className="wrapper">
                    <div className="featured">
                        <Grafica titulo={this.state.title} xdata={this.state.fechas} ydata={this.state.demandas}></Grafica>
                    </div>
                    <div className="sub-featured">    
                            <div className="sub1">                               
                                    <NavLink to="/prediccion">
                                        <h3>Prediccion siguiente semana</h3>
                                    </NavLink>
                            </div>
                            <div className="sub2">
                                <h3>Fecha: {this.state.fecha}</h3>
                                <h3>Demanda: {this.state.demanda}</h3>
                            </div>
                            <div className="sub3">
                                <NavLink to="/magia">
                                        <h3>Magia</h3>
                                </NavLink>
                            </div>                    
                        </div>
                    </div>
                </div>
        )
    }   
}

export default Dashboard;