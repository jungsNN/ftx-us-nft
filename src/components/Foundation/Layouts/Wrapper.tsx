import React from 'react';
import styled from "styled-components";
import { WrapperProps } from '../types';

const Wrapper = styled.div<WrapperProps>`
    display: grid;
    grid-auto-flow: ${props => props.by === "col" ? "column" : "row"};
    grid-gap: ${props => props.gap};
    padding: ${props => props.padding};
    padding-left: ${props => props.pl};
    padding-right: ${props => props.pr};
    padding-bottom: ${props => props.pb};
    padding-top: ${props => props.pt};
    align-items: ${props => props.align};
    justify-content: ${props => props.justify};
    justify-items: ${props => props.items};
`;

export default Wrapper;