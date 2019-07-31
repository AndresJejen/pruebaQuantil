import React, {Component} from 'react';
import Plot from 'react-plotly.js';

import './grafica.css';

class Grafica extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    render(){

        console.log(this.props.xdata)
        console.log(this.props.ydata)

        return(
            <Plot className="grafica"
                data={[
                {
                    x: this.props.xdata,
                    y: this.props.ydata,
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'red'},
                }
                ]}
                layout={ {width: "100%", height: "100%", title: this.props.titulo} }
            ></Plot>      
        )
    }   
}

export default Grafica;