import React from "react";
import { useRouter } from "next/navigation";

type SidebarNavButtonProps = {
  text: string;
  url: string;
  barcodeText?: string;
};

const SidebarNavButton = (props: SidebarNavButtonProps) => {
  const router = useRouter();
  const { text, url, barcodeText } = props;
  return (
    <div
      className="cursor-pointer w-full mb-2 p-2 hover:bg-gray-400"
      onClick={() => {
        router.push(`/${url}`);
      }}
    >
      <p className="barcode">{barcodeText}</p>
      <p className="nav-btn">{text}</p>
    </div>
  );
};

export default SidebarNavButton;
