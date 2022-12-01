import React from 'react';
import _ from 'lodash';

// import {Button} from '../../../Utils';
import {EditableText} from './Utils';
import Point from './Point';



export default function Aspect ({k, aspectId, dbFuncs, LOGX}) {
	const aspectRef = React.useRef(null);
	const [init, setInit] = React.useState(false);
	const [aspect, setAspect] = React.useState(null);
	const [points, setPoints] = React.useState([]);

	React.useEffect(() => {
		if (!init) {
			const request = dbFuncs.getAspectFromDB(aspectId);
			request.onsuccess = () => {
				setAspect(request.result);
				setInit(true);
			};
		}
	}, [aspectId, dbFuncs, init, setInit, setAspect]);

	const updateAspect = (nuAspect) => {
		if (!_.isEqual(nuAspect, aspect)) {
			nuAspect.modifiedAt = Date.now();
			dbFuncs.saveAspectToDB(nuAspect);
			LOGX.updatedAt('aspect', nuAspect.id);
		}
	};

	React.useEffect(() => {
		const pointIds = points.map(a => a.id);
		if (init && !_.isEqual(pointIds, aspect.pointIds)) {
			const nuAspect = {...aspect};
			nuAspect.pointIds = pointIds;
			nuAspect.pointsCount = pointIds.length;
			updateAspect(nuAspect);
		}
	}, [points, init, aspect, updateAspect]);

	const addNewPoint = (atIndex=false) => {
		const point = {
			id: aspect.highestPointId++,
			aspectId: aspect.id,
			noteId: aspect.noteId,
			createdAt: Date.now(),
			modifiedAt: Date.now(),
			text: "",
			hidden: false
		};

		if (atIndex === false) {
			points.push(point);
		} else {
			points.splice(atIndex, 0, point);
		}

		setPoints([...points]);
	};

	if (init && points.length === 0) {
		addNewPoint();
	}

	React.useEffect(() => {
		if (init) {
			aspectRef.current.getElementsByTagName('textarea')[0].focus();
		}
	}, [init]);

	const updateAspectProp = (prop, value) => {
		const nuAspect = {...aspect};
		nuAspect[prop] = value;
		updateAspect(nuAspect);
	};

	const updatePoint = (nuPoint) => {
		const pointIndex = points.findIndex(p => p.id === nuPoint.id);
		const point = points[pointIndex];
		if (!_.isEqual(nuPoint, point)) {
			nuPoint.modifiedAt = Date.now();
			dbFuncs.savePointToDB(nuPoint);

			const nuPoints = [...points];
			nuPoints[pointIndex] = nuPoint;
			setPoints(nuPoints);
		}
	};

	if (!init) {
		return (
			<section>
				<h4>Loading aspect ...</h4>
			</section>
		);
	}

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
						{points.map((point, k) => <Point key={point.id} {...{k, point, updatePoint, addNewPoint}} />)}
					</div>

					{points.length === 0 && <div className="">
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
