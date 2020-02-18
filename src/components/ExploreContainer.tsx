import React from 'react';
import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
	return (
	<div className="container">
		<strong>Ready to create an app?</strong>
		<p>Go to `Play` page <a href="/play">Here</a></p>
	</div>
	);
};

export default ExploreContainer;
