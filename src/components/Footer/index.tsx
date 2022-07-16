import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Card, Wrapper } from '../Foundation'
import { LogoDark } from '../svgs';

const Footer = () => {
    const theme = useTheme();
    return (
        <Card width="100vw" height="unset"  borderRadius="0" boxShadow="none" background={theme.colors.primary} maxWidth="100vw">
            <Wrapper padding="32px 0" justify="center" align="center">
                <LogoWrapper>
                    <LogoDark />
                </LogoWrapper>
            </Wrapper>
        </Card>
    )
}

const LogoWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    svg {

        width: 100px;
        height: 40px;
}
`;

export default Footer