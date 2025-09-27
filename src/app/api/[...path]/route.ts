import type { NextRequest } from "next/server";

type Params = Promise<{ path: string[] }>;

export async function GET(request: NextRequest, context: { params: Params }) {
  return proxyRequest(request, await context.params);
}
export async function POST(request: NextRequest, context: { params: Params }) {
  return proxyRequest(request, await context.params);
}
export async function PUT(request: NextRequest, context: { params: Params }) {
  return proxyRequest(request, await context.params);
}
export async function DELETE(request: NextRequest, context: { params: Params }) {
  return proxyRequest(request, await context.params);
}

async function proxyRequest(request: NextRequest, { path }: { path: string[] }) {
  // ✅ keep query params
  const url = new URL(request.url);
  const externalApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path.join("/")}${
    url.search
  }`;

  try {
    const fetchOptions: RequestInit = {
      method: request.method,
      headers: request.headers,
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      fetchOptions.body = request.body;
      // ✅ required when streaming body (e.g., file upload)
      (fetchOptions as any).duplex = "half";
    }

    const externalApiResponse = await fetch(externalApiUrl, fetchOptions);

    const contentType = externalApiResponse.headers.get("content-type");

    // ✅ Handle JSON
    if (contentType?.includes("application/json")) {
      const data = await externalApiResponse.json();
      return new Response(JSON.stringify(data), {
        status: externalApiResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Handle file/downloads
    const headers = new Headers();
    headers.set(
      "Content-Type",
      contentType ?? "application/octet-stream"
    );

    const contentDisposition = externalApiResponse.headers.get("content-disposition");
    if (contentDisposition) {
      headers.set("Content-Disposition", contentDisposition);
    }

    return new Response(await externalApiResponse.arrayBuffer(), {
      status: externalApiResponse.status,
      headers,
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
