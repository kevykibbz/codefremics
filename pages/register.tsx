import Head from "next/head";
import Link from "next/link";
import React, { useId, useState, ReactNode } from "react";
import Select, { StylesConfig } from "react-select";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Step1 from "../components/steps/step1";
import Step2 from "../components/steps/step2";
import Step3 from "../components/steps/step3";

interface Option {
  value: string;
  label: string;
}
interface Step {
  label: string;
  description: ReactNode;
}

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];
const register = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const [selectedOption, setSelectedOption] = useState<Option | null | unknown>(
    genderOptions[0]
  );
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#283066",
      color: "#ffffff",
      width: "100%",
      borderColor: "#4A54AF",
      height: "52px",
      borderRadius: "10px",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#ffffff" : "#000",
      backgroundColor: state.isSelected ? "#1B1D4D" : "#ffffff",
    }),
    singleValue: (base) => ({
      ...base,
      border: "none",
      color: "#fff",
    }),
  };
  const steps: Step[] = [
    {
      label: "Personal Information",
      description: <Step1 />,
    },
    {
      label: "Additional Information",
      description: <Step2 />,
    },
    {
      label: "Security Information",
      description: <Step3 />,
    },
  ];

  return (
    <>
      <Head>
        <title>Egamlio - Customer Registration</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <section className="login-reg h-screen">
        <div className="overlay">
          <div className="container">
            <div className="top-area pt-2">
              <div className="row d-flex align-items-center">
                <div className="col-sm-5 col">
                  <Link className="back-home flex text-light" href="/">
                    <img src="/images/icon/left-icon.png" alt="image" />
                    Back To Egamlio
                  </Link>
                </div>
                <div className="col-sm-2 text-center col">
                  <Link href="/">
                    <img src="/images/logo.png" alt="image" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="row pt-20 d-flex justify-content-center">
              <div className="col-md-6 col-12">
                <div className="login-reg-main text-center">
                  <div className="form-area">
                    <div className="section-text">
                      <h4>Customer Registration Form</h4>
                      <p>
                        We're so excited to have you on board. Fill in to your
                        details below to get started
                      </p>
                    </div>
                    <form action="#">
                      <Box>
                        <Stepper activeStep={activeStep} orientation="vertical">
                          {steps.map((step, index) => (
                            <Step key={step.label} >
                              <StepLabel
                                optional={
                                  index === 2 ? (
                                    <Typography variant="caption">
                                      Last step
                                    </Typography>
                                  ) : null
                                }
                              >
                                <strong className="text-white">
                                  {step.label}
                                </strong>
                              </StepLabel>
                              <StepContent>
                                {step.description}
                                <Box sx={{ mb: 2 }}>
                                  <div className="float-left mt-2">
                                    <Button
                                      className="cmn-btn"
                                      variant="contained"
                                      onClick={handleNext}
                                      sx={{ mt: 1, mr: 1 }}
                                    >
                                      {index === steps.length - 1
                                        ? "Finish"
                                        : "Continue"}
                                    </Button>
                                    <Button
                                      className="cmn-btn outlined"
                                      disabled={index === 0}
                                      onClick={handleBack}
                                      sx={{ mt: 1, mr: 1 }}
                                    >
                                      Back
                                    </Button>
                                  </div>
                                </Box>
                              </StepContent>
                            </Step>
                          ))}
                        </Stepper>
                        {activeStep === steps.length && (
                          <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>
                              All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                              Reset
                            </Button>
                          </Paper>
                        )}
                      </Box>
                    </form>
                  </div>
                  <div className="account mt-30">
                    <p>
                      {" "}
                      Already have an account?{" "}
                      <Link href="login">Login Here</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default register;
