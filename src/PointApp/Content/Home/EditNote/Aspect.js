import React from 'react';

// import {Button} from '../../../Utils';
import {EditableText} from './Utils';
import Point from './Point';



export default function Aspect ({k, aspect, updateAspect}) {
	const aspectRef = React.useRef(null);

	const addNewPoint = (atIndex=false) => {
		const point = {
			id: aspect.pointId++,
			createdAt: Date.now(),
			modifiedAt: Date.now(),
			text: "",
			hidden: false
		};

		if (atIndex === false) {
			aspect.points.push(point);
		} else {
			aspect.points.splice(atIndex, 0, point);
		}

		updateAspect(aspect);
	};

	if (aspect.points.length === 0) {
		addNewPoint();
	}

	React.useEffect(() => {
		aspectRef.current.getElementsByTagName('textarea')[0].focus();
	}, []);

	const updateAspectProp = (prop, value) => {
		aspect[prop] = value;
		updateAspect(aspect);
	};

	const updatePoint = (point) => {
		const pointIndex = aspect.points.findIndex(p => p.id === point.id);
		point.modifiedAt = Date.now();
		aspect.points[pointIndex] = point;
		updateAspect(aspect);
	};

	return (
		<section className="py-4" ref={aspectRef}>
			<article className="border-l-4 border-green-500 shadow">
				<header>
					<h5 className="px-2 py-1 text-green-500">Aspect # {k+1}</h5>
					<h3>
						<EditableText text={aspect.title} setText={(v) => updateAspectProp('title', v)} placeholder="Title" autoFocus={true} />
					</h3>

					<h4>
						<EditableText text={aspect.introduction} setText={(v) => updateAspectProp('introduction', v)} placeholder="Introduction" />
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
						<EditableText text={aspect.conclusion} setText={(v) => updateAspectProp('conclusion', v)} placeholder="Conclusion" />
					</h4>
				</footer>
			</article>
		</section>
	);
}