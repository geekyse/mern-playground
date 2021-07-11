import React from "react";
import Create from '../components/user/create';

export default function Home() {
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

