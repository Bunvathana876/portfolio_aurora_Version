import { siteData } from "@/data/site";
import React from "react";

export const StickyEmail = () => {
  return (
    <div className="max-xl:hidden fixed bottom-32 left-0 block z-[30]">
      <a
        href={`mailto:${siteData.socials.email}`}
        className="px-3 text-muted-foreground tracking-[1px] transition-all !bg-bottom hover:text-primary hover:!bg-center"
        style={{
          textOrientation: "mixed",
          writingMode: "vertical-rl",
        }}
      >
        {siteData.socials.email}
      </a>
    </div>
  );
};

export default StickyEmail;
