import "./propertyList.css";
import useFetch from "../../hooks/userFetch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PropertyList = () => {
  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
  ];
  const { data, loading, error } = useFetch("/hotels/countByType");
  const d = new Date();
  const dayIn = d.toLocaleDateString('fr-CA', { // you can use undefined as first argument
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  var d2=new Date(d.setDate(d.getDate() + 1))
  const dayOut = d2.toLocaleDateString('fr-CA', { // you can use undefined as first argument
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  const [checkIn, setCheckIn] = useState(dayIn);
  const [checkOut, setCheckOut] = useState(dayOut);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate()
  const handleClick = (type) => {
    navigate('/listHotelByType',{state:{type:type}})
  }
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data && 
            images.map((img,i) => (
              <div className="pListItem" key={i} onClick={()=>handleClick(data[i].type)}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />

                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2 >{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>

    
    
  );
};

export default PropertyList;
