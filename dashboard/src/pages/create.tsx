import Create from '../components/create';
import React from "react";

export default function Home(props) {
    return (
        <div className={'col-12'}>
            <div className='card'>
                <div className='card-header'>
                    Create User
                </div>
                <div className='card-body'>
                    <Create/>
                </div>
            </div>
        </div>
   )
}

