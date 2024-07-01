import React, {Component} from 'react';
import './../../../css/MessagesStyle.css'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import search from './../../../imgs/search_gray.png'
class UpOptionsBar extends Component {
    render() {
        return (
            <>
                <div className="row py-2" id="UpOptionsBar">
                    <div className="col-lg-12  px-4">
                        <div className="row justify-content-between">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6 my-auto label">
                                Discussions
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-6 my-auto text-end controls">
                                <i><RateReviewOutlinedIcon onClick={this.props.openNewMessage}/></i>
                                <i><MoreHorizIcon style={{marginBottom:3}}/></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 my-2 px-4">
                        <div className="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping"><img src={search} alt="search" style={{height:"1.3em",width:"1.3em"}}/></span>
                            <input type="text" placeholder="Chercher une discussions..." className="search_input"/>
                        </div>

                    </div>
                </div>

            </>
        );
    }
}

UpOptionsBar.propTypes = {

};
UpOptionsBar.defaultProps = {

};

export default UpOptionsBar;