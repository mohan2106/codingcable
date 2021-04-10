import React,{Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
  constructor(props){
    super(props);
    console.log('[Persons.js] constructor called');
  }
  // static getDerivedStateFromProps(props,state){
  //   console.log('[Persons.js] getDerivedStateFromProps called',props);
  //   return state;
  // }
  shouldComponentUpdate(nextProps,nextState){
    console.log('[Persons.js] shouldComponentUpdate');
    if(nextProps.persons !== this.props.persons){
      return true;
    }else{
      return false;
    }
    // return true;
  }
  getSnapshotBeforeUpdate(prevProps,prevState){
    // console.log('[Persons.js] getSnapshotBeforeUpdate ');
    console.log('[Persons.js] getSnapshotBeforeUpdate prevProps: ', prevProps, ' newProps: ',  this.props);
    return {message : 'Snapshot'};
  }
  componentDidUpdate(prevProps,prevState,snapshot){
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }
  render(){
    console.log('[Persons.js] rendering...');
    return this.props.persons.map((p,index) => {
        return (
          <Person 
            click = {() => this.props.clicked(index)}
            changed = {(event) => this.props.changed(event,p.id)}
            name={p.name} 
            age = {p.age}
            key = {p.id}>
              My hobby is: Cricket
          </Person>
        );
      })
  }
  
};

export default Persons;