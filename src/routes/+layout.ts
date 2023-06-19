export const load = async ({ url }) => {
	return {
		currentPathname: url.pathname
	};
};
