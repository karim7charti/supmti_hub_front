import React, {Component} from 'react';
import edit from './../../imgs/edit.png'


function EditIcon({ opacity, borderRadius}){

        return (
            <>
                <span className="p-1 mx-2"
                      style={{
                    backgroundColor:"white",
                    border:"1px solid lightgray",
                    borderRadius:"100%",
                    cursor:"pointer",
                    opacity:0.7,
                }}

                >
                    <img src={edit} style={{
                        height:20,
                        width:20,
                    }}/>
                </span>

            </>
        );

}
