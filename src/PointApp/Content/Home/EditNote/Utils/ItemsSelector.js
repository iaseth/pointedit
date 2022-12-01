import React from 'react';



export function ItemsSelector ({ITEMS, itemId, setItemId}) {
	const [expanded, setExpanded] = React.useState(false);
	const toggleExpanded = () => setExpanded(!expanded);

	const itemIndex = ITEMS.findIndex(x => x.id === itemId);
	const category = ITEMS.find(item => item.id === itemId);
	const selectItem = id => {
		setItemId(id);
		setExpanded(false);
	};

	const handleKeyDown = (e) => {
		const inputElements = [...document.getElementById('EditNote').getElementsByClassName('focusable')];
		const index = inputElements.findIndex(x => x === e.target);

		switch (e.code) {
		case "Enter":
			e.preventDefault(); toggleExpanded();
			break;
		case "ArrowLeft":
			e.preventDefault();
			if (itemIndex > 0) {
				setItemId(ITEMS[itemIndex-1].id);
			}
			break;
		case "ArrowUp":
			e.preventDefault();
			inputElements[index-1]?.focus();
			break;
		case "ArrowRight":
			e.preventDefault();
			if (itemIndex+1 < ITEMS.length) {
				setItemId(ITEMS[itemIndex+1].id);
			}
			break;
		case "ArrowDown":
			e.preventDefault();
			inputElements[index+1]?.focus();
			break;
		default:
		}
	};

	return (
		<div className="focusable cursor-pointer select-none outline-0 focus:bg-500 focus:text-white" tabIndex="0" onKeyDown={handleKeyDown}>
			<div onClick={() => setExpanded(!expanded)} className="flex border-y-2 border-500">
				<div className="flex p-2">
					<h4 className="m-auto bg-700 text-white px-2 py-1 rounded">{itemIndex+1}</h4>
				</div>

				<div className="px-4 py-4 grow">
					<h4 className="text-center">{category.title}</h4>
				</div>

				<div className="flex p-2">
					<h4 className="m-auto bg-700 text-white px-2 py-1 rounded">{ITEMS.length}</h4>
				</div>
			</div>
			<div className="relative">
				{expanded && <ul className="absolute z-50 w-full bg-white text-800 border-2 border-t-0 border-500">
					{ITEMS.map((item, k) => <li key={k} onClick={() => selectItem(item.id)} className="px-4 py-3 hover:bg-500 hover:text-white">
						<h5>{item.title}</h5>
					</li>)}
				</ul>}
			</div>
		</div>
	);
}
