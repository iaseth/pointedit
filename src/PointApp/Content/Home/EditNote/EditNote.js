import React from 'react';

import {Button} from '../../../Utils';



function Point ({point}) {
	return (
		<li>
			<p>{point.text || "(empty)"}</p>
		</li>
	);
}

function Aspect ({k, aspect, updateAspect}) {
	const addNewPoint = () => {
		const point = {
			text: false,
			hidden: false
		};
		aspect.points.push(point);
		updateAspect(k, aspect);
	};

	return (
		<section className="py-2">
			<article className="border-2 border-slate-300 ch:px-3 ch:py-3">
				<header>
					<h3>{aspect.title || "(empty)"}</h3>
				</header>

				<main className="border-y-2 border-slate-300">
					<ul>
						{aspect.points.map((point, k) => <Point key={k} {...{point}} />)}
					</ul>

					{aspect.points.length === 0 && <div className="">
						<h4 className="text-slate-500 py-3">No points added.</h4>
					</div>}
				</main>

				<footer>
					<Button onClick={addNewPoint}>Add Point</Button>
				</footer>
			</article>
		</section>
	);
}

export default function EditNote () {
	const [content, setContent] = React.useState({aspects: []});

	const addNewAspect = () => {
		const aspect = {
			title: false,
			points: [],
			hidden: false
		};
		content.aspects.push(aspect);
		setContent({...content});
	};

	const updateAspect = (k, aspect) => {
		content.aspects[k] = aspect;
		setContent({...content});
	};

	return (
		<div className="max-w-3xl mx-auto">
			<header>
				<h4>EditNote</h4>
			</header>

			<div>
				{content.aspects.map((aspect, k) => <Aspect key={k} {...{k, aspect, updateAspect}} />)}
			</div>

			<footer className="py-4">
				<Button onClick={addNewAspect}>Add Aspect</Button>
			</footer>
		</div>
	);
}
