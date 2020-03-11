import React, { useState } from 'react';

const Img = ({ files }) => {
  const [currentFile, setCurrentFile] = useState(0);

  const handleOnHover = async (curr = currentFile) => {
    if (curr < files.length - 1) {
      setCurrentFile(prev => prev + 1);

      await wait();

      return handleOnHover(curr + 1);
    } else {
      setCurrentFile(0);

      return;
    }
  };

  const wait = async () => {
    return new Promise(resolve => setTimeout(resolve, 400));
  };

  return <img src={files[currentFile]} alt="" onMouseOver={() => handleOnHover()} />;
};

export default Img;
