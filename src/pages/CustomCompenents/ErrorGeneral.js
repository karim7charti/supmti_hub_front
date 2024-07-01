import React, {Component} from 'react';
import image from './../../imgs/Error.png'
class ErrorGeneral extends Component {
    render() {
        return (
            <>
                <div className="row mx-0 mt-3 p-0" style={{
                    backgroundColor:"white",
                    borderRadius:"9px",

                }}>
                    <div className="col-lg-12 text-center mx-auto">
                        <img className="mx-auto" src={this.props.img}  style={{

                            maxHeight:300,
                            marginTop:this.props.marginImg,
                            marginBottom:this.props.marginImg,
                        }}/>
                    </div>
                    <div className="col-lg-12 mt-4 text-center title1"  style={{
                        fontWeight:549
                    }}>
                        {this.props.error}
                    </div>
                    <div className="col-lg-12 mb-4 text-center descr1">
                        {this.props.describtion}
                    </div>
                    <div className="col-lg-12 mb-4 text-center btn1" style={{
                        display:this.props.action?"block":"none"
                    }}>
                        <button id="errorBtn" style={{width:"revert", padding:".5rem 2rem"}} onClick={this.props.onClick}>
                            {this.props.buttonText}
                        </button>

                    </div>

                </div>

            </>
        );
    }
}
ErrorGeneral.defaultProps = {
    marginImg:0,
    img:image,
    imgW:"100%",
    imgH:"100%",
    buttonText:"Réessayer",
    action:true,
    onClick: ()=>""
}

export default ErrorGeneral;
