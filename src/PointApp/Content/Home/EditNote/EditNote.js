import React from 'react';

import {Button} from '../../../Utils';
import {EditableText} from './Utils';



function Point ({k, point, updatePoint, addNewPoint}) {
	const setText = (text) => {
		point.text = text;
		updatePoint(k, point);
	};

	const onEnter = () => {
		addNewPoint(k+1);
	};

	return (
		<div className="flex items-center">
			<h4 className="grow">
				<EditableText number={k+1} text={point.text} {...{setText, onEnter}} />
			</h4>
		</div>
	);
}

function Aspect ({k, aspect, updateAspect}) {
	const aspectRef = React.useRef(null);

	const addNewPoint = (atIndex=false) => {
		const point = {
			id: aspect.pointId++,
			createdAt: Date.now(),
			modifiedAt: Date.now(),
			text: "",
			hidden: false
		};
		if (atIndex) {
			// const ps = aspect.points;
			// aspect.points = [...ps.slice(0, k), point, ...ps.slice(k)];
			aspect.points.splice(atIndex, 0, point);
		} else {
			aspect.points.push(point);
		}

		updateAspect(k, aspect);
	};

	React.useEffect(() => {
		if (aspect.points.length === 0) {
			addNewPoint();
		}
		aspectRef.current.getElementsByTagName('textarea')[0].focus();
	}, []);

	const updateProp = (prop, value) => {
		aspect[prop] = value;
		updateAspect(k, aspect);
	};

	const updatePoint = (pid, point) => {
		point.modifiedAt = Date.now();
		aspect.points[pid] = point;
		updateAspect(k, aspect);
	};

	return (
		<section className="py-4" ref={aspectRef}>
			<article className="border-l-4 border-green-500">
				<header>
					<h5 className="px-2 py-1 text-green-500">Aspect # {k+1}</h5>
					<h3>
						<EditableText text={aspect.title} setText={(v) => updateProp('title', v)} placeholder="Title" />
					</h3>

					<h4>
						<EditableText text={aspect.introduction} setText={(v) => updateProp('introduction', v)} placeholder="Introduction" />
					</h4>
				</header>

				<main className="">
					<div className="">
						{aspect.points.map((point, k) => <Point key={point.id} {...{k, point, updatePoint, addNewPoint}} />)}
					</div>

					{aspect.points.length === 0 && <div className="">
						<h4 className="text-slate-500 px-3 py-6">No points added.</h4>
					</div>}
				</main>

				<footer className="">
					<h4>
						<EditableText text={aspect.conclusion} setText={(v) => updateProp('conclusion', v)} placeholder="Conclusion" />
					</h4>
				</footer>
			</article>
		</section>
	);
}

export default function EditNote () {
	const [content, setContent] = React.useState({
		createdAt: Date.now(),
		modifiedAt: Date.now(),

		aspects: [],
		aspectId: 0
	});

	React.useEffect(() => {
		console.log(content);
	}, [content]);

	const updateContent = (newContent) => {
		newContent.modifiedAt = Date.now();
		setContent(newContent);
	};

	const addNewAspect = () => {
		const aspect = {
			id: content.aspectId++,
			createdAt: Date.now(),
			modifiedAt: Date.now(),

			title: "",
			introduction: "",
			conclusion: "",

			points: [],
			pointId: 0,
			hidden: false
		};
		content.aspects.push(aspect);
		updateContent({...content});
	};

	const updateAspect = (k, aspect) => {
		aspect.modifiedAt = Date.now();
		content.aspects[k] = aspect;
		updateContent({...content});
	};

	return (
		<div className="max-w-xl mx-auto" id="EditNote">
			<header className="py-2 px-3">
				<h4>Edit Note</h4>
			</header>

			<div className="">
				{content.aspects.map((aspect, k) => <Aspect key={aspect.id} {...{k, aspect, updateAspect}} />)}
			</div>

			<footer className="py-3 px-3">
				<Button onClick={addNewAspect}>Add Aspect</Button>
			</footer>
		</div>
	);
}