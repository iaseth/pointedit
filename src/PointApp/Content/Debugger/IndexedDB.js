import React from 'react';

import {
	// DebugButton,
	DebugFooter,
	DebugHeader,
	DebugTable,
} from './DebugUtils';


const IDB = window.indexedDB;

const getDatabasesAndObjectStores = () => {
	return IDB.databases().then(res => res.map(db => {
		return {
			name: db.name,
			version: db.version,
			objectStores: []
		};
	}));
};

function IndexedDBRowComponent ({k, row}) {
	const database = row;
	return (
		<tr>
			<td>{k+1}</td>
			<td>{database.name}</td>
			<td>{database.version}</td>
			<td>
				{database.objectStores.map((objectStore, k) => <h5 key={k}>{objectStore.name}</h5>)}
			</td>
		</tr>
	);
}

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
				<DebugTable headings={["#", "Databse", "Vesrion", "Stores"]} rows={databases} RowComponent={IndexedDBRowComponent} />
			</main>

			<DebugFooter count={databases.length} what="databases" />
		</div>
	);
}
