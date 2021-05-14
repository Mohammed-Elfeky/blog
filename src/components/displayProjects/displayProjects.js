import React, { Component } from 'react';
import style from './displayProjects.module.css'
import ShowPosts from '../showPosts/showPosts'
class DisplayProjects extends Component {
    
    render() {
        
        return (
            <div className={style.item}>
                <ShowPosts/>  
            </div>
        );
    }
}

export default DisplayProjects;
