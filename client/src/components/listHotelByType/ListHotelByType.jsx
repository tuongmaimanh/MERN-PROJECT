import useFetch from "../../hooks/userFetch";
import "./listHotelByType.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";


const ListHotelByType = () => {
  const d = new Date();
  const dayIn = d.toLocaleDateString("fr-CA", {
    // you can use undefined as first argument
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  var d2 = new Date(d.setDate(d.getDate() + 1));
  const dayOut = d2.toLocaleDateString("fr-CA", {
    // you can use undefined as first argument
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState(dayIn);
  const [checkOut, setCheckOut] = useState(dayOut);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { data, loading, err } = useFetch(
    `/hotels/getByType/${location.state.type}`
  );
  console.log(data);
  const { dispatch } = useContext(SearchContext);

  const handleClick = (hotelId) => {
    navigate(`/hotels/${hotelId}`, { state: { hotelId,destination,checkIn,checkOut,options } });
    dispatch({
      type: "NEW_SEARCH",
      payload: {destination, checkIn, checkOut, options },
    });
  };
  return (
    <>
      <Header2/>
    <div className="fp">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((item) => (
            <div
              className="fpItem"
              key={item._id}
              onClick={() => handleClick(item._id)}
            >
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">Location: {item.city}</span>
              <span className="fpPrice">Price: {item.cheapestPrice}$/night</span>
              <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
      <Footer/>
    </>

    //   <div className="fp">
    //   {loading ? (
    //     "Loading"
    //   ) : (
    //     <>
    //       {data.map((item) => (
    //         <div className="fpItem" key={item._id}>
    //           <img
    //             src={item.photos[0]}
    //             alt=""
    //             className="fpImg"
    //           />
    //           <span className="fpName">{item.name}</span>
    //           <span className="fpCity">{item.city}</span>
    //           <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
    //           {item.rating && <div className="fpRating">
    //             <button>{item.rating}</button>
    //             <span>Excellent</span>
    //           </div>}
    //         </div>
    //       ))}
    //     </>
    //   )}
    // </div>
  );
};

export default ListHotelByType;
