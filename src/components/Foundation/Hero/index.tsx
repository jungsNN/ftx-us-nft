import React from 'react';
import styled from 'styled-components';
import Card from '../Card';
import Wrapper from '../Layouts/Wrapper';
import { ContainerProps } from '../types';

interface HeroProps extends ContainerProps {
    backgroundImgUrl?: string;
}

const Hero: React.FC<HeroProps> = ({backgroundImgUrl, height, width, children }) => {
    return (
        <div style={{position: 'relative'}}>
        <HeroCard height={height} width={width ?? '100%'}>
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

const HeroCard = styled(Card)<{width: string; height?: string}>`
    height: ${({height}) => height};
    width: ${({width}) => width};
    overflow: hidden;
`;

const ContentWrapper = styled(Wrapper)`
    padding: 1rem;
    z-index: 1;
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
