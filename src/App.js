import logo from './logo.svg';
import './App.css';
import { getAsset } from './services/messari';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io("http://localhost:8080");


function App() {
  
  const handleSubmit = () => {
    socket.emit('message', 'Holiii');
  }

  useEffect(() => {

    socket.on('data', (data) => {
      console.log(data);
    })
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleSubmit}>Enviar</button>
      </header>
    </div>
  );
}

export default App;
