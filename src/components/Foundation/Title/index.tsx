import React, { FC } from 'react';
import { typography } from '../../../style/typography';
import Text from '../Text';

const Title = ({children}: {children: React.ReactNode}) => {
    return (
        <Text fontSize={typography.h1Regular.fontSize} lineHeight={typography.h1Regular.lineHeight}>
            {children}
        </Text>
    )
}

export default Title;