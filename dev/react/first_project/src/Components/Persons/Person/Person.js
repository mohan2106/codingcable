import React, {Component} from 'react';
import classes from './Person.module.css';

class Person extends Component {
    constructor(props){
        super(props);
        console.log('[Person.js] constructor called')
    }
    render(){
        return (
            <div className = {classes.person}>
                <h1 onClick = {this.props.click}>I am a {this.props.name} and I am {this.props.age} years old .</h1>
                <h3>{this.props.children}</h3>
                <input type="text" onChange={ this.props.changed} value = { this.props.name}/>
            </div>
        );
    }
    
}

export default Person;