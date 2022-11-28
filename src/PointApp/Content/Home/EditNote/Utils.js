import React from 'react';



export function ItemsSelector ({ITEMS, itemId, setItemId}) {
	const [expanded, setExpanded] = React.useState(false);
	const category = ITEMS.find(item => item.id === itemId);
	const selectItem = id => {
		setItemId(id);
		setExpanded(false);
	};

	return (
		<div className="cursor-pointer select-none">
			<h4 onClick={() => setExpanded(!expanded)} className="px-4 py-4 border-2 border-green-500">{category.title}</h4>
			<div className="relative">
				{expanded && <ul className="absolute w-full bg-green-200 border-2 border-t-0 border-green-500">
					{ITEMS.map((item, k) => <li key={k} onClick={() => selectItem(item.id)} className="px-4 py-3 hover:bg-green-500 hover:text-white">
						<h5>{item.title}</h5>
					</li>)}
				</ul>}
			</div>
		</div>
	);
}



export function EditableText ({
	text, setText,
	number = false, level = 0,
	onEnter = null, autoFocus = false,
	placeholder = "(empty)"
}) {
	const handleChange = (e) => {
		const v = e.target.value;
		setText(v);
		e.target.style.height = "1px";
		e.target.style.height = e.target.scrollHeight + "px";
	};

	const handleKeyDown = (e) => {
		const inputElements = [...document.getElementById('EditNote').getElementsByTagName('textarea')];
		const index = inputElements.findIndex(x => x === e.target);

		switch (e.keyCode) {
			case 13:
				if (onEnter) {
					e.preventDefault(); onEnter();
				}
				break;
			case 38: // up arrow
				inputElements[index-1]?.focus();
				break;
			case 40: // down arrow
				inputElements[index+1]?.focus();
				break;
			default:
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
			<textarea autoFocus={autoFocus} rows="1" defaultValue={text} onChange={handleChange} onKeyDown={handleKeyDown} className="block w-full px-3 py-4 resize-none overflow-hidden outline-0 hover:bg-slate-100 focus:bg-slate-200" placeholder={placeholder} style={inputStyle}></textarea>
		</div>
	);
}
