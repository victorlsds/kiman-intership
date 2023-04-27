import React from 'react';
import { Page } from './page';

const Viewer = ({ pdf, ...props }) => {
  const numPages = pdf ? pdf.pdfInfo.numPages : 0;

  if (pdf) {
    return (
      <div className="pdf-viewer">
        { Array(...{ length: numPages }).map((v, i) => (
          <Page
            pdf={pdf}
            index={i + 1}
            key={`document-page-${i}`}
            {...props}
          />
          ))}
      </div>
    );
  }

  return null;
};

export { Viewer };
