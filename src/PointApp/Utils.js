


export function ShowMoreButton ({onClick}) {
	return (
		<button onClick={onClick} className="flex mx-auto bg-white px-5 py-4 shadow rounded space-x-2 hover:ring">
			{[...Array(3)].map((x, k) => <div key={k} className="bg-slate-800 p-1 rounded"></div>)}
		</button>
	);
}

export function Button ({onClick, children}) {
	return (
		<div className="inline-block mr-3">
			<button onClick={onClick} className="block bg-500 text-white text-sm font-bold px-6 py-4 rounded shadow cursor-pointer">{children}</button>
		</div>
	);
}
