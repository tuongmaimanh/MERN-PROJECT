import React from 'react';
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import "./checkoutSuccess.css"

const CheckoutSuccess = () => {
  const location = useLocation()
  const email = location.state.email
    return (
        <div className="body">
            <div className="card">
      <div className="item">
        <i  className="checkmark">✓</i>
      </div>
        <h1 className='h1'>Checkout Successful!</h1> 
        <p className='p'>Please check your email: {email}</p>
        <p className='p'>Back to home page <Link to='/'>Home</Link></p>
      </div>
        </div>
    );
};

export default CheckoutSuccess;