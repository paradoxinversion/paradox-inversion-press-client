import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="cursor-pointer logo text-5xl mb-8">
        <span>Paradox</span> <span>Inversion</span>
      </div>
    </Link>
  );
};

export default Logo;
