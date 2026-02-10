"use client";

import Image from "next/image";

/**
 * Simple client-side wrapper around Next.js Image.
 * Fixes the missing import error for `ClientSideImage` in `Header.jsx`.
 */
const ClientSideImage = (props) => {
  return <Image {...props} />;
};

export default ClientSideImage;
