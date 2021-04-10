import  React, {useEffect} from 'react';
import style from './Cockpit.module.css';


function Cockpit(props){
    useEffect(() => {
      //this function will be called eact time this Cockpit function is rendered
      console.log('[Cockpit.js] useEffect');
      //HTTP request... 
      setTimeout(()=>{
        console.log('Saved Data in cloud!');
      },1000);
      return ()=>{
        console.log('[Cockpit.js] cleanup in cockpit')
      }
    },[]);
    //^| ^ this field says that call this funtion only when props.person is changed
    //If you want to make this function call for only ones (at the time of creation) then simply pass empty array []
    useEffect(() => {
      //this function will be called eact time this Cockpit function is rendered
      console.log('[Cockpit.js] 2nd useEffect');
      //HTTP request... 
      return ()=>{
        console.log('[Cockpit.js] cleanup in cockpit')
      }
    });
    let classes = [];
    let buttonClass = '';
    if(props.show){
      buttonClass = style.redButton;
    }else{
      buttonClass = style.button;
    }
    if(props.personsLen <= 2){
      classes.push(style.red);
    }
    if(props.personsLen <= 1){
      classes.push(style.bold);
    }
    
    return(
        <div>
            <h1>Hi this is {props.title}</h1>
            <p className={classes.join(' ')}>This is really working</p>
            <button className={buttonClass} onClick={props.toggle} >Switch Name</button>
        </div>
    );
}

export default React.memo(Cockpit);

//Useing react memo react will save the state of Funcitonal component 
//and use that memo if the data is not changed rather then again creating teh same component