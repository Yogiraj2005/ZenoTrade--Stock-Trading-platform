import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img className='mb-5' src='Media/Images/homeHero.png' alt='Hero Image' />
                <h1 className='mt-5'>Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <Link to="/signup">
                    <button className=' mb-5 p-2 btn btn-primary fs-5' style={{ width: "18%" }}>Signup Now</button>
                </Link>
            </div>
        </div>
    );
}

export default Hero;