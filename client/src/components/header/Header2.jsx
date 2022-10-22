import React from 'react';
import { Link } from 'react-router-dom';

const Header2 = () => {
    return (
        <div>
            <div className="container">
<nav className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light" id="ftco-navbar">
<div className="container">
<Link className="navbar-brand" to="/"><i className="fas fa-gem me-3">Booking app</i>
</Link>
<div className="social-media order-lg-last">
<p className="mb-0 d-flex">
<a href="#!" className="d-flex align-items-center justify-content-center"><span className="fa-brands fa-facebook-f"><i className="sr-only">Facebook</i></span></a>
<a href="#!" className="d-flex align-items-center justify-content-center"><span className="fa-brands fa-twitter"><i className="sr-only">Twitter</i></span></a>
<a href="#!" className="d-flex align-items-center justify-content-center"><span className="fa-brands fa-instagram"><i className="sr-only">Instagram</i></span></a>
<a href="#!" className="d-flex align-items-center justify-content-center"><span className="fa-brands fa-dribbble"><i className="sr-only">Dribbble</i></span></a>
</p>
</div>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
<span className="fa fa-bars"></span> Menu
</button>
<div className="collapse navbar-collapse" id="ftco-nav">
<ul className="navbar-nav ml-auto mr-md-3">
<li className="nav-item active"><Link to='/' className="nav-link">Home</Link></li>
<li className="nav-item"><a href="#!" className="nav-link">About</a></li>
<li className="nav-item"><a href="#!" className="nav-link">Work</a></li>
<li className="nav-item"><a href="#!" className="nav-link">Blog</a></li>
<li className="nav-item"><a href="#!" className="nav-link">Contact</a></li>
</ul>
</div>
</div>
</nav>

</div>
        </div>
    );
};

export default Header2;