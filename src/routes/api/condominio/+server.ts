import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async () => {
    return json({
        endereco: '/api/condominio/:endereco'
    })
}) satisfies RequestHandler;