import React, { FC } from 'react';
import styled from 'styled-components';
import { Text } from '../Foundation';

interface SelectProps {
    options: Array<string>;
    currentOption: string;
    onOption: (e: string) => void; 
}
const Select: FC<SelectProps & React.AllHTMLAttributes<HTMLDivElement>> = ({
    options, currentOption, onOption
}: SelectProps, props) => {

    return (
        <div className="select-wrapper" {...props}>
            <StyledSelect value={currentOption} onChange={(e) => onOption(e.target.value)}>
                {options.map(opt => (
                    <Option selected={currentOption === opt}>
                        <Text >
                            {opt}
                        </Text>
                    </Option>
                ))}
            </StyledSelect>
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