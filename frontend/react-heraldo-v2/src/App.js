import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './components/css/styleLogin.css'
import Header from './components/Header.js';
import SectionNews from './components/SectionNews.jsx'
import Footer from './components/Footer.js';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import AdminNews from './components/AdminNews.jsx'
import ShowNotice from './components/ShowNotice.jsx'

function App() {

  if (!localStorage.getItem("USER_SESSION") && window.location.pathname == '/admin') {
    window.location.href = "/login";
  }
  
  if (localStorage.getItem("USER_SESSION") && (window.location.pathname == '/login' || window.location.pathname == 'registrarse' )) {
    window.location.href = "/admin";
  }

  return (

    <Router>
      <div className="container-fluid bg-gray-lit h-100 overflow-auto d-flex flex-column ">
        <div className="container w-1400 bg-white d-flex flex-column flex-1-0-auto px-3 px-md-5">
          <Header />
          <Switch>
            <Route path="/notice/:id">
              <ShowNotice />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/registrarse">
              <div className="log-container">
                <Register />
              </div>
            </Route>
            <Route path="/admin" component={AdminNews} />
            <Route path="/" component={SectionNews} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
