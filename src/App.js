import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Customer from './components/customer';
import LoginForm from './components/loginForm';
import MovieDetails from './components/movieDetails';
import Movies from './components/movies';
import NavBar from './components/navBar';
import NotFound from './components/notFound';
import Rental from './components/rental';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';

function App() {
  return (
    <div className="page-header header container-fluid">
      <ToastContainer/>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/rentals" component={Rental}/>
          <Route path="/customers" component={Customer}/>
          <Route path="/movieDetails/:id" component={MovieDetails} />
          <Route path="/not-found" component={NotFound}/>
          <Route path="/login" component={LoginForm}/>
          <Route path="/register" component={RegisterForm}/>
          <Route path="/movieForm/:id" component={MovieForm}/>
          <Route path="/movieForm/new" component={MovieForm}/>
          <Route path="/" exact component={Movies}/>
          <Redirect to="not-found"/>
          {/* render={(props)=><Movies {...props}/>} */}
        </Switch>        
      </div>
    </div>
  );
}

export default App;
