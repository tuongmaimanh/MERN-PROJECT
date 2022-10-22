import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchItem from "../../components/searchItem/SearchItem";
import Header2 from "../../components/header/Header2";
import "./list.css";
import useFetch from "../../hooks/userFetch";

const ListHotel = () => {

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [checkIn, setCheckIn] = useState(location.state.checkIn);
  const [checkOut, setCheckOut] = useState(location.state.checkOut);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  
  const handleOption = (name,value) =>{
    setOptions((prev) => {
      return{
        ...prev,
        [name] : value
      }
    })
  }
  
 
  // const {data,loading,error} = useFetch(`/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`)
  // const {data,loading,error} =(hotelId !== undefined) ? useFetch(`/hotels/find/${hotelId}`) : useFetch(`/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`)
  // console.log("data1",data1,hotelId)
  // console.log("data",data1)
  // var list = (hotelId !== undefined) ? data1 : data
  const {data,loading,error} = useFetch(`/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`)
  console.log("data",data)
  return (
    <div>
      
    
      <Header2 type="list" />
     
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <select   onChange={(e) => setDestination(e.target.value)} >
                        <option value="Nha Trang" >Nha Trang</option>
                        <option value="Vung Tau">Vung Tau</option>
                        <option value="Phan Thiet">Phan Thiet</option>
                      </select>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-out Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e) => setMin(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e) => setMax(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange = {(e)=> handleOption('adult',e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    onChange = {(e)=> handleOption('children',e.target.value)}

                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onChange = {(e)=> handleOption('room',e.target.value)}

                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            {loading ? ('Loading'):(
              data.map(item => (
                <SearchItem item={item} key= {item._id} />
              ))
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHotel;
