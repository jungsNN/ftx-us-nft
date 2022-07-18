import React, { FC } from 'react';
import styled from 'styled-components';
import { Text, Wrapper } from '../Foundation';

interface SelectProps {
    options: Array<string>;
    currentOption: string;
    label: string;
    onOption: (e: string) => void; 
}
const Select: FC<SelectProps & React.AllHTMLAttributes<HTMLDivElement>> = ({
    options, currentOption, label, onOption
}: SelectProps, props) => {

    return (
        <div className="select-wrapper" {...props}>
            <Wrapper items="center">
                <Text>{label}</Text>
                <StyledSelect value={currentOption} onChange={(e) => onOption(e.target.value)}>
                    {options.map(opt => (
                        <Option selected={currentOption === opt}>
                            <Text >
                                {opt}
                            </Text>
                        </Option>
                    ))}
                </StyledSelect>
            </Wrapper>
        </div>
    )
}

const StyledSelect = styled.select`
    padding: 8px;
    color: ${props => props.theme.colors.textPrimary};
    border-radius: ${props => props.theme.radii.small};
    background: ${props => props.theme.colors.tertiary};
    border: none;
    outline: none;

`;

const Option = styled.option`
    background: ${props => props.theme.colors.tertiary};
`;

export default Select;