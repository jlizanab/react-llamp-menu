import LavalampMenu from './lib/components/LavalampMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className='center'>react-llamp-menu demo</h1>
      <h3>Basic example (without extra css)</h3>
      <LavalampMenu className="optionsMenu">
        <ul>
          <li><button onClick={()=>console.log('option 1')}>One</button></li>
          <li><button onClick={()=>console.log('option 2')}>Two</button></li>
          <li><button onClick={()=>console.log('option 3')}>Three</button></li>
        </ul>
      </LavalampMenu>

      <hr/>
      <h3>Rounded marker</h3>
      <LavalampMenu className="optionsMenu2">
        <ul>
          <li><button onClick={()=>console.log('option 1')}>First option</button></li>
          <li><button onClick={()=>console.log('option 2')}>Second option</button></li>
          <li><button onClick={()=>console.log('option 3')}>Third option</button></li>
        </ul>
      </LavalampMenu>

      <hr/>
      <h3>tab Style</h3>
      <LavalampMenu className="optionsMenu3">
        <ul>
          <li><button onClick={()=>console.log('option 1')}>First option</button></li>
          <li><button onClick={()=>console.log('option 2')}>Second option</button></li>
          <li><button onClick={()=>console.log('option 3')}>Third option</button></li>
        </ul>
      </LavalampMenu>
    </div>
  );
}

export default App;
