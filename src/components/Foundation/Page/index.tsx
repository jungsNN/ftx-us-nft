import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import useMatchBreakpoints from '../../../hooks/useMatchBreakpoints';
import Text from '../Text';
import DropdownMenu from '../../DropdownMenu';
import Footer from '../../Footer';
import NavHeader from '../../NavHeader';
import Button from '../Button';

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>>  = ({children}) => {
    const navigate = useNavigate()
    const theme = useTheme();
    const { isMobile } = useMatchBreakpoints()
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const mobileMenuRef = useRef(null);
    
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (mobileMenuRef?.current && 
                // @ts-ignore
                (mobileMenuRef?.current.contains(event.target) )
            ) {
                setShowMobileMenu(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [mobileMenuRef])

    const toggleMenu = (openMenu?: boolean) => {
        setShowMobileMenu(openMenu === true 
                ? true
                : openMenu === false 
                    ? false
                    : !showMobileMenu)
    }

    const handleNavigate = (to: string) => {
        setShowMobileMenu(false)
        navigate(to)
    }

    return (
        <StyledPage>
            <NavHeader handleMobileMenu={toggleMenu}/>
            <BodyWrapper>
                {children}
            </BodyWrapper>
            {!isMobile && <FooterWrapper>
                <Footer />
            </FooterWrapper>}
            {(isMobile && showMobileMenu) && 
                <MenuOverlay ref={mobileMenuRef}/>}
            {(isMobile && showMobileMenu) && (
                <MobileMenuWrapper>
                    <DropdownMenu options={[
                        <MenuOption>
                            <Button variant="text" color={theme.colors.textPrimary} onClick={() => handleNavigate('/collections')}>
                                <Text fontWeight="600">Collections</Text>
                            </Button>
                        </MenuOption>
                        ,
                        <MenuOption>
                            <Button  variant="text" color={theme.colors.textPrimary} onClick={() => handleNavigate('/nfts')}>
                                <Text fontWeight="600">NFTs</Text>
                            </Button>
                        </MenuOption>
                    ]}/>
                </MobileMenuWrapper>
            )}
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
        padding-top: 80px;
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

const MenuOverlay = styled.div`
    position: fixed;
    height: 100%;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    background: #222832ab;

    > * a {
        text-decoration: none;
    }
`;

const MobileMenuWrapper = styled.div`
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    z-index: 50;
    background: #222832ab;

    > * a {
        text-decoration: none;
    }
`;

const MenuOption = styled.div`
    > * {
        display: flex;
        width: 100%;
        justify-content: start;
        background: ${props => props.theme.colors.primary};

        &:focus {
            background: ${props => props.theme.colors.tertiary};
        }
    }

`;

export default Page;