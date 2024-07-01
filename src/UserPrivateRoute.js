
import {Component} from "react";
import {Route,withRouter,Redirect,useHistory} from "react-router-dom"
import axios from "axios";
import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import LoadingPage from "./pages/CustomCompenents/LoadingPage";

function UserPrivateRoute({component:Component,isAdminTargeted:AdminTarget,...rest}){
    const [isAuth, setisAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const history=useHistory();

    useEffect(() => {
        fetchData()

    },[]);
    const adminCheck=()=>{
        const token=localStorage.getItem('token');
        fetch("http://localhost:8000/api/admin/isAdmin",{
            method:"get",
            headers:new Headers({
                'Authorization': token ? 'Bearer '+token:'',
                 'Content-Type': 'application/json'
            }),

        }).then(res=>{
            if(res.status===200)
            {
                setisAuth(true);
                setLoading(false);
            }
            else {
                history.push("/")
            }

        })
    }
    const fetchData=()=>{
        const token=localStorage.getItem('token');
        fetch('http://localhost:8000/api/isAuthenticated',{
            method:"get",
            headers:new Headers({
                'Authorization': token ? 'Bearer '+token:'',
                 'Content-Type': 'application/json'
            }),

        }).then(response=>{

                if(response.status===200)
                {
                    if(AdminTarget)
                    {
                        adminCheck()
                    }
                    else
                    {
                       setisAuth(true);
                        setLoading(false);
                    }


                }
                else if(response.status===401)
                {
                    var payload={refresh_token:localStorage.getItem('refreshToken')}

                        axios.post('/api/token/refresh',payload).then(res=>{

                                  localStorage.setItem('token',res.data.token);
                                  if(AdminTarget)
                                  {
                                      adminCheck()
                                  }
                                  else {
                                      setisAuth(true);
                                        setLoading(false);
                                  }


                        }).catch(err=>{
                            setLoading(false);
                            history.push('/')

                        })

                }
                else
                     history.push('/')


            }
        )

        return ()=>{
            setisAuth(false);
        }
    }

if(isLoading)
    return  <LoadingPage/>

    return(
        <Route
            {...rest}

          render={(props)=>{
              if(isAuth)
              {
                  return <Component/>
              }

          }}


        />
    )

}



export default withRouter(UserPrivateRoute)
