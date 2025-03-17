import { ImageResponse } from "next/og";
import { baseURL, renderContent } from "@/app/resources";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export const runtime = "edge";

// Definice typů pro person
interface PersonContent {
  name?: string;
  avatar?: string;
  role?: string;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Portfolio";
  const font = await fetch(
    new URL("../../../public/fonts/Inter.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const t = await getTranslations();
  const content = renderContent(t);

  // Bezpečné typování s výchozími hodnotami
  const person = (content.person as PersonContent) || {
    name: "",
    avatar: "",
    role: ""
  };

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "8rem",
          background: "#151515",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
            color: "white",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: "8rem",
              lineHeight: "8rem",
              letterSpacing: "-0.05em",
              whiteSpace: "pre-wrap",
              textWrap: "balance",
            }}
          >
            {title}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5rem",
              justifyContent: "center",
            }}
          >
            <Image
              src={`https://${baseURL}${person.avatar || ""}`}
              width={120}
              height={120}
              style={{
                objectFit: "cover",
                borderRadius: "100%",
              }}
              alt="Person Avatar"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "4.5rem",
                  lineHeight: "4.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                }}
              >
                {person.name || ""}
              </span>
              <span
                style={{
                  fontSize: "2.5rem",
                  lineHeight: "2.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                  opacity: "0.6",
                }}
              >
                {person.role || ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
        },
      ],
    }
  );
}
