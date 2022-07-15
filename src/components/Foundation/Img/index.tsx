import React, { useEffect, useRef, useState } from "react";
import { space, SpaceProps } from "styled-system";
import styled from "styled-components";

interface ImageProps extends ContainerProps, SpaceProps {
  src: string;
  alt?: string;
}

interface ContainerProps {
    width?: string;
    height?: string;
    responsive?: boolean;
  }

const observerOptions = {
    root: null,
    rootMargin: "200px",
    threshold: 0,
  };
  
const Img: React.FC<ImageProps> = ({ src, alt, ...otherProps }) => {
  const { width, height, ...rest} = otherProps;
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = (imgRef.current as unknown) as HTMLImageElement;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      });
    }, observerOptions);
    observer.observe(img);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <ImgWrapper width={width ?? '100%'} height={height ?? '100%'} responsive={otherProps.responsive ?? false} ref={imgRef} {...otherProps}>
       {isLoaded ? <NftImage className="media-content" src={src} alt={alt} /> : <Placeholder />}
    </ImgWrapper>
  );
};

const ImgWrapper = styled.div<{height: string;  width: string; responsive: boolean}>`
  position: relative;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: inline-grid;
  height: ${({ height, responsive }) => (responsive ? 0 : height)};
  max-width: ${({ width }) => width};
  max-height: ${({ height }) => height};
  border-radius: ${props => props.theme.radii.default};
  overflow: hidden;
  
  ${space}
  `;

const NftImage = styled.img`/* 
  width: 100%;
  height: 100%;
  -webkit-user-drag: none;
`

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;


export default Img;
