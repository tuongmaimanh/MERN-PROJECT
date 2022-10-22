import "./hotel.css";
// import Header from "../../components/header/Header";
import Header2 from "../../components/header/Header2";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/userFetch";
import Reserve from "../../components/reserve/reserve";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { AuthContext } from "../../contexts/AuthContext";

const Hotel = () => {
  const id = useLocation().pathname.split("/")[2]; //pathname: '/hotels/:id'
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const { checkIn, checkOut, options } = useContext(SearchContext);
  console.log(checkIn,checkOut)
  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }
  const day = getDifferenceInDays(new Date(checkIn), new Date(checkOut));
  //create handleClick button check auth user
  const { user } = useContext(AuthContext);
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  console.log("data", data, id);
  return (
    <div>
      <Header2 type="list" />
      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <i
                  className="fa-solid fa-circle-xmark"
                  onClick={() => setOpenModal(false)}
                ></i>

                <div className="sliderWrapper">
                  <img
                    src={data.photos[slideNumber]}
                    alt=""
                    className="sliderImg"
                  />
                </div>
              </div>
            )}
            <div className="hotelWrapper">
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <i className="fa-solid fa-location-dot"></i>
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location – {data.distance}m from center
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over ${data.cheapestPrice} at this property and get
                a free airport taxi
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo, i) => (
                  <div className="hotelImgWrapper" key={i}>
                    <img src={photo} alt="" className="hotelImg" />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {day}-night stay!</h1>
                  <span>
                    Located in the real heart of Krakow, this property has an
                    excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${day * data.cheapestPrice * options.room}</b> ({day}{" "}
                    nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
          </div>
        </>
      )}

      <Footer />
      {/* //Modal */}
      {openModal && (
        <Reserve
          setOpenModal={setOpenModal}
          hotelId={id}
          hotel={data.name}
          totalPrice={day * data.cheapestPrice * options.room}
        />
      )}
    </div>
  );
};

export default Hotel;
