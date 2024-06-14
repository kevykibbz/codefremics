import React,{useEffect} from "react";
import { FormGroup, TextField, FormControl,  } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "./schemas";
import ErrorText from "../errors/errorText";
interface Step1Props {
  onNext: (data: any) => void;
  onValidate: (data: any) => void;
}



const Step1: React.FC<Step1Props> = ({ onNext,onValidate }:Step1Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,trigger
  } = useForm({
    resolver: zodResolver(step1Schema),
  });


  const firstName = watch("firstName");
  const otherNames = watch("otherNames");

  

  useEffect(() => {
    if (firstName || otherNames) {
      trigger(["firstName", "otherNames"]);
      onNext({firstName,otherNames});
      onValidate({errors})
    }
  }, [firstName, otherNames]);


  
  return (
    <div className="row">
      <div className="col-12">
        <FormGroup>
          <FormControl>
            <TextField
              label="First Name"
              id="first_name"
              {...register("firstName")}
              type="text"
              error={!!errors.firstName}  
              helperText={<ErrorText error={errors.firstName} />}
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
              label="Other Names"
              id="other_names"
              {...register("otherNames")}
              type="text"
              error={!!errors.otherNames}
              helperText={<ErrorText error={errors.otherNames} />}
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
};

export default Step1;
