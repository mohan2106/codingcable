// import logo from './logo.svg';
import React, { Component } from 'react';
// import ErrorBoundry from '../ErrorBoundry/ErrorBoundry.js';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';
import './App.css';

/*
Component Lifecycle [Update]
..........................................................
getDerivedStateFromProps(props,state) ->
shouldComponentUpdate(nextProps,nextState) ->
render() ->
Update Child Component Props ->
getSnapshotBeforeUpdate(prevProps,prevState) ->
componentDidUpdate()
*/

class App extends Component { 
  constructor(props){
    super(props);
    console.log('[App.js] constructor called.');
  }
  // static getDerivedStateFromProps(props,state){
  //   console.log('[App.js] getDerivedFromState called.');
  //   console.log(props);
  //   return state;
  // }
  componentDidMount(){
    console.log('[App.js] componenetDidMount')
  }
  // componentWillMount(){
    // console.log('[App.js] componentWillMount')
  // }
  state = {
    persons : [
      {
        id : 'dflkjd',
        name : 'Max',
        age : 45
      },
      {
        id : 'dfjk',
        name : 'Mohan',
        age : 23
      },
      {
        id : 'aeoiru',
        name : 'Prachi',
        age : 22
      }
    ],
    showPersons : true,
  }
  getSnapshotBeforeUpdate(prevProps,prevState){
    console.log('[App.js] getSnapshotBeforeUpdate prevProps: ', prevState, ' newProps: ',  this.state);
    return null;
  }
  shouldComponentUpdate(nextProps,nextState){
    //this function will be called before updation of state
    return true;
  }
  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  componentWillUnmount(){
    console.log('[App.js] componentWillUnmount');
  }

  nameChangedHandler = (event, id) => {
    let data = this.state.persons.map(p => {
      if(p.id === id){
        p.name = event.target.value;
        return p;
      }else{
        return p;
      }
    }) 
    this.setState({
      persons : data
    })
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons : !doesShow});
  }

  deletePersonHandler = (index) =>{
    let per = [...this.state.persons]; //Very Important if not useing ... it means that you are useing the same persons state
    per.splice(index,1);
    this.setState({persons : per});
  }
  

  render() {
    console.log('[App.js] render function called');
    let personData = null;
    if(this.state.showPersons){
      personData = (<div>
        {
          <Persons 
            persons = {this.state.persons}
            clicked = {this.deletePersonHandler}
            changed = {this.nameChangedHandler}>
          </Persons>
        }
      </div>);
    }

    


    return (
      <div className="App">
          <Cockpit 
          title = {this.props.appTitle}
          personsLen = {this.state.persons.length}
          show = {this.state.showPersons}
          toggle = {this.togglePersonHandler}></Cockpit>
          { personData }
      </div>
    );
  }
}

export default App;
