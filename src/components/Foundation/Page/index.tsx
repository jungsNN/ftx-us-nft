import React from 'react';
import styled from 'styled-components';
import NavHeader from '../../NavHeader';

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>>  = ({children}) => {

    return (
        <StyledPage>
            <NavHeader />
            <BodyWrapper>
                {children}
            </BodyWrapper>
        </StyledPage>
    );
}


const StyledPage = styled.div`
    width: 100vw;
    height: 100vh;
    background: ${({theme}) => theme.colors.bg};
`
const BodyWrapper = styled.div`
    
    ${({ theme }) => theme.mediaQueries.mobile} {
        padding: 0;
    }
        
    ${({ theme }) => theme.mediaQueries.tablet} {
        padding: 0 1rem;
    }
`;

export default Page;