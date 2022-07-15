
import React from 'react';
import { useTheme } from 'styled-components';
import useMatchBreakpoints from '../../hooks/useMatchBreakpoints';
import { Wrapper } from '../Foundation';
import { WrapperProps } from '../Foundation/types';

const GridView: React.FC<WrapperProps> = ({children}) => {
    const { isMobile } = useMatchBreakpoints();
    const theme = useTheme();

    return (
        <Wrapper gap={`${theme.spacing[4]}px`} justify="center" >
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
                gridGap: '1rem',
            }}>

                {children}
            </div>
        </Wrapper>
    )
}

export default GridView;


// {Object.values(data).map(item => 
//     <div 
//         onClick={() => {
//             if (isCollection) {
//                 console.log(item.groupId)
//             }else {
//                 console.log(item.id)
//             }

//             onSelectItem &&
//             onSelectItem(isCollection ? item.id : item.groupId)
//         }}
//     >
//     {isCollection 
//         ? (
            
//                 <NFTCollectionCard 
//                     width={isMobile ? '100%' : isTablet ? '200px' : '300px'}
//                     collection={item as NFTCollectionMetadata} 
//                 />
//         ) : (
//             <NFTCard nft={item as NFT} />
//         )}
//     </div>
// )}