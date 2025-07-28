import React from "react";
import Link from "next/link";
import { Home as HomeIcon, FolderGit2Icon, Mail } from "lucide-react";

export default function SocialLinks() {
  const links = [
    {
      icon: <HomeIcon size={18} />,
      href: "https://artiehumphreys.com",
      label: "Home",
    },
    {
      icon: <FolderGit2Icon size={18} />,
      href: "https://github.com/artiehumphreys/artiehumphreys.com-blog",
      label: "GitHub",
    },
    {
      icon: <Mail size={18} />,
      href: "mailto:ah.artiehumphreys@gmail.com",
      label: "Email",
    },
  ];

  return (
    <div className="flex items-center space-x-4">
      {links.map(({ icon, href, label }) => {
        const isInternal = href.startsWith("/");
        const Wrapper = isInternal ? Link : "a";
        const props = isInternal
          ? { href }
          : { href, target: "_blank", rel: "noopener noreferrer" };
        return (
          <Wrapper
            key={label}
            {...props}
            aria-label={label}
            className="text-gray-700 hover:text-gray-900"
          >
            {icon}
          </Wrapper>
        );
      })}
    </div>
  );
}
