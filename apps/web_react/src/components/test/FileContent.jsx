import React from 'react';

import Paper from '@components/Paper';
import StaticCodeSnippet from '@components/StaticCodeSnippet';
import styled from 'styled-components';

const FileContent = ({ contents, ...delegated }) => {
  return (
    <Wrapper {...delegated}>
      <StaticCodeSnippet code={contents} lang="js" CodeWrapper={CodeWrapper} />
    </Wrapper>
  );
};
const Wrapper = styled(Paper)`
  background: white;
  border-radius: 4px;
  padding: 16px;
  overflow: auto;
  min-height: 420px;
`;
const CodeWrapper = styled.div`
  font-size: 0.875rem;
  color: black;
`;
export default FileContent;
