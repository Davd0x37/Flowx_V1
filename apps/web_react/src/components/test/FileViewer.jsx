import React from 'react';

import Space from '@components/Space';
import styled from 'styled-components';

import FileContent from './FileContent';
import { getFile } from './FileViewer.helpers';
import Sidebar from './Sidebar';

const FileViewer = ({ initialFiles }) => {
  const [files, setFiles] = React.useState(initialFiles);
  const activeFile = getFile(files, (file) => !!file.isSelected);
  return (
    <Wrapper>
      <Sidebar files={files} setFiles={setFiles} />
      <FlexedFileContent contents={activeFile.contents} />
    </Wrapper>
  );
};
const Wrapper = styled(Space)`
  display: flex;
  gap: 8px;
  padding: 16px;
  padding-left: 4px;
  margin: 0 -32px;
  border: 1px solid var(--color-gray-100);
  @media ${(p) => p.theme.breakpoints.mdAndSmaller} {
    flex-direction: column;
    gap: 16px;
  }
`;
const FlexedFileContent = styled(FileContent)`
  flex: 1;
`;
export default FileViewer;
