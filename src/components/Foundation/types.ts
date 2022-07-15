import React from "react";
// import { SpaceProps } from "styled-system";

export interface ContainerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    width?: string;
    height?: string;
    background?: string;
    // children: React.ReactNode | React.ReactNode[];
}


export interface WrapperProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    // children: React.ReactNode | React.ReactNode[];
    align?: string;
    justify?: string;
    items?: string;
    gap?: string;
    by?: 'row' | 'col';
    padding?: string;
    pr?: string;
    pl?: string;
    pb?: string;
    pt?: string;
}
