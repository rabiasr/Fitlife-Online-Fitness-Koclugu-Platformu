 
import React from 'react';
 
const Ust = (user) => {
    return (
        <nav className="bg-purple-900 p-4">
            <div className="container flex justify-between items-center">
                <div className="flex items-center">
                    <div className="text-white text-2xl font-bold">FITLIFE</div>
                    <div className="text-white ml-4 text-2xl font-bold">{user.displayName}</div>
                     
                </div>

                <div className="text-white fixed right-20">
                    <button className="bg-purple-500  text-white px-5 py-3 rounded">ÇIKIŞ</button>
                </div>
            </div>
        </nav>


    );
};

export default Ust;
