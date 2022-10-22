import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css"
function Home() {
  return (
    <>
      <Header />
      <div className="container mt-2">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
      </div>
      <Footer/>
    </>
  );
}

export default Home;
