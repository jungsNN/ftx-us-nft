import React from 'react';
import Card from '../Card';
import Wrapper from '../Layouts/Wrapper';
import { ContainerProps } from '../types';

const Hero: React.FC<ContainerProps> = ({height, width, children }) => {
    return (
    <Card height={height} width={width ?? '100%'}>
        <Wrapper padding="1rem">
            {children}
        </Wrapper>
    </Card>

    );
}

export default Hero;
