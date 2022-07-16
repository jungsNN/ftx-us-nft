import React from 'react';
import styled from 'styled-components';
import Footer from '../../Footer';
import NavHeader from '../../NavHeader';

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>>  = ({children}) => {

    return (
        <StyledPage>
            <NavHeader />
            <BodyWrapper>
                {children}
            </BodyWrapper>
            <Footer />
        </StyledPage>
    );
}


const StyledPage = styled.div`
    width: 100%;
    height: 100vh;
    background: ${({theme}) => theme.colors.bg};
`
const BodyWrapper = styled.div`
    
    ${({ theme }) => theme.mediaQueries.mobile} {
        padding: 0;
    }

    @media(min-width: 638px) {
        padding: 0 32px;
    }
`;

export default Page;