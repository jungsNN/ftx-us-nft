import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { Card, Wrapper } from '../Foundation';
import { DropdownMenuOption } from '../types';

interface DropdownMenuProps {
    options: Array<DropdownMenuOption>
}

const DropdownMenu: FC<DropdownMenuProps> = (props) => {
    const theme = useTheme();

    return (
        <Card background={theme.colors.primary} height="100%" width="100vw">
            <Wrapper gap={`${theme.spacing[4]}px`} padding={`${theme.spacing[4]}px`}>
                {props.options.map(opt => (
                    opt.href 
                        ? (
                            <MenuLink to={opt.href}>{opt.element}</MenuLink>
                        )
                        : (
                            <div>
                                {opt.element}
                            </div>
                        )
                ))}
            </Wrapper>
        </Card>
    )
}

const MenuLink = styled(Link)`
    text-decoration: none;
`;
export default DropdownMenu;