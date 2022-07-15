import React from 'react';
import styled from 'styled-components';

const CircleAvatar = ({src, alt, size}: {
    src: string;
    alt: string;
    size?: string;
}) => {
    return (
        <AvatarWrapper size={size ?? '60px'}>
            <img src={src} alt={alt} />
        </AvatarWrapper>
    )
}

const AvatarWrapper = styled.div<{size: string}>`
    width: ${({size}) => size};
    height: ${({size}) => size};
    
    img {
        object-fit: contain;
        border-radius: 50%;
        width: 100%;
        height: 100%;
        min-width: ${({size}) => size};
        max-width:  ${({size}) => size};
        min-height: ${({size}) => size};
        max-height: ${({size}) => size};
        display: grid;
    }
`;

export default CircleAvatar;