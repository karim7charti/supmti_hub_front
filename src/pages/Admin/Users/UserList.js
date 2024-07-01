import React,{Component} from "react";

import  '../../../css/AdminStyle.css'
import error from "../../../imgs/Error.png";
import nodata from "../../../imgs/noData.png";
import OneUser from "./OneUser";
import TablePaginationDemo from "../Pagination";
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

import AddDrawer from "./AddDrawer";
import axios from "axios";
import OneUserSkeleton from "../../CustomCompenents/OneUserSkeleton";
import ErrorDiv from "../../CustomCompenents/ErrorDiv";





class UserList extends Component{
    constructor(props) {
        super(props);
        this.maxResults=10
        this.firstResult=0
        this.state={
        anchorEl:null,
            users:[],
            usersCount:0,
            isLoading:true,
            error:false,
            text:""
         }
    }
    onLoad=()=>{
         if(this.props.role==="student")
             this.getUsers(this.maxResults,this.firstResult,'ROLE_ETUDIANT')
        else if(this.props.role==="teacher")
            this.getUsers(this.maxResults,this.firstResult,'ROLE_ENSEIGNANT')
        else
            this.getUsers(this.maxResults,this.firstResult,'ROLE_ADMIN')
    }
    componentDidMount() {
       this.onLoad()
    }
    getUsers=(maxResults,firstResult,role)=>{
        this.setState({
            isLoading:true,
             error:false
        },()=>{
            const payload={lname:this.state.text,role:role}
              axios.post('/api/admin/users/'+maxResults+'/'+firstResult,payload).then(res=>{
            this.setState({
                    users:res.data.users,
                    usersCount:res.data.count.cmpt,
                isLoading:false
            })
                }).catch(err=>{
                    this.setState({
                        error:true
                    })
                })
        })
    }


    handleClick = (e) => {
        this.setState(
            {
                anchorEl:(e.currentTarget),
            }
        )
    };

    handleClose = (e) => {
        this.setState({
            anchorEl:null,
        })
    };

    updatedatas=()=>{
        this.onLoad()
    }

    search=(e)=>{
        let text=e.target.value

          this.setState({
              text:text
          },()=>{
              this.onLoad()
          })
    }
    render() {
        let users=""
        if (this.state.isLoading)
        {
            users=<>
            <OneUserSkeleton/>
            <OneUserSkeleton/>
            <OneUserSkeleton/>
            <OneUserSkeleton/>
            <OneUserSkeleton/>
            <OneUserSkeleton/>
            </>
        }
        else
        {
            if(this.state.users.length===0)
            {
                users=<ErrorDiv  img={nodata} imgW={250} imgH={220} button={false} error="Données introuvables" describtion="Aucun utilisateur trouvé dans la base de données, essayez d'en ajouter un"/>
            }
            else
                users=this.state.users.map((user,index)=>{
                    return      <OneUser updateData={this.updatedatas}
                                         id={user.id} fname={user.first_name}
                                         lname={user.last_name}  email={user.email}
                                         npost={user.count_pub}  img={user.profile_image_path}
                                         back={index%2===0}

                    />
                })
        }
        if(this.state.error)
        {
            return (
                <ErrorDiv refresh={this.updatedatas} img={error} imgW={300} imgH={220} button={true} error="Un erreur est survenue" describtion="Nous rencontrons des problèmes lors du chargement de cette page "/>
            )
        }

        return(

            <>


                <div className="row px-0 justify-content-between">

                    <div className="col-lg-5 col-md-6 col-sm-6 col-5 mb-3 mr-2 text-end">

                                <FormControl  fullWidth={true}>

                                    <Input
                                        onChange={this.search}

                                        placeholder={"Chercher..."}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                    </div>


                    <div className="col-lg-4 col-md-4 col-sm-5 col-7 px-0 align-items-sm-end text-end">

                        <AddDrawer
                            updatedata={this.updatedatas}
                            role={this.props.role}
                            isEdit={false}
                            userDataOnEdit={undefined}
                        />


                    </div>


                </div>
                <div className="row justify-content-between" style={{height:"100%"}}>

                    <div className="col-lg-12 mt-3">
                        {users}
                    </div>

                    <div className="col-lg-12 text-end" style={{visibility:(this.state.isLoading)?'hidden':'visible'}}>
                        <TablePaginationDemo count={this.state.usersCount} getUsers={this.getUsers}
                                             role={this.props.role}
                        />
                    </div>

                </div>

            </>



        );

                }

}


UserList.defaultProps = {
    isAdmin:false
}

export default UserList;
