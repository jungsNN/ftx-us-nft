import React from 'react';
import styled from 'styled-components';
import { Wrapper } from '../Layouts';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'default' | 'outlined' | 'text' | 'disabled';
    onClick?: (e?: any) => void;
}

const Button: React.FC<ButtonProps> = ({variant, onClick, children}, props) => {
    return (
        <StyledButton className="button-el" variant={variant ?? "default"} onClick={onClick} {...props}>
            <Wrapper justify="center" align="center">
                {children}
            </Wrapper>
        </StyledButton>
    )
} 

const StyledButton = styled.div<{variant: string}>`
    width: max-content;
    padding: 8px 18px;
    background: ${({ variant, theme }) => 
        variant === 'outlined' || variant === 'text'
            ? 'transparent'
            : variant === 'disabled' 
                ? theme.colors.disabled
                : theme.colors.buttonSurface};
    border: ${props => props.variant === 'disabled' 
        ? props.theme.colors.disabled
        : props.variant === 'outlined' 
            ? `2px solid ${props.theme.colors.textHighlight}`
            : 'none'};
    border-radius: ${props => props.variant === "outlined" 
        ? props.theme.radii.small 
        : props.theme.radii.default};
    cursor: pointer;
    box-shadow: none;
    color: ${props => props.variant === 'disabled' 
    ? '#000'
    : props.variant === "text" || props.variant === "outlined"
        ? props.theme.colors.primary
        : props.theme.colors.buttonText};
    `;

export default Button;