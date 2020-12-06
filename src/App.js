import EventList from './pages/EventList';
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <ToastContainer position="top-right"/>
        <EventList />
      </GlobalProvider>
    </div>
  );
}

export default App;
