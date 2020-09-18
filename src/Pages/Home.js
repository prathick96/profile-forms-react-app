import React from "react";

const Home = () => {
  return (
    <div class="jumbotron text-center">
      <>
        <h1 class="display-4" style={{ color: "#0e101c" }}>
          Welcome to Justice League
        </h1>
        <p class="lead">Click on Register to sign up for Justice League</p>
        <img
          src="https://cdn.dribbble.com/users/1346218/screenshots/7052515/jl-color-danielbeadle.png"
          class="img-fluid"
          alt=""
          style={{ height: "180px", width: "220px" }}
        />
        <hr class="my-4" />
        <button class="btn btn-danger btn-lg" href="/form">
          Register
        </button>
      </>
    </div>
  );
};

export default Home;
