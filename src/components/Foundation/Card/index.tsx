import React, { HTMLAttributes, ReactHTMLElement } from 'react';
import styled from 'styled-components';

interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    height?: string;
    width?: string;
    background?: string;
    boxShadow?: string;
}

const Card: React.FC<CardProps> = ({height, width, background, boxShadow, children}, props) => {
    return (
        <StyledCard height={height ?? '100%'} width={width ?? '100%'} boxShadow={boxShadow} background={background} {...props}>
            {children}
        </StyledCard>
    )
}

const StyledCard = styled.div<{width: string; height: string,boxShadow?: string; background?: string}>`
    width: ${({ width }) => width};
    height:  ${({height }) => height};
    background: ${({background, theme}) => background ?? theme.colors.gradient};
    box-shadow: ${props => props.boxShadow ?? props.theme.shadows.card};
    border-radius: ${props => props.theme.radii.default};
`;



export default Card;