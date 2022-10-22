import React,{ useState} from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const CheckOutButton = ({totalPrice,setPaidFor}) => {
    console.log(totalPrice)
    
    return (
        <div>
            <PayPalButtons 
               createOrder={(data, actions) => {
                return actions.order.create({
                    intent:"CAPTURE",
                    purchase_units: [
                      {   
                        description: "Booking-app",
                        amount: {
                            currency_code:"USD",
                            value: totalPrice
                        },
                    }
                  ],
               
                });
              }} 

              onApprove={async (data, actions) => {
                setPaidFor(true)
              }}

              onError={(err) => {
                alert(err)
              }}
            ></PayPalButtons>
        </div>
    );
};

export default CheckOutButton;