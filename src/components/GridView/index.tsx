
import React from 'react';
import { useTheme } from 'styled-components';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
// import { Wrapper } from '../Foundation';
import { WrapperProps } from '../Foundation/types';

interface GridViewProps extends WrapperProps {
    gap?: string;
}
const GridView: React.FC<GridViewProps> = ({gap, children}) => {
    const { isMobile, isTablet } = useMatchBreakpoints();
    const theme = useTheme();

    return (
        <div style={{
            width: isMobile ?'100vw' : '100%',
            justifyItems: 'center',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
            gridGap: gap ?? isTablet ? `${theme.spacing[3]}px` : `${theme.spacing[4]}px`,
        }}>

            {children}
        </div>
        // <Wrapper gap={isTablet ? `${theme.spacing[2]}px` : `${theme.spacing[4]}px`} justify="center" >
        
            
        // </Wrapper>
    )
}

export default GridView;