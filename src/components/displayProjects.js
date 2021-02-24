import React, { Component } from 'react';
import style from '../styles/displayProjects.module.css'
import ShowPosts from './showPosts'
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
