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
          background: "#F5F2EC",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#111111",
          fontWeight: 600,
          borderRadius: 2,
          border: "1px solid #D9D5CC",
          fontFamily: "Georgia, serif",
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
