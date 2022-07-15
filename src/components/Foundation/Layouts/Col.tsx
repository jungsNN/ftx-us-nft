import React from "react";
import { WrapperProps } from "../types";
import Wrapper from "./Wrapper";

const Col: React.FC<WrapperProps> = ({children}, props) => {
    return (
        <Wrapper by="col" {...props}>
            {children}
        </Wrapper>
    )
}

export default Col;