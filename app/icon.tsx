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
          fontSize: 14,
          background: "#090A10",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F8FAFC",
          fontWeight: 700,
          borderRadius: 6,
          border: "1px solid #1E2436",
          letterSpacing: "-0.04em",
          fontFamily: "system-ui, -apple-system, sans-serif",
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
