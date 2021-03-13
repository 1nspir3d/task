import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";

  import Home from "./Home"
  import Cat from "./Cat"

export default function App() {
 return(
    <main className="app">
            <Router>
                <Route exact path="/cat-browser" component={Home}>
                </Route>
                <Route exact path="/cat-browser/:id" component={Cat}>
                </Route>
            </Router>
    </main>
 )
}