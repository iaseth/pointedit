import React from 'react';

import {Button} from '../../../Utils';
import {EditableText} from './Utils';



function Point ({k, point, updatePoint}) {
	const setText = (text) => {
		point.text = text;
		updatePoint(k, point);
	};

	return (
		<div className="flex items-center">
			<h4 className="grow">
				<EditableText number={k+1} text={point.text} setText={setText} />
			</h4>
		</div>
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
			<article className="">
				<header>
					<h3>
						<EditableText text={aspect.title} setText={updateTitle} />
					</h3>
				</header>

				<main className="">
					<div className="">
						{aspect.points.map((point, k) => <Point key={k} {...{k, point, updatePoint}} />)}
					</div>

					{aspect.points.length === 0 && <div className="">
						<h4 className="text-slate-500 px-3 py-6">No points added.</h4>
					</div>}
				</main>

				<footer className="px-3 py-3">
					<Button onClick={addNewPoint}>Add Point</Button>
				</footer>
			</article>
		</section>
	);
}

export default function EditNote () {
	const [content, setContent] = React.useState({aspects: []});

	const updateContent = (newContent) => {
		setContent(newContent);
	};

	const addNewAspect = () => {
		const aspect = {
			title: "",
			points: [],
			hidden: false
		};
		content.aspects.push(aspect);
		updateContent({...content});
	};

	const updateAspect = (k, aspect) => {
		content.aspects[k] = aspect;
		updateContent({...content});
	};

	return (
		<div className="max-w-3xl mx-auto">
			<header>
				<h4>EditNote</h4>
			</header>

			<div className="max-w-xl mx-auto">
				{content.aspects.map((aspect, k) => <Aspect key={k} {...{k, aspect, updateAspect}} />)}
			</div>

			<footer className="py-4">
				<Button onClick={addNewAspect}>Add Aspect</Button>
			</footer>
		</div>
	);
}
