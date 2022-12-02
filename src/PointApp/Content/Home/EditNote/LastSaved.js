import React from 'react';



function getDifference (time) {
	const currentTime = new Date();
	const ms = currentTime - time;
	const seconds = Math.round(ms / 1000);
	if (seconds > 3600) {
		return {unit: 'hours', value: Math.round(seconds / 3600)};
	} else if (seconds > 60) {
		return {unit: 'minutes', value: Math.round(seconds / 60)};
	} else {
		return {unit: 'seconds', value: seconds};
	}
}

export default function LastSaved ({time}) {
	const [difference, setDifference] = React.useState({});
	const updateTime = () => setDifference(getDifference(time));

	React.useEffect(() => {
		const x = setInterval(updateTime, 1000);
		return () => clearInterval(x);
	}, [time]);

	return (
		<h5 className="px-2 py-3 text-center">Last saved: <span className="bg-500 text-white px-1 py-[2px] rounded">{difference.value || "?"}</span> {difference.unit || ""} ago</h5>
	);
}
