import React from "react";
import { useRouter } from "next/navigation";

type SidebarNavButtonProps = {
  text: string;
  url: string;
  barcodeText?: string;
};

const SidebarNavButton = (props: SidebarNavButtonProps) => {
  const router = useRouter();
  const { text, url } = props;
  return (
    <div
      className="cursor-pointer w-full mb-2 p-2 hover:bg-gray-400"
      onClick={() => {
        router.push(`/page/${url}`);
      }}
    >
      <p className="barcode">{props.text}</p>
      <p className="nav-btn">{text}</p>
    </div>
  );
};

export default SidebarNavButton;
