import React, { FC, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Button, Text } from '../Foundation';

interface PageButtonsProps {
    count: number;
    maxPerPage: number;
    currentPage: number;
    onChange: (pg:number) => void;
}

const PageButtons: FC<PageButtonsProps> = (props) => {
    const theme = useTheme();
    const { count, currentPage, maxPerPage, onChange } = props;
    const [batchIndex, setBatchIndex] = useState(0)
    const [isLastPage, setIsLastPage] = useState(false)

    useEffect(() => {
        setIsLastPage(currentPage >= parseInt(String(count / maxPerPage)))
    }, [currentPage, count, maxPerPage])
    
    const handleChange = (pg: number) => {
        onChange(pg - 1)
    }

    const pageNumArray = () => {
        if (isLastPage) {
            return Array(currentPage - (batchIndex * 5))
        }
        return Array(parseInt(String(count / maxPerPage))).slice(0, 5)
        
    }
    
    return (
        <StyledPageButtons>
            {
                count > 5
                    ? (<ul style={{display: 'inline-flex', alignItems: 'center'}}>
                        <>
                            <button 
                                disabled={currentPage < 5} 
                                className="page-btn" 
                                onClick={() => {
                                    setBatchIndex(batchIndex - 1)
                                    onChange(currentPage - currentPage % 5 - 4)
                                }}>
                                <Text>{"<<"}</Text>
                            </button>
                            {Array.from(pageNumArray().keys(), n => (n + 1) + batchIndex * 5)
                                    .map((i) => (
                                        <li key={`page-${i}`} style={{listStyle: 'none'}}>
                                            {<button className="page-btn" onClick={() => {
                                                // update current page
                                                handleChange(i+1)
                                            }}>
                                                <Text 
                                                    bold={currentPage=== i}
                                                    color={currentPage === i ? theme.colors.textHighlight : theme.colors.textPrimary}
                                                >
                                                    {i}
                                                </Text>
                                            </button>}
                                        </li>
                                    ))
                                }
                            <button disabled={currentPage >= (count / maxPerPage - 5) } className="page-btn" onClick={() => {
                                    setBatchIndex(batchIndex + 1)
                                    onChange(batchIndex * 5 + 6)
                                }}>
                                <Text>{">>"}</Text>
                            </button>
                        </>
                        </ul>)
                    : count > 0 
                        ?   (<ul style={{display: 'inline-flex'}}>
                                { Array.from(Array(count).keys(), n => n + 1)
                                    .map((i) => (
                                        <li key={`page-${i}`} style={{listStyle: 'none'}}>
                                            {<button className="page-btn" onClick={() => onChange(i)}>
                                                <Text>{i}</Text>
                                            </button>}
                                        </li>
                                    ))
                                }
                            </ul>)
                        : (
                            <Button variant="disabled" >
                                <Text>1</Text>
                            </Button>
                        ) 
                }
        </StyledPageButtons>
    )
}

const StyledPageButtons = styled.div`
    display: flex;
    width:100%;
    justify-content: center;

    > * .page-btn {
        background: transparent;
        border: none;
        box-shadow: none;
        padding: 4px 16px;
    }
`;

export default PageButtons;