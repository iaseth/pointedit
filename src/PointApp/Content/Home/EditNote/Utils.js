


export function EditableText ({
	text, setText,
	number = false, level = 0,
	placeholder = "(empty)"
}) {
	const handleChange = (e) => {
		const v = e.target.value;
		setText(v);
		e.target.style.height = "1px";
		e.target.style.height = e.target.scrollHeight + "px";
	};

	let paddingLeft = (level+1) * 16;
	if (number) {
		paddingLeft += 32;
	}
	const paddingLeftPx = paddingLeft + "px";

	const inputStyle = {
		paddingLeft: paddingLeftPx
	};

	const divStyle = {
		width: paddingLeftPx
	};

	return (
		<div className="relative">
			{number && <div className="absolute px-3 py-3 text-right flex" style={divStyle}>
				<span className="px-2 py-1 bg-green-500 text-sm text-white font-bold rounded">{number}</span>
			</div>}
			<textarea rows="1" defaultValue={text} onChange={handleChange} className="block w-full px-3 py-4 resize-none overflow-hidden outline-0 focus:bg-slate-200" placeholder={placeholder} style={inputStyle}></textarea>
		</div>
	);
}
