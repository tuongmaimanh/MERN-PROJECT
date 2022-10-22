import {axiosInstance} from "../../config";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./login.css";

const Login = () => {
  const [authentication, setAuthentication] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatchAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("e.target.id", e.target.id);

    setAuthentication((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatchAuth({ type: "LOGIN_START" });

    axiosInstance
      .post("/auth/login", authentication)
      .then((res) => {
        console.log(res.data);
        if (typeof res.data === "string") {
          dispatchAuth({ type: "LOGIN_FAILURE", payload: res.data });
          navigate("/login");
          return;
        }
        dispatchAuth({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/");
      })
      .catch((err) => {
        dispatchAuth({ type: "LOGIN_FAILURE", payload: err.response.data });
      });
  };

  return (
    <div className="login">
      <section class="vh-100">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black">
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Log In
                      </p>

                      <form class="mx-1 mx-md-4">
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="username"
                              class="form-control"
                              onChange={handleChange}
                            />
                            <label class="form-label" for="form3Example3c">
                              Username
                            </label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="password"
                              class="form-control"
                              onChange={handleChange}
                            />
                            <label class="form-label" for="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            onClick={handleClick}
                            type="button"
                            class="btn btn-primary btn-lg"
                          >
                            Submit
                          </button>
                        </div>
                        <Link to="/register">Register</Link>
                        <h1 className="text-danger">
                          {error && <span>{error}</span>}
                        </h1>
                      </form>
                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid"
                        alt="Sample"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
