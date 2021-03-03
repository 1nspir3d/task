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
            <Route exact path="/" component={Home}>
            </Route>
            <Route exact path="/:id" component={Cat}>
            </Route>
        </Router>
     </main>
 )
}