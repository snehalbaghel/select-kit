/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const theme = event.cookies.get('theme') || 'light';
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<html class=""', `<html class="${theme}"`)
	});

	return response;
}
