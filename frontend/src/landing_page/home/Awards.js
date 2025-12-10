import React from 'react'

function Awards () {
    return ( 
        <div className='container mt-3 p-5'>
            <div className='row'>
                <div className='col-6 p-4'>
                    <img src='Media/Images/largestBroker.svg' />
                </div>
                <div className='col-6 '>
                    <h1 className='mt-5'>Largest stock broker in India</h1>
                    <p className='mb-5 mt-3'>2+ million Zerodha clients contribute to over 15% of all retail
                        order volumes in India daily by trading and investing in: </p>
                    
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <ul>
                                <li>
                                    <p>Futures and Options</p>
                                </li>
                                <li>
                                    <p>Commodity derivatives</p>
                                </li>
                                <li>
                                    <p>Currency derivatives</p>
                                </li>
                                
                            </ul>
                        </div>
                        <div className='col-6'>
                            <ul>
                                <li>
                                    <p>Futures and Options</p>
                                </li>
                                <li>
                                    <p>Commodity derivatives</p>
                                </li>
                                <li>
                                    <p>Currency derivatives</p>
                                </li>
                                
                            </ul>
                        </div>
                        <img  src='Media/Images/pressLogos.png' style={{width:"90%"}} />
                    </div>

                   
                </div>

            </div>

        </div>
    );
}

export default Awards ;