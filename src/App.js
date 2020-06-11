import React from 'react';
import NavBar from './components/navbar'
import Footer from './components/footer'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './screens/home'
import BecomeDonor from './screens/becomeDonor'
import FindDonor from './screens/findDonor'
import ManageProfile from './screens/manageProfile'
import About from './screens/about'
import NoPage from './screens/nopage'
import Layout from './components/layout'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <React.Fragment>
      <NavBar/>
      <Layout>
        <Router>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/becomeDonor' component={BecomeDonor} />
              <Route path='/findDonor' component={FindDonor} />
              <Route path='/manageProfile' component={ManageProfile} />
              <Route path='/about' component={About} />
              <Route component={NoPage} /> 
            </Switch>
        </Router>
      </Layout>
      <Footer/>  
    </React.Fragment>
  );
}

export default App;
