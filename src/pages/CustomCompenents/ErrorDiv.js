import React, {Component} from 'react';

class ErrorDiv extends Component {
    render() {
        return (
            <>
                <div className="row mx-0 mt-2 p-0" style={{
                    backgroundColor:"white",
                    borderRadius:"9px",

                }}>
                    <div className="col-lg-12 text-center mx-auto">
                        <img className="mx-auto" src={this.props.img}  style={{
                            width:this.props.imgW,
                            height:this.props.imgH,
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
                        display:this.props.button?"block":"none"
                    }}>
                        <button id="errorBtn" onClick={this.props.refresh}>
                            Réessayer
                        </button>

                    </div>

                </div>

            </>
        );
    }
}
ErrorDiv.defaultProps = {
    marginImg:0,
}

export default ErrorDiv;
