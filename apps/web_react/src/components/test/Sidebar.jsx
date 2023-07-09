import React from 'react';

import produce from 'immer';
import styled from 'styled-components';

import Directory from './Directory';
import File from './File';
import { openFile } from './FileViewer.helpers';

function generateChildren(items, props, slugPrefix = '') {
  return items.map((item) => {
    const slug = `${slugPrefix}/${item.name}`;
    if (item.type === 'directory') {
      return (
        <Directory
          key={slug}
          slug={slug}
          name={item.name}
          isExpanded={item.isExpanded}
          onClick={props.handleToggleDirectory}
        >
          {generateChildren(item.contents, { ...props, isExpanded: item.isExpanded }, slug)}
        </Directory>
      );
    } else {
      return <File key={slug} file={item} slug={slug} onClick={props.handleSelectFile} isExpanded={props.isExpanded} />;
    }
  });
}
const Sidebar = ({ files, setFiles }) => {
  function handleToggleDirectory(directorySlug) {
    const paths = directorySlug.slice(1).split('/');
    setFiles((f) => {
      return produce(f, (draftFiles) => {
        let reference = { contents: draftFiles };
        while (paths.length) {
          let currentPath = paths.shift();
          if (currentPath) {
            reference = reference.contents.find((item) => {
              return item.name === currentPath;
            });
          }
        }
        reference.isExpanded = !reference.isExpanded;
      });
    });
  }
  function handleSelectFile(fileSlug) {
    setFiles((f) => {
      return produce(f, (draftFiles) => {
        openFile(draftFiles, fileSlug);
      });
    });
  }
  const children = generateChildren(files, {
    handleToggleDirectory,
    handleSelectFile,
  });
  return <Wrapper>{children}</Wrapper>;
};
const Wrapper = styled.div`
  --row-height: 1.75rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: auto;
  padding: 0 16px 0 12px;
  margin-top: -0.25rem;
`;
export default Sidebar;
