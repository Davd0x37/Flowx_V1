import React from 'react';
import { ChevronRight, Folder } from 'react-feather';

import UnstyledButton from '@components/UnstyledButton';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import Expander from './Expander';
import File from './File';

function Directory({ name, slug, isExpanded, onClick, children }) {
  return (
    <Wrapper>
      <Header onClick={() => onClick(slug)}>
        <Expander />
        <IconWrapper animate={{ rotate: isExpanded ? 90 : 0 }}>
          <ChevronRight size={14} />
        </IconWrapper>
        {name}
      </Header>
      <Files
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
          overflow: isExpanded ? undefined : 'hidden',
        }}
        style={{}}
      >
        {children}
      </Files>
    </Wrapper>
  );
}
const Wrapper = styled.div``;
const Header = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  gap: 4px;
  height: var(--row-height);
  color: inherit;
`;
const Files = styled(motion.div)`
  padding-left: calc(16px + 4px);
  height: 0px;
`;
const IconWrapper = styled(motion.div)`
  svg {
    display: block;
  }
`;
export default Directory;
