import React,{useState,useContext} from 'react';
import {AuthContext} from '../../contexts/AuthContext'
import {axiosInstance} from '../../config'
import { useLocation } from "react-router-dom";
import { SearchContext } from '../../contexts/SearchContext';
import { useNavigate } from 'react-router-dom';

import Header2 from '../../components/header/Header2';
import Footer from '../../components/footer/Footer';
import CheckOutButton from '../../components/checkOutButton/CheckOutButton';
function Checkout(props) {
  //get data from location
  const location = useLocation()
  const obRoomNumberAndRoom = location.state.roomNumberAndRoom
  const totalPrice = location.state.totalPrice
  const hotel = location.state.hotel
  const selectedRooms = location.state.selectedRooms
  const middleDate = location.state.middleDate
  const navigate = useNavigate()
  const { user, loading, err } = useContext(AuthContext)
  const email= user.details.email
  const { destination,checkIn,checkOut} = useContext(SearchContext)
  
  const [userId,setUserId] = useState(user._id? user._id:"")


  //check user checkout
  const [paidFor,setPaidFor] = useState(false)
  console.log("user",user)
   if(paidFor){
      //save reserve
      axiosInstance.post(`/users/reserve/${userId}`,{email,selectedRooms,hotel,checkIn,checkOut,totalPrice})
    .catch(err => console.log(err))

     //update unavailable room
       Promise.all(
          selectedRooms.map((roomNumberId) => {
            const res = axiosInstance.put(`/rooms/available/${roomNumberId}`, {
              middleDate:middleDate,
            });
            return res.data;
          })
          ).catch(err => console.log(err))
        
        axiosInstance.post("/users/checkoutSuccess",{email}).catch(err => console.log(err))  
        navigate("/checkoutSuccess",{state:{email}})
   }
  


    
    
    return (
      <>
        <div>
      <Header2 type="list" />

            <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black rounded-3">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-12 col-xl-12 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Checkout
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="input-group flex-fill mb-0">

                            <input
                              type="text"
                              name="userId"
                              id="userId"
                              className="form-control"
                              value={user.details._id}
                              hidden
                            />
                            <input
                              type="text"
                              id="userName"
                              className="form-control"
                              value={user.details.username}
                            />
                          <span class="input-group-text">Your name</span>
                            
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="input-group flex-fill mb-0">
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              value={email}
                            />
                           <span class="input-group-text">Your email</span>

                          </div>
                        </div>
                        {obRoomNumberAndRoom.map(item => (
                          <div className='d-flex'>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-number fa-lg me-3 fa-fw"></i>
                          <div className="input-group flex-fill mb-0">
                          <span class="input-group-text">Room number</span>
                            <input
                              type="number"
                              id="form3Example4c"
                              className="form-control"
                                value={item.roomNumber}            
                            />
                            
                          </div>
                        </div> 
                         <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-bar fa-lg me-3 fa-fw"></i>
                          <div className="input-group flex-fill mb-0">
                          <span class="input-group-text">Type</span>
                            <input
                              type="text"
                              id="form3Example4c"
                              className="form-control"
                              value={item.room}
                            />
                           
                          </div>
                        </div>
                        </div>
                        ))}
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-hotel fa-lg me-3 fa-fw"></i>
                          <div className="input-group flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example4c"
                              className="form-control"
                              value={hotel}
                            />
                            <span class="input-group-text">Hotel</span>

                          </div>
                        </div>
                        <div className='d-flex'>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-number fa-lg me-3 fa-fw"></i>
                          
                          <div className="input-group flex-fill mb-0">
                            <span class="input-group-text">Check In</span>
                            <input
                              type="date"
                              id="form3Example4c"
                              className="form-control"
                              value={checkIn}
                            />
                            <p>*Can be edit</p>
                            
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4 mr-2">
                        <i className="fas fa-number fa-lg me-3 fa-fw"></i>
                          
                          <div className="input-group flex-fill mb-0">
                            <span class="input-group-text">Check Out</span>
                            <input
                              type="date"
                              id="form3Example4c"
                              className="form-control"
                              value={checkOut}
                            />
                            <p>*Can be edit</p>
                           
                          </div>
                        </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-dollar fa-lg me-3 fa-fw"></i>
                          <div className="input-group flex-fill mb-0">
                            <input
                              type="number"
                              id="totalPrice"
                              className="form-control"
                              value={totalPrice}
                            />
                             <span class="input-group-text">Total Price</span>

                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          {/* <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={()=>handleSubmit()}
                          >
                            Submit
                          </button> */}
                          <CheckOutButton totalPrice = {totalPrice} setPaidFor={setPaidFor}/>
                        </div>
                          <p>*Account papal test:</p>
                          <p>Email: sb-62mtd21686247@personal.example.com</p>
                          <p>Password: 5DCdJUy/</p>

                    
                      </form>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
      </>
    );
}

export default Checkout;