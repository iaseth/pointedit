import React from 'react';

import {DebugHeader, DebugFooter} from './DebugUtils';
import {Button} from '../../Utils';


const IDB = window.indexedDB;

const getDatabasesAndObjectStores = () => {
	return IDB.databases().then(res => res.map(db => {
		return {
			name: db.name,
			version: db.version,
			objectStores: []
		}
	}));
};

export default function IndexedDB () {
	const [databases, setDatabases] = React.useState([]);
	const [init, setInit] = React.useState(false);

	const updateDatabases = () => {
		getDatabasesAndObjectStores().then(res => setDatabases(res));
	};

	React.useEffect(() => {
		if (!init) {
			updateDatabases();
			setInit(true);
		}
	}, [init]);

	return (
		<div>
			<DebugHeader text="IndexedDB" />

			<main>
				<table className="w-full">
					<thead>
						<tr>
							<td>#</td>
							<td>Databse</td>
							<td>Vesrion</td>
							<td>Stores</td>
						</tr>
					</thead>
					<tbody>
						{databases.map((database, k) => <tr key={k}>
							<td>{k+1}</td>
							<td>{database.name}</td>
							<td>{database.version}</td>
							<td>
								{database.objectStores.map((objectStore, k) => <h5>{objectStore.name}</h5>)}
							</td>
						</tr>)}
					</tbody>
				</table>
			</main>

			<DebugFooter count={databases.length} what="databases" />
		</div>
	);
}
