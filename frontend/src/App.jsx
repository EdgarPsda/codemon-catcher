import Login from "./components/Login"
import PokemonList from "./components/PokemonList"
import Nav from "./components/Nav"
import { AuthProvider } from "./context/AuthProvider"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Nav></Nav>
          <Switch>
            <Route path="/" exact component={PokemonList}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
