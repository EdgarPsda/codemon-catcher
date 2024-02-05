import Login from "./components/Login"
import PokemonList from "./components/PokemonList"
import Nav from "./components/Nav"
import { AuthProvider } from "./context/AuthProvider"
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Page404 from "./components/Page404";
import Favorites from "./components/Favorites";


function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Nav></Nav>
          <Switch>
            <Route path="/" exact component={PokemonList}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/favorites" component={Favorites}></Route>
            <Route render={() => <Page404></Page404>} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
