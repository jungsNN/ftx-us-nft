import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { RiSearchLine as SearchIcon } from 'react-icons/ri';
import { Card } from '../Foundation';

const SearchBar = ({
    changeHandler,
}: {
    changeHandler: (e: any) => void;
}) => {
    const theme = useTheme()
    const [query, setQuery] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const wrapperRef = useRef(null)

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            // @ts-ignore
            if (wrapperRef?.current && !wrapperRef.current.contains(event.target)) {
                setIsVisible(false)
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        };
    }, [wrapperRef?.current])


  const inputHandler = useCallback(
    (e: any) => {
      setQuery(e.target.value)
      changeHandler(e.target.value)
    },
    [changeHandler],
  )

  const handleFocus = useCallback(() => {
    setIsVisible(true)
  }, [])
    
    return (
        <Card height="45px" style={{cursor: 'pointer'}} boxShadow="none" background={theme.colors.tertiary}>
            <SearchBarWrapper onFocus={handleFocus}>
                <Input 
                    type="text"
                    value={query}
                    placeholder="Search anything"
                    onChange={inputHandler}
                />
                <IconWrapper>
                    <SearchIcon/>
                </IconWrapper>
            </SearchBarWrapper>
        </Card>
    )
}

const SearchBarWrapper = styled.div`
    padding: 8px 16px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    justify-content: space-between;

    > * svg {
        width: 2em;
        height: 2em;
    }
`;

const IconWrapper = styled.div`
    svg {
        width: 1.5em;
        height: 1.5em;
    }
`;

const Input = styled.input<{ size?: number }>`
  width: 100%;
  background: transparent;
  border: 0;
  outline: 0;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.textPrimary};
  &:focus {
    color: ${({ theme }) => theme.colors.textPrimary};
    ::placeholder {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }
`

export default SearchBar;