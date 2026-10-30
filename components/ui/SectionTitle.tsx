import { ReactNode } from "react";
import { SectionFlower } from "@/components/icons";
import { cn } from "@/lib/utils";

interface Props {
  icon?: ReactNode;
  className?: string;
  classNames?: {
    container?: string;
    title?: string;
    icon?: string;
  };
  title: string;
}

export const SectionTitle = ({ icon, title, className, classNames }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 mb-10",
        className,
        classNames?.container
      )}
    >
      {icon ? (
        icon
      ) : (
        <SectionFlower
          width={25}
          className={cn("animate-spin duration-7000", classNames?.icon)}
        />
      )}
      <h2
        className={cn(
          "text-xl uppercase leading-none tracking-wider",
          classNames?.title
        )}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
