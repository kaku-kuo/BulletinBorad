import React from 'react';

const Preloader = () => {
    return (
        <div className="text-center mt-5">
         <div className="display-4 font-weight-bold">Loading...</div>
         <div className="spinner-grow" role="status"/>
        </div>            
    )
}

export default Preloader