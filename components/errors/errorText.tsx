import WarningIcon from "@mui/icons-material/Warning";
import React from "react";

const ErrorText = ({ error }:any) => {
    if (!error) return null;

    return (
        <React.Fragment>
            <WarningIcon color="error" />
            {error.message}
        </React.Fragment>
    );
};

export default ErrorText;