import React, { ReactNode, useEffect, useState,useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Step1 from "@/components/steps/step1";
import Step2 from "@/components/steps/step2";
import Step3 from "@/components/steps/step3";
import { isEmpty } from "lodash";
import { getAccessTokenFromCookies } from "@/utils/cookie";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

interface Step {
  label: string;
  description: ReactNode;
}

interface loadingData {
  isLoading: boolean;
}

interface UserFormData {
  firstName: string;
  otherNames: string;
  email: string;
  gender: string;
  mobileNumber: string;
  description: string;
}

type Errors = {
  [key: string]: string;
};
function AddCustomer() {
  const [loading, setLoading] = useState<loadingData>({ isLoading: false });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    otherNames: "",
    email: "",
    gender: "",
    mobileNumber: "",
    description: "",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps: Step[] = [
    {
      label: "Personal Information",
      description: (
        <Step1
          onNext={(data: any) => setFormData({ ...formData, ...data })}
          onValidate={(data: any) => setFormErrors({ ...formErrors, ...data })}
        />
      ),
    },
    {
      label: "Additional Information",
      description: (
        <Step2
          onNext={(data: any) => setFormData({ ...formData, ...data })}
          onValidate={(data: any) => setFormErrors({ ...formErrors, ...data })}
        />
      ),
    },
    {
      label: "Security Information",
      description: (
        <Step3
          onNext={(data: any) => setFormData({ ...formData, ...data })}
          onValidate={(data: any) => setFormErrors({ ...formErrors, ...data })}
        />
      ),
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({ isLoading: true });
    try {
        const accessToken = getAccessTokenFromCookies();
        const myData={
            "first_name":formData.firstName,
            "other_names":formData.otherNames,
            "gender":formData.gender,
            "mobile_number":formData.mobileNumber,
            "email":formData.email,
            "description":formData.description
        }

        const response = await axios.post(
          "https://stemprotocol.codefremics.com/api/v2/customers/create",
          myData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
    
        formRef.current?.reset();
        console.log("Customer created successfully:", response.data);
        toast.success(response.data.description);
    
        // Optionally, reset the form or navigate to another page
      } catch (error:any) {
        console.error("Error creating customer:",error.response?.data.msg);
        toast.error(`Error creating customer:${error.response?.data.msg}`);
      } finally {
        setLoading({ isLoading: false });
      }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit} ref={formRef}>
        <Box>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  <strong className="text-white">{step.label}</strong>
                </StepLabel>
                <StepContent>
                  {step.description}
                  <Box sx={{ mb: 2 }}>
                    <div className="float-left mt-2">
                      {index === steps.length - 1 ? (
                        <Button
                          className="cmn-btn"
                          variant="contained"
                          disabled={loading.isLoading}
                          type="submit"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {loading.isLoading ? (
                            <>
                              <CircularProgress
                                className="text-light ml-2"
                                size={18}
                              />
                              <span className="ml-2 text-light flex">
                                Please wait...
                              </span>
                            </>
                          ) : (
                            "Finish"
                          )}
                        </Button>
                      ) : (
                        <Button
                          className="cmn-btn"
                          variant="contained"
                          disabled={!isEmpty(formErrors.errors)}
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Continue
                        </Button>
                      )}

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
        </Box>
      </form>
    </>
  );
}

export default AddCustomer;
