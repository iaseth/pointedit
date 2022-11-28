


export function EditableText ({
	text, setText,
	placeholder = "(empty)"
}) {
	const handleChange = (e) => {
		const v = e.target.value;
		setText(v);
	};

	return (
		<div>
			<input defaultValue={text} onChange={handleChange} className="block w-full px-3 py-3 outline-0 focus:bg-slate-200" placeholder={placeholder} />
		</div>
	);
}
