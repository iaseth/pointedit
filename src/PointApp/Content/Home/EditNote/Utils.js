


export function EditableText ({
	text, setText,
	number = false, level = 0,
	onEnter = null,
	placeholder = "(empty)"
}) {
	const handleChange = (e) => {
		const v = e.target.value;
		setText(v);
		e.target.style.height = "1px";
		e.target.style.height = e.target.scrollHeight + "px";
	};

	const handleKeyDown = (e) => {
		if (onEnter && e.keyCode === 13) {
			e.preventDefault();
			onEnter();
		}
	};

	let paddingLeft = (level+1) * 16;
	if (number) {
		paddingLeft += 40;
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
			{number && <div className="absolute px-3 py-4 text-right" style={divStyle}>
				<span className="px-2 py-1 bg-green-500 text-sm text-white font-bold rounded">{number}</span>
			</div>}
			<textarea rows="1" defaultValue={text} onChange={handleChange} onKeyDown={handleKeyDown} className="block w-full px-3 py-4 resize-none overflow-hidden outline-0 hover:bg-slate-100 focus:bg-slate-200" placeholder={placeholder} style={inputStyle}></textarea>
		</div>
	);
}
