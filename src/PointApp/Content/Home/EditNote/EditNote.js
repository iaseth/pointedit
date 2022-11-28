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

	const updateProp = (prop, value) => {
		aspect[prop] = value;
		updateAspect(k, aspect);
	};

	const updatePoint = (pid, point) => {
		aspect.points[pid] = point;
		updateAspect(k, aspect);
	};

	return (
		<section className="py-4">
			<article className="border-l-4 border-green-500">
				<header>
					<h3>
						<EditableText text={aspect.title} setText={(v) => updateProp('title', v)} placeholder="Title" />
					</h3>

					<h4>
						<EditableText text={aspect.introduction} setText={(v) => updateProp('introduction', v)} placeholder="Introduction" />
					</h4>
				</header>

				<main className="">
					<div className="">
						{aspect.points.map((point, k) => <Point key={k} {...{k, point, updatePoint}} />)}
					</div>

					{aspect.points.length === 0 && <div className="">
						<h4 className="text-slate-500 px-3 py-6">No points added.</h4>
					</div>}

					<h4>
						<EditableText text={aspect.introduction} setText={(v) => updateProp('conclusion', v)} placeholder="Conclusion" />
					</h4>
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
			introduction: "",
			conclusion: "",
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
		<div className="max-w-xl mx-auto">
			<header className="py-2 px-3">
				<h4>Edit Note</h4>
			</header>

			<div className="">
				{content.aspects.map((aspect, k) => <Aspect key={k} {...{k, aspect, updateAspect}} />)}
			</div>

			<footer className="py-3 px-3">
				<Button onClick={addNewAspect}>Add Aspect</Button>
			</footer>
		</div>
	);
}
