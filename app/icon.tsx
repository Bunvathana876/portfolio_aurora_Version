import { ImageResponse } from "next/og";
import { siteData } from "@/data/site";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 15,
          background: "linear-gradient(135deg, #0a0a0f 0%, #1e1b4b 50%, #06b6d4 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 800,
          borderRadius: 8,
          border: "1px solid rgba(34, 211, 238, 0.5)",
        }}
      >
        {siteData.initials}
      </div>
    ),
    {
      ...size,
    }
  );
}
