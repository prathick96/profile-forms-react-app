import React, { useState, useEffect } from "react";
import { Media } from "reactstrap";
import { trackPromise } from "react-promise-tracker";

const Profile = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    trackPromise(
      fetch("https://react-profile-forms-api.herokuapp.com")
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.formData);
        })
    );
  });

  return (
    <div className=" container">
      <h1 style={{ color: "white" }}> Profiles </h1>
      {profile.map((element, index) => {
        return (
          <>
            <div className="card p-3 my-3">
              <Media>
                <Media left>
                  <Media object data-src={element.profilePic} alt="" />
                  <img
                    src={element.profilePic}
                    style={{ height: "180px", width: "180px" }}
                    alt="preview"
                  />
                  &nbsp; &nbsp;
                </Media>
                <Media body>
                  <Media heading>
                    {element.firstName} {element.lastName}
                  </Media>
                  <b>Email </b>: {element.email} <br />
                  <b>Phone Number </b>: {element.phoneNumber} <br />
                  <b>Gender </b>: {element.gender} <br />
                  <b>Age </b>: {element.age} <br />
                  <b>notes :</b>{" "}
                  <ul>
                    {" "}
                    {element.notes.map((element, index) => {
                      return <li key={`li${index}`}> {element} </li>;
                    })}
                  </ul>
                </Media>
              </Media>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Profile;
