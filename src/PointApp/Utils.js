


export function Button ({onClick, children}) {
	return (
		<div className="inline-block mr-3">
			<button onClick={onClick} className="block bg-green-500 text-white text-sm font-bold px-6 py-4 rounded shadow cursor-pointer">{children}</button>
		</div>
	);
}
