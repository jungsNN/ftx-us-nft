import React from 'react';
import styled from 'styled-components';

const Logo = () => {
    return (
        <ImgWrapper width="160px" height="50px">
            <img src="ftxlogo_dark.png" alt="logo-dark" width="100%" height="100%"/>
        </ImgWrapper>
    )
}

const ImgWrapper = styled.div<{
    width: string;
    height: string;
}>` 
    width: 100%;
    height: 100%;
    min-width: ${({width}) => width};
    max-width:  ${({width}) => width};
    min-height: ${({height}) => height};
    max-height: ${({height}) => height};
    overflow: hidden;
    display: grid;
    border-radius: 4px;
    cursor: pointer;
`;

export default Logo;