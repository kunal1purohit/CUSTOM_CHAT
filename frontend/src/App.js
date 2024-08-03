
import { Route } from 'react-router-dom';
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import Home from './Pages/Home.js';
import Chats from './Pages/Chats.js';


function App() {
  return (
    <div className="App">
      
      <Route path="/" component={Home} exact/>
      <Route path='/chats' component={Chats}/>

    </div>
  );
}

export default App;
