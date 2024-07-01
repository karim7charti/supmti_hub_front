
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/General/Login";
import axios from "axios";


import AdminPage from "./pages/Admin/AdminPage";
import Home from "./pages/Users/HomePage/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'boxicons'
import { useLocation } from 'react-router-dom';
import UserPrivateRoute from "./UserPrivateRoute";
import ProfilePage from "./pages/Users/Profile/ProfilePage";
import PostSinglePage from "./pages/Users/Posts/PostSinglePage";
import './css/GeneralStyle.css'
import GeneralProfilePage from "./pages/Users/HomePage/GeneralProfile/GeneralProfilePage";
import MessagesPage from "./pages/Users/Messages/MessagesPage";
import NotificationsPage from "./pages/Users/Notification/NotificationsPage";

axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.baseURL="http://127.0.0.1:8000/"
axios.defaults.headers.post['Accept']='application/json';

axios.defaults.withCredentials=true;

axios.interceptors.request.use(function (config){
    const token=localStorage.getItem('token');
    config.headers.authorization=token ? 'Bearer '+token:'';
    return config;
});
axios.interceptors.response.use(response=>{
    return response
},error => {
    if(401 === error.response.status)
    {

        var payload={refresh_token:localStorage.getItem('refreshToken')}
                axios.post('/api/token/refresh',payload).then(res=> {

                    localStorage.setItem('token', res.data.token)
                }).catch(err=>{
                    window.location.href="http://localhost:3000/"
                })
    }
})


function App() {

  return (


      <Router>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <UserPrivateRoute path="/home" component={Home} isAdminTargeted={false}/>
          <UserPrivateRoute path="/activity/:type/:id" component={PostSinglePage} isAdminTargeted={false}/>
          <UserPrivateRoute path="/profileGeneral/:id/:user" component={GeneralProfilePage} isAdminTargeted={false}/>
          <UserPrivateRoute path="/profile" component={ProfilePage} isAdminTargeted={false}/>
          <UserPrivateRoute path="/messages" component={MessagesPage} isAdminTargeted={false}/>
          <UserPrivateRoute path="/notification" component={NotificationsPage} isAdminTargeted={false}/>
            <UserPrivateRoute path="/admin-dashboard" component={AdminPage} isAdminTargeted={true}/>
        </Switch>
      </Router>





  );
}

export default App;
