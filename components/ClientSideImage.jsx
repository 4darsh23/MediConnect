"use client";

import React from 'react';
import Image from 'next/image';

const ClientSideImage = ({ src, alt, width, height, className }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ClientSideImage;
