import React, {Component} from 'react';
import delet from './../../../../imgs/delete.png'
import down from './../../../../imgs/download.png'
import './../../../../css/PostsStyles.css'
import axios from "axios";

class CourFile extends Component {

    state={
        isShow:true,

    }
    handleDelete=()=>{
        this.props.delete(this.props.index)
    }
    download=()=>{
        let a=document.getElementById(this.props.filename)

        a.click()
    }

    render() {
        return (
            <>
                <div className="row p-2 m-2" id="cour_file"  title={this.props.public?"Télécharger":""} style={{
                    display:"flex",

                }}>
                    <div className="col-lg-1 col-md-2 col-sm-2 col-2  my-auto text-center">
                        <img className="my-auto img" alt={this.props.name} src={this.props.img} style={{

                        }}/>
                    </div>
                    <div className="col-lg-10 col-md-9 col-sm-9 col-9 my-auto">
                        <div className="row my-auto">
                            <div className="col-lg-12 my-auto title">
                                {this.props.title}
                            </div>
                            <div className="col-lg-12 my-auto name">
                                {this.props.name}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-1  delete  my-auto text-center" onClick={this.props.public?this.download: this.handleDelete}>
                        <img className="my-auto mx-auto" alt="supprimer" title="supprimer" src={this.props.public?down:delet}/>
                        <a id={this.props.filename} href={axios.defaults.baseURL+"api/courses/download_file/"+this.props.filename} style={{display:"none"}}>hhhhh</a>

                    </div>
                </div>
                <span className={"text-danger"} style={{fontSize:12}}>{(this.props.errors[this.props.index]!==undefined)?this.props.errors[this.props.index].file:""}</span>

            </>
        );
    }
}

CourFile.propTypes = {};
CourFile.defaultProps = {
    public:false,
};

export default CourFile;
