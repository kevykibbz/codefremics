import React, { useEffect, useState } from "react";
import { FormGroup, TextField, FormControl,FormControlLabel,Checkbox,styled } from "@mui/material";
import { step3Schema } from "./schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorText from "../errors/errorText";

interface Step3Props {
  onNext: (data: any) => void;
  onValidate: (data: any) => void;
}

function Step3({onNext,onValidate}:Step3Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(step3Schema),
  });



  const mobileNumber = watch("mobileNumber");
  const description = watch("description");

  
  useEffect(() => {
    if (mobileNumber || description) {
      trigger(["mobileNumber", "description"]);
      onNext({mobileNumber,description})
      onValidate({errors})

    }
  }, [mobileNumber, description]);
  
  return (
    <div className="row">
      <div className="col-12">
        <FormGroup>
          <FormControl>
            <TextField
              label="Mobile Number"
              id="mobile_number"
              {...register("mobileNumber")}
              type="tel"
              error={!!errors.mobileNumber}
              helperText={<ErrorText error={errors.mobileNumber} />}
              InputLabelProps={{
                sx: {
                  color: "#fff",
                  "&.Mui-focused": {
                    color: "#6269d8",
                  },
                },
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6269d8",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6269d8",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6269d8",
                  },
                  "&.Mui-disabled": {
                    color: "#fff",
                  },
                },
              }}
            />
          </FormControl>
        </FormGroup>
        <FormGroup className="mt-3">
          <FormControl>
            <TextField
              label="Description"
              id="description"
              type="text"
              multiline
              {...register("description")}
              error={!!errors.description}
              helperText={<ErrorText error={errors.description} />}
              InputLabelProps={{
                sx: {
                  color: "#fff",
                  "&.Mui-focused": {
                    color: "#6269d8",
                  },
                },
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6269d8",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6269d8",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6269d8",
                  },
                  "&.Mui-disabled": {
                    color: "#fff",
                  },
                },
              }}
            />
          </FormControl>
        </FormGroup>
      </div>
    </div>
  );
}

export default Step3;
