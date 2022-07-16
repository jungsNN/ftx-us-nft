import React from 'react';
import styled from 'styled-components';
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints';
import Footer from '../../Footer';
import NavHeader from '../../NavHeader';

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>>  = ({children}) => {
    const { isMobile } = useMatchBreakpoints()

    return (
        <StyledPage>
            <NavHeader />
            <BodyWrapper>
                {children}
            </BodyWrapper>
            {!isMobile && <FooterWrapper>
                <Footer />
            </FooterWrapper>}
        </StyledPage>
    );
}


const StyledPage = styled.div`
    width: 100%;
    height: 100vh;
    background: ${({theme}) => theme.colors.bg};
`
const BodyWrapper = styled.div`
    @media(max-width: 638px) {
        display: grid;
        width: 100%;
        height: 100%;
        justify-content: center;
    }
`;

const FooterWrapper = styled.div`
    bottom: 0;
    height: 100%;
    max-height: 200px;
    display: flex;
    align-items: flex-end;
`;

export default Page;