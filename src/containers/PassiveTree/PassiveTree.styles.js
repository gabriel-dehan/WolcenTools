import styled from 'styled-components';

export const Canvas = styled.div`
  width: 100vw;
  height: 100vh; 
  background: rgb(19,23,26);
  background: radial-gradient(circle, rgba(19,23,26,1) 18%, rgba(1,1,1,1) 100%);
`;

export const Scene = styled.div`
  position: relative;
`;

export const Fireflies = styled.div`
  pointer-events: none;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;