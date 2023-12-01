import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

import { toast, ToastContainer } from "react-toastify";
import { VerifyOtp } from "../AxiosConfig/AxiosConfig";



function OtpVerificationForm({email}) {
    console.log(email,'kkkkk');
  const [otp, setOtp] = useState("");
  const [count, setCount] = useState(8);
  const [otpSent] = useState(true);

//   const handleResendOtp = async () => {
   
    
//     await axios.post(`${Base_Url}/otp/sendmobileotp`, {
//       email,
//     });
//   };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedOtp = otp.trim();
    if (trimmedOtp === "") {
      return;
    }

    try {
    
     await VerifyOtp(trimmedOtp)
        .then(() => {
          alert("Otp verified successfully");
          navigate("/login");
        })
        .catch((error) => {
          error.response &&
            error.response.data &&
            error.response.data.message &&
            toast.error("otp verification failed");
        });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      // You can display an error message to the user or take other actions as needed
    }
  };

  useEffect(() => {
    let countdownInterval;

    if (otpSent && count > 0) {
      countdownInterval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (count === 0) {
      // Countdown has reached zero, you can show a "Resend OTP" option
      clearInterval(countdownInterval);
    }

    return () => {
      clearInterval(countdownInterval); // Clear the interval when the component unmounts
    };
  }, [otpSent, count]);

  return (
   
      <Container>
        <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
        <Card style={{ width: "18rem" }} className="text-center">
          {otpSent ? (
            <>
              <Form onSubmit={handleSubmit}>
                <Card.Body>
                  <Card.Title> Enter Otp Send to the email : {email}</Card.Title>
                  <Card.Img variant="top" />
                  <Form.Group className="mb-3 mt-3" controlId="formGridAddress1">
                    <Form.Control
                      placeholder="Enter otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Verify
                  </Button>
                </Card.Body>
              </Form>
              {/* {count > 0 ? (
                <h6>Countdown: {count} seconds</h6>
              ) : (
                <Form >
                  <Button type="submit">Resend OTP</Button>
                </Form>
              )} */}
            </>
          ) : null}
        </Card>
      </Container>
    
  );
}

export default OtpVerificationForm;
