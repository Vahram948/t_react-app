import EventList from './pages/EventList';
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from './context';
import { initialState, reducer } from './context/Reducer';

function App() {
  return (
    <div className="App">
      <GlobalProvider state={initialState} reducer={reducer}>
        <ToastContainer position="top-right"/>
        <EventList />
      </GlobalProvider>
    </div>
  );
}

export default App;
