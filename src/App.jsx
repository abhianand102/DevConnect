import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body.jsx"
import Profile from "./Components/Profile.jsx";
import Login from "./Components/Login.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./Components/Feed.jsx";
import Connections from "./Components/Connections.jsx";
import Requests from "./Components/Requests.jsx";

function App() {
  

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/connections" element={<Connections/>}/>
        <Route path="/requests" element={<Requests/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </> 
    
  );
}

export default App;
