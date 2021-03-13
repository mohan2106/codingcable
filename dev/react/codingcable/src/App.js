import logo from './logo2.svg';
import fb from './fb.svg';
import insta from './insta.svg';
import twitter from './twitter.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Coding Cable</h1>
      <h2>Competetive Coding course for K12 students.</h2>
      <br></br>
      <br></br>
      <br></br>
      <img src={logo} className="App-logo" alt="logo" />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h3>Welcome Future Coders.</h3>
      <h3> Stay tuned with us on our social media profiles.</h3>
      <h3>We are coming soon</h3>
      <a href='https://www.instagram.com/codingcable'>
        <img src={insta} alt="fb"/>
        </a>
        <a href='https://www.facebook.com/CodingCable-100239938797987'>
        <img src={fb} alt="fb"/>
        </a>
        <a href='https://twitter.com/CableCoding'>
        <img src={twitter} alt="fb"/>
        </a>
    </div>
  );
}

export default App;
