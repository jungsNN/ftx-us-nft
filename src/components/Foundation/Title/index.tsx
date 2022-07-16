import React, { FC } from 'react';
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints';
import { typography } from '../../../style/typography';
import Text from '../Text';
import { TextProps } from '../Text/types';

interface TitleProps extends TextProps, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

const Title: FC<TitleProps> = ({children,}, props) => {
    const { isMobile } = useMatchBreakpoints();
    return (
        <Text 
            fontSize={typography.h1Regular.fontSize} 
            lineHeight={typography.h1Regular.lineHeight}  
            style={{letterSpacing: '0.03em', textAlign: isMobile ? 'center' : 'left'}}
            {...props}>
            <p  >
                {children}
            </p>
        </Text>
    )
}

export default Title;