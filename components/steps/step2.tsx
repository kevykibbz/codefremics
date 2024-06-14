import React, { useEffect, useState } from "react";
import {
  FormGroup,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  styled,
} from "@mui/material";
import { step2Schema } from "./schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import WarningIcon from "@mui/icons-material/Warning";
import Select from '@mui/material/Select';

interface Step2Props {
  onNext: (data: any) => void;
  onValidate: (data: any) => void;

}
function Step2({ onNext,onValidate }: Step2Props) {

  const StyledFormControl = styled(FormControl)(({ theme }) => ({
    "& .MuiInputLabel-root": {
      color: "#fff",
      "&.Mui-focused": {
        color: "#6269d8",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#6269d8",
      },
      "&:hover fieldset": {
        borderColor: "#6269d8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6269d8",
      },
      "& .MuiSelect-root": {
        color: "#fff",
      },
      "& .MuiSelect-select": {
        color: "#fff",
        "&:focus": {
          color: "#fff",
        },
        "& option": {
          textAlign: "left",
        },
      },
      "& .MuiSelect-icon": {
        color: "#6269d8",
      },
    },
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(step2Schema),
  });


  const email = watch("email");
  const gender = watch("gender");


  useEffect(() => {
    if (email || gender) {
      trigger(["email", "gender"]);
      onNext({email,gender})
      onValidate({errors})

    }
  }, [email, gender]);


  return (
    <div className="row">
      <div className="col-12">
        <FormGroup>
          <FormControl>
            <TextField
              label="Email Address"
              id="email"
              {...register("email")}
              type="email"
              error={!!errors.email}
              helperText={
                errors.email ? (
                  <React.Fragment>
                    <WarningIcon color="error" />
                    {errors.email.message}
                  </React.Fragment>
                ) : (
                  ""
                )
              }
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
          <FormControl error={!!errors.gender} fullWidth>
            <StyledFormControl>
              <InputLabel id="gender-select">Gender</InputLabel>
              <Select
                labelId="gender-select"
                id="gender"
                {...register("gender")}
                label="Gender"
                value={gender}
                sx={{
                  "& option": {
                    textAlign: "left",
                  },
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.gender && (
                <FormHelperText
                  sx={{ color: "red", display: "flex", alignItems: "center" }}
                >
                  <WarningIcon color="error" sx={{ marginRight: "4px" }} />
                  {errors.gender.message}
                </FormHelperText>
              )}
            </StyledFormControl>
          </FormControl>
        </FormGroup>
      </div>
    </div>
  );
}

export default Step2;
