import React from 'react';
import styled from 'styled-components';
import Wrapper from '../Layouts/Wrapper';
import { ContainerProps } from '../types';

interface HeroProps extends ContainerProps {
    backgroundImgUrl?: string;
}

const Hero: React.FC<HeroProps> = ({backgroundImgUrl, width, height, children }) => {
    return (
        <div style={{position: 'relative', width: width}}>
            <HeroCard height={height}>
                <ContentWrapper>
                    {children}
                </ContentWrapper>
                {backgroundImgUrl && (
                    <ImgWrapper>
                        <img src={backgroundImgUrl} alt="hero-card-bg"/>
                    </ImgWrapper>
                )}
            </HeroCard>
        </div>

    );
}

const HeroCard = styled.div<{height?: string}>`
    height: ${({height}) => height};
    width: 100%;
    overflow: hidden;
    align-items: center;
    display: flex;
    background: ${({ theme}) => theme.colors.gradient};
    box-shadow: ${props => props.theme.shadows.card};
    border-radius: 16px;
    max-width: 1200px;
    padding: 24px 16px;

    @media(min-width: 638px) {
        padding: 16px 32px;
        border-radius: 32px;
    }
`;

const ContentWrapper = styled(Wrapper)`
    z-index: 1;

    @media(min-width: 638px) {
        padding: 1rem;
    }
`;

const ImgWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(1px);
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.3;
    overflow:hidden;

    img {
        overflow:hidden;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export default Hero;
