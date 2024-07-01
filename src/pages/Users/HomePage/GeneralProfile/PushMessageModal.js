import React, {Component} from 'react';
import ProfilePicture from "../../Profile/ProfilePicture";
import './../../../../css/MessagesStyle.css'
import cmnt_d from "../../../../imgs/comment_disable.png";
import cmnt from "../../../../imgs/comment.png";
class PushMessageModal extends Component {
    state = {
              disable: false,
            }
    render() {

        return (
            <>

                <div></div>
                <div className="new-message" style={{minHeight: "revert"}}>
                    <div className="modal-head">
                        <b className="modal_title">Pousser {this.props.sender_fname} {this.props.sender_lname}</b>
                        <button type="button" className="btn-close" aria-label="Close"  onClick={this.props.openNewMessage} style={{color:"white"}}>
                        </button>
                    </div>
                    <form>
                    <div className="input-group flex-nowrap push-msg">

                            <span className="input-group-text" id="addon-wrapping"><ProfilePicture picture={this.props.picture} FirstLater={this.props.first_letter} height={40} width={40} fontSize={12} showBadge={false}/></span>
                            <input type="text" placeholder="Tapez votre message..." className="search_input"
                                   style={{
                                       padding: "1.3em 1em",
                                   }}
                            />
                            <button type="submit"
                                    disabled={this.state.disable}
                                    className="mx-0 my-auto"
                                    style={{
                                        opacity:this.state.disable? 0.4 : 1
                                    }}
                            >
                                <img alt="Envoyer" src={this.state.disable?cmnt_d:cmnt}/>
                            </button>


                    </div>
                    </form>

                </div>
                <div></div>

            </>
        );
    }
}

PushMessageModal.propTypes = {};
PushMessageModal.defaultProps = {
    picture:null,
    first_letter:"A",
};

export default PushMessageModal;
