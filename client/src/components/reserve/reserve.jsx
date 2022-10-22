import "./reserve.css";

import React, { useState, useContext } from "react";
import useFetch from "../../hooks/userFetch";
import { SearchContext } from "../../contexts/SearchContext";
import {axiosInstance} from "../../config";
import {useNavigate} from "react-router-dom"

const Reserve = ({ setOpenModal, hotelId,hotel,totalPrice }) => {
  const { data, loading, error } = useFetch(
    `/hotels/room/${hotelId}`
  );
  const [selectedRooms, setSelectedRooms] = useState([]); //store room numberId
  const [roomNumberAndRoom, setRoomNumberAndRoom] = useState([]); //store room numberId
  const { checkIn, checkOut } = useContext(SearchContext);
    console.log(checkIn,checkOut)
  const getMiddleDate = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const listDate = [];
    while (startDate <= endDate) {
      listDate.push(startDate.getTime());
      startDate.setDate(startDate.getDate() + 1);
    }

    return listDate;
  };

  const middleDate = getMiddleDate(checkIn,checkOut)
  const isAvailable = (roomNumber) => {
    //if isFound == true
    const isFound = roomNumber.unavailableDates.some((date) =>
      middleDate.includes(new Date(date).getTime())
    );

    return isFound;
  }

  const handleSelect = (e,obRoomNumberAndRoom) => {
    
    const checked = e.target.checked;
    const value = e.target.value; //id room number

    setRoomNumberAndRoom(checked 
      ? [...roomNumberAndRoom,obRoomNumberAndRoom] 
      : roomNumberAndRoom.filter((item) => item.roomNumber !== obRoomNumberAndRoom.roomNumber))
    
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
    console.log(selectedRooms)
  };
   console.log(roomNumberAndRoom)
  const navigate = useNavigate()
  //function submit
  const handleClick = async () => {
   
    setOpenModal(false);
    navigate("/checkout",{state: {roomNumberAndRoom,totalPrice,hotel,selectedRooms,middleDate}});
    }
  return (
    <div>
      <div className="reserve">
        <div className="rContainer">
          <i
            className="fa-solid fa-circle-xmark"
            onClick={() => setOpenModal(false)}
          ></i>
          <span>Select your rooms:</span>
          {data.map((item) => (
            <div className="rItem" key={item._id}>
              <div className="rItemInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="rPrice">{item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={(e)=>handleSelect(e,{roomNumber:roomNumber.number,room:item.title})}
                      disabled={isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
