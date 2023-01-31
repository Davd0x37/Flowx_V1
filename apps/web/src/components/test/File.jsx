import React from 'react';
import { File as FileIcon } from 'react-feather';

import UnstyledButton from '@components/UnstyledButton';
import styled from 'styled-components';

import Expander from './Expander';

function File({ file, slug, isExpanded, onClick }) {
  return (
    <Wrapper
      style={{
        '--color': file.isSelected ? 'hsl(50deg 100% 60%)' : 'inherit',
        '--weight': file.isSelected ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
      }}
      onClick={() => onClick(slug)}
      tabIndex={isExpanded === false ? -1 : undefined}
    >
      <Expander
        style={{
          '--opacity': file.isSelected ? 0.1 : 0,
        }}
      />
      <IconWrapper>
        <FileIcon size={14} color={file.isSelected ? 'hsl(50deg 100% 60%)' : 'hsl(0deg 0% 100% / 0.5)'} />
      </IconWrapper>
      {file.name}
    </Wrapper>
  );
}
const Wrapper = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  gap: 4px;
  height: var(--row-height);
  color: var(--color);
  font-weight: var(--weight);
`;
const IconWrapper = styled.div`
  transform: translateX(-2px);
`;
export default File;
