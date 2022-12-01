


export function Grid ({children}) {
	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
			{children}
		</div>
	);
}
