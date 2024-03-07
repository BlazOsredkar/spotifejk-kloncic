import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex flex-row items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1"
      )}
    >
      <Icon className={twMerge("text-md", active && "text-white")} size={20} />
      <span className={twMerge("text-md font-medium", active && "text-white")}>
        {label}
      </span>
    </Link>
  );
};

export default SidebarItem;
