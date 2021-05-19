import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import  './components/css/styleLogin.css'
import Header from './components/Header.js';
import SectionNews from './components/SectionNews.jsx'
import Footer from './components/Footer.js';
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import AdminNews from './components/AdminNews.jsx'


function App() {
  return (

    <Router>
      <div className="container">
        <Header />
        <Switch>
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
    </Router>
  );
}

export default App;
