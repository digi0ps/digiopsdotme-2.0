import React from 'react';


const Error404 = ({location}) => {
	return (
		<div className="con-404">
			<h1>404</h1>
			{location.pathname} was not found.
		</div>
	);
}

export default Error404;
