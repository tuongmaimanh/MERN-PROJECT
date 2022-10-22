import React, { useState, useContext } from "react";
import "./header.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import { AuthContext } from "../../contexts/AuthContext";

function Header() {
  const [destination, setDestination] = useState("Nha Trang");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOption = (name, value) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);
  const { dispatchAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (destination === "") {
      alert("Please choose destination");
      return;
    }
    if (checkIn === "") {
      alert("Please choose Check In");
      return;
    }
    if (checkOut === "") {
      alert("Please choose Check Out");
      return;
    }
    const checkInDay = new Date(checkIn)
    const checkOutDay = new Date(checkOut)
    if(checkInDay.getTime()>=checkOutDay.getTime() || checkInDay.getTime()< new Date().getTime()){
      alert('Check In day must lesser than Check Out day and greater than today !')
      return;
    }
    navigate("/listHotel", {
      state: { destination, checkIn, checkOut, options },
    });
    
    dispatch({
      type: "NEW_SEARCH",
      payload: {destination, checkIn, checkOut, options },
    });
    console.log(destination)

  };

  const handleLogOut = () => {
    navigate("/login");
    dispatchAuth({ type: "LOGOUT" });
  };
  const { user } = useContext(AuthContext);
  return (
    <div div className="">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
        <div className="container-fluid ">
          <a className="navbar-brand" href="*">
          <i className="fas fa-gem me-3">Booking app</i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item ">
                <a className="nav-link" href="*">
                  <i className="fa-solid fa-bed "></i> Stays
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="*">
                  <i className="fa-solid fa-plane"></i> Flights
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="*">
                  <i className="fa-solid fa-car"></i> Car rentals
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="*">
                  <i className="fa-solid fa-bed"></i> Attractions
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="*">
                  <i className="fa-solid fa-taxi"></i> Airport taxis
                </a>
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse " id="mynavbar">
            <ul className="navbar-nav me-auto">
              {!user && (
                <li className="nav-item ">
                 <button className="btn btn-warning" onClick={()=>navigate('/login')}>
                    Login
                </button>
                </li>
              )}
              <li className="nav-item ">
                  <button className="btn btn-danger" onClick={() => handleLogOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="booking" className="section">
        <div className="section-center">
          <div className="container">
            <div className="row">
              <div className="col-md-7 col-md-push-5">
                <div className="booking-cta">
                  <h1>Make your reservation</h1>
                  <p>
                  A hotel reservation system is the mechanism through which guests can create secure online reservations. While the process is similar to booking with an online travel agent (OTA), the difference is the hotel’s booking engine essentially links up to their own website so that there are no additional fees incurred for the property. 
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-md-pull-7">
                <div className="booking-form">
                  <form>
                    <div className="form-group">
                      <span className="form-label">Your Destination</span>
                      
                      <select id="list" className="form-control"  onChange={(e) => setDestination(e.target.value)} required>
                        <option value="Nha Trang" >Nha Trang</option>
                        <option value="Vung Tau">Vung Tau</option>
                        <option value="Phan Thiet">Phan Thiet</option>
                      </select>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <span className="form-label">Check In</span>
                          <input
                            className="form-control"
                            type="date"
                            onChange={(e) => {
                              setCheckIn(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <span className="form-label">Check out</span>
                          <input
                            className="form-control"
                            type="date"
                            onChange={(e) => {
                              setCheckOut(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <span className="form-label">Rooms</span>
                          <select
                            className="form-control"
                            onChange={(e) =>
                              handleOption("room", e.target.value)
                            }
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <span className="form-label">Adults</span>
                          <select
                            className="form-control"
                            onChange={(e) =>
                              handleOption("adult", e.target.value)
                            }
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <span className="form-label">Children</span>
                          <select
                            className="form-control"
                            onChange={(e) =>
                              handleOption("children", e.target.value)
                            }
                          >
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-danger">*Children free if highest less than 1 meter</div>

                    <div className="form-btn">
                      <button
                        className="submit-btn"
                        onClick={() => {
                          handleSubmit();
                        }}
                      >
                        Check availability
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
