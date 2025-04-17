import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link className="cursor-pointer logo text-5xl mb-2" href="/">
      Paradox Inversion
    </Link>
  );
};

export default Logo;
