import styled from 'styled-components';

const Expander = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: var(--row-height);
  border-radius: 1000px;
  background: white;
  opacity: var(--opacity, 0);
  transition: opacity 200ms;
`;
export default Expander;
