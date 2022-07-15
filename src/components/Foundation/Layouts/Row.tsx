import React from "react";
import { WrapperProps } from "../types";
import Wrapper from "./Wrapper";

const Row: React.FC<WrapperProps> = ({children}, props) => {
    return (
        <Wrapper by="row" {...props}>
            {children}
        </Wrapper>
    )
}

export default Row;