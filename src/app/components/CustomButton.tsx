"use client";

import React from "react";
import {Button} from "@mui/material";

const CustomButton = ({children, ...props}: any) => {
    return <Button {...props}>{children}</Button>
}

export default CustomButton;