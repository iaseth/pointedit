import React from 'react';
import _ from 'lodash';

// import {Button} from '../../../Utils';
import {EditableText} from './Utils';
import Point from './Point';



export default function Aspect ({k, aspectId, dbFuncs, LOGX}) {
	const aspectRef = React.useRef(null);
	const [init, setInit] = React.useState(false);
	const [aspect, setAspect] = React.useState(null);
	const pointIds = aspect ? aspect.pointIds : [];

	React.useEffect(() => {
		if (!init) {
			const request = dbFuncs.getAspectFromDB(aspectId);
			request.onsuccess = () => {
				const res = request.result;
				setAspect(res);
				setInit(true);
			};
		}
	}, [aspectId, dbFuncs, init, setInit, setAspect]);

	const updateAspect = (nuAspect) => {
		if (!_.isEqual(nuAspect, aspect)) {
			nuAspect.modifiedAt = Date.now();
			dbFuncs.saveAspectToDB(nuAspect);
			setAspect(nuAspect);
			LOGX.updatedAt('aspect', nuAspect.id);
			LOGX.plain(nuAspect);
		}
	};

	const addNewPoint = (atIndex=false) => {
		const nuPoint = {
			id: aspect.highestPointId++,
			aspectId: aspect.id,
			noteId: aspect.noteId,
			createdAt: Date.now(),
			modifiedAt: Date.now(),
			text: "",
			hidden: false
		};
		dbFuncs.savePointToDB(nuPoint);

		const nuAspect = {...aspect};
		if (atIndex === false) {
			nuAspect.pointIds.push(nuPoint.id);
		} else {
			nuAspect.pointIds.splice(atIndex, 0, nuPoint.id);
		}

		setAspect(nuAspect);
	};

	if (init && pointIds.length === 0) {
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

	if (!init) {
		return (
			<section>
				<h4>Loading aspect ...</h4>
			</section>
		);
	}

	return (
		<section className="py-4" ref={aspectRef}>
			<article className="border-l-4 border-500 shadow">
				<header>
					<h5 className="px-2 py-1 text-500">Aspect # {k+1}</h5>
					<h3>
						<EditableText text={aspect.title} setText={(v) => updateAspectProp('title', v)} placeholder="Title" autoFocus={true} />
					</h3>

					<p>
						<EditableText text={aspect.introduction} setText={(v) => updateAspectProp('introduction', v)} placeholder="Introduction" />
					</p>
				</header>

				<main className="">
					<div className="">
						{pointIds.map((pointId, k) => <Point key={pointId} {...{k, pointId, addNewPoint, dbFuncs, LOGX}} />)}
					</div>

					{pointIds.length === 0 && <div className="">
						<h4 className="text-slate-500 px-3 py-6">No points added.</h4>
					</div>}
				</main>

				<footer className="">
					<p>
						<EditableText text={aspect.conclusion} setText={(v) => updateAspectProp('conclusion', v)} placeholder="Conclusion" />
					</p>
				</footer>
			</article>
		</section>
	);
}
