


export function Grid ({children}) {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 py-2">
			{children}
		</div>
	);
}
