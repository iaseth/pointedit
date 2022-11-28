import React from 'react';

import {Button} from '../../../Utils';
import {EditableText} from './Utils';



function Point ({k, point, updatePoint}) {
	const setText = (text) => {
		point.text = text;
		updatePoint(k, point);
	};

	return (
		<li>
			<h4>
				<EditableText text={point.text} setText={setText} />
			</h4>
		</li>
	);
}

function Aspect ({k, aspect, updateAspect}) {
	const addNewPoint = () => {
		const point = {
			text: "",
			hidden: false
		};
		aspect.points.push(point);
		updateAspect(k, aspect);
	};

	const updateTitle = (title) => {
		aspect.title = title;
		updateAspect(k, aspect);
	};

	const updatePoint = (pid, point) => {
		aspect.points[pid] = point;
		updateAspect(k, aspect);
	};

	return (
		<section className="py-2">
			<article className="border-2 border-slate-300 ch:px-3 ch:py-3">
				<header>
					<h3>
						<EditableText text={aspect.title} setText={updateTitle} />
					</h3>
				</header>

				<main className="border-y-2 border-slate-300">
					<ul className="list-disc px-8">
						{aspect.points.map((point, k) => <Point key={k} {...{k, point, updatePoint}} />)}
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
			title: "",
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
