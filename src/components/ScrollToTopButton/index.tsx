import React from 'react';
import styled from 'styled-components';
import { Text } from '../Foundation';

interface ToTopButtonProps {
    visible?: boolean
    ref? : any
  }
  
const ScrollToTopButton: React.FC<ToTopButtonProps> = ({  ...props }) => {
	
  const { visible } = props

  const scrollToTop = (): void => {
    document.body.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <>
        <ButtonWrapper visible={visible}>
          <StickyButton className='totop-btn' disabled={!visible} onClick={scrollToTop}>
                <Text style={{textAlign: 'right'}}>
                    Go to top
                </Text>
          </StickyButton>
        </ButtonWrapper>
    </>
  )
}

export const TopInvisibleDiv = styled.div`
    background: transparent;
    position: fixed;
    top: 10px;
    left: 0%;
  `

export const ToTopAnchorDiv = styled.div`
  height: 1px;
  // margin: 23px 0 41px;
  background: transparent;
`

const ButtonWrapper = styled.div<{visible?: boolean}>`
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    justify-items: end;
    position: sticky;
    bottom: 5%;
    right: 0%;
    z-index: ${({ visible }) => visible ? 99 : 0};
    transition: opacity 0.2s ease-in;
    opacity: ${({ visible }) => visible ? 1 : 0};
    .totop-btn {
        cursor: ${({ visible }) => visible ? 'pointer' : 'none'};
    }
`

const StickyButton = styled.button`
    background: #ffffff2e;;
    border: none;
    box-shadow: none;
    padding: 4px 16px;
    border-radius: 4px;
    transition: background 0.2s ease-in;

    &:hover {
      background: #ffffff69;
      transition: background 0.2s ease-in;
    }
`

export default ScrollToTopButton
