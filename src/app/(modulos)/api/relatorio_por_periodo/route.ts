import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const apiUrl = `${process.env.AUTH_API_URL}/cashbox/relatorio/periodo`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let data;

    try {
      data = await response.json();
    } catch (error) {
      console.error("Falha ao passar para formato JSON", error);
      return NextResponse.json(
        { error: "Resposta do servidor invalida, por favor, verifique a API." },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro no servidor:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro, verifique!" },
      { status: 500 }
    );
  }
}
