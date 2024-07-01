import React from 'react';

const SearchBar = props => {
    const {label,}=props;


    return (
        <>


            <div className="row mx-0 justify-content-center my-1 " id="search_bar">
                <div className="col-lg-11 col-md-11 col-sm-11 col-11 px-0">
                    <input placeholder={label} className="input"/>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1 col-1 search_btn" >

                </div>
            </div>



        </>
    );


};

SearchBar.defaultProps= {
    label:"Chercher...",
};
SearchBar.propTypes = {

};

export default SearchBar;