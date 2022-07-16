import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components';
import { Card, Wrapper } from '../Foundation';

interface DropdownMenuProps {
    options: Array<React.ReactNode>
}

const DropdownMenu: FC<DropdownMenuProps> = (props) => {
    const theme = useTheme();

    return (
        <Card background={theme.colors.primary} height="min-content" width="100vw">
            <Wrapper gap={`${theme.spacing[4]}px`} padding={`${theme.spacing[4]}px`}>
                    {props.options.map((opt, i) => (
                        <div key={`menu-item-${i}`}>
                            {opt}
                        </div>
                    ))}
            </Wrapper>
        </Card>
    )
}

export default DropdownMenu;