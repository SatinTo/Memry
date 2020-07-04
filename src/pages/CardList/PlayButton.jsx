import React from 'react';
import { IonFabButton, IonIcon } from '@ionic/react';
import { caretForward } from 'ionicons/icons';

const PlayButton = ({label, style, disabled, onClick}) => {
	let customCSS = {width: "80px", height: "34px", "--border-radius": "50px", margin: "0 5px", padding: "0", display: "inline-block"};

	Object.assign(customCSS, style); // Overwrite 

	return (
		<IonFabButton 
			style={customCSS} 
			disabled={disabled}
			onClick={onClick}
		>
			<IonIcon icon={caretForward} style={{width: "20px", height: "20px"}}/>
			<label htmlFor={label} style={{lineHeight: "15px", fontSize: "13px", fontWeight: "bold", paddingLeft: "5px"}}>
				{label}
			</label>
		</IonFabButton>
	);
}

export default PlayButton;