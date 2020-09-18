import React, { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "../styles.css";
import { trackPromise } from "react-promise-tracker";
import { Button, Form, Label, FormText, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";

const FormUpdate = () => {
  const { register, handleSubmit, errors, control } = useForm();
  const [imgSource, setimgSoure] = useState("");
  const profilePicRef = useRef();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "notes"
  });
  const history = useHistory();

  const onFileSelected = (e) => {
    if (profilePicRef.current.files) {
      const reader = new FileReader();
      console.log(profilePicRef.current.files[0]);
      reader.readAsDataURL(profilePicRef.current.files[0]);
      reader.onload = (e) => {
        console.log(e.target.result);
        setimgSoure(e.target.result);
        console.log(imgSource);
      };
    }
  };

  const submitForm = (data) => {
    const notesCheck = Object.keys(data);
    let notesArray = [];

    notesCheck.forEach((element) => {
      const key = parseInt(element);
      if (isNaN(key)) return;
      notesArray.push(data[`${key}`]);
    });

    const result = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender,
      email: data.email,
      phoneNumber: data.phoneNumber,
      profilePic: imgSource,
      notes: notesArray
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(result)
    };

    trackPromise(
      fetch("https://react-profile-forms-api.herokuapp.com/", config)
        .then((response) => response.json())
        .then((data) => {
          alert("Post has been added Successfully");
          history.push(`/profile`);
        })
        .catch((error) => {
          console.log(error);
          alert("Please check the details that you have entered!");
        })
    );
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)} className="my-5">
      <h1>Register</h1>
      <Row className="justify-content-left align-items-center mb-3">
        <Col md={3}>
          {imgSource ? (
            <>
              <img
                src={imgSource}
                style={{ height: "200px", width: "200px" }}
                alt="preview"
              />
              <br />
            </>
          ) : (
            <>
              <div
                style={{
                  height: "200px",
                  width: "200px",
                  backgroundColor: "whitesmoke",
                  marginLeft: "2px",
                  color: "white"
                }}
                className="row justify-content-center align-items-center"
              >
                <span
                  role="img"
                  aria-label="Man Technologist"
                  style={{ fontSize: "56px" }}
                >
                  👨‍💻
                </span>
              </div>
              <br />
            </>
          )}
          <input
            onChange={onFileSelected}
            type="file"
            ref={profilePicRef}
            required
          />
          <FormText color="muted">Please upload your profile picture</FormText>
          <br />
        </Col>
      </Row>
      <Label>First Name:</Label>
      <input
        name="firstName"
        ref={register({
          required: true,
          pattern: {
            value: /^[A-Za-z]*$/,
            message: "Please enter a valid firstName"
          }
        })}
      />
      {errors.firstName ? (
        errors.firstName.message ? (
          <p> {errors.firstName.message}</p>
        ) : (
          <p>This is required</p>
        )
      ) : null}

      <Label>Last Name:</Label>
      <input
        name="lastName"
        ref={register({
          required: true,
          pattern: {
            value: /^[A-Za-z]*$/,
            message: "Please enter a valid lastName"
          }
        })}
      />
      {errors.lastName ? (
        errors.lastName.message ? (
          <p> {errors.lastName.message}</p>
        ) : (
          <p>This is required</p>
        )
      ) : null}

      <Label>Gender</Label>
      <select name="gender" ref={register({ required: true })}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <p>This is required</p>}

      <Label>Phone Number</Label>
      <input
        name="phoneNumber"
        ref={register({
          required: true,
          pattern: {
            value: /^\d{10}$/,
            message: "Please enter a valid Phone Number"
          }
        })}
      />
      {errors.phoneNumber ? (
        errors.phoneNumber.message ? (
          <p> {errors.phoneNumber.message}</p>
        ) : (
          <p>This is required</p>
        )
      ) : null}

      <Label>Email</Label>
      <input
        name="email"
        ref={register({
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Please enter a valid email id"
          }
        })}
      />
      {errors.email ? (
        errors.email.message ? (
          <p> {errors.email.message}</p>
        ) : (
          <p>This is required</p>
        )
      ) : null}

      <Label>Age</Label>
      <input
        name="age"
        type="number"
        ref={register({
          required: true,
          min: { value: 14, message: " Minumum age is 14" },
          max: { value: 120, message: " Maximum age is 120" }
        })}
      />
      {errors.age ? (
        errors.age.message ? (
          <p> {errors.age.message}</p>
        ) : (
          <p>This is required</p>
        )
      ) : null}

      <Label>Notes</Label>
      {fields.map(({ id }, index) => {
        return (
          <Row className="align-content-center ">
            <Col md={9}>
              <input
                type="textarea"
                name={index}
                ref={register}
                key={index}
                id={index}
              />
            </Col>
            <Col md={3} className="my-n4">
              <Button type="button" onClick={() => remove(index)}>
                Remove
              </Button>
            </Col>
          </Row>
        );
      })}
      <Button type="button" onClick={() => append("")}>
        Add
      </Button>
      <FormText color="muted">
        Please Click the Add to add notes if any
      </FormText>
      <input type="submit" />
    </Form>
  );
};

export default FormUpdate;
