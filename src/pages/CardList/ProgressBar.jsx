import React from 'react';
import { IonIcon } from '@ionic/react';
import { addSharp } from 'ionicons/icons';

const ProgressBar = ({label}) => {
	return (
		<div style={{ display: "flex", backgroundColor: "#E5E5E5", marginRight: "10px",marginLeft: "3px", borderRadius: "15px", color:"#575757", position: "relative", zIndex: "2", width: "150px", height: "23px", float: "right"}}>
			<div style={{marginTop: "2px"}}>
				<IonIcon icon={addSharp} style={{width: "18px", height: "18px", float: "left"}}/>
				<span style={{fontSize:"10px", lineHeight: "18px", float: "left"}}>{label}</span>
			</div>
			<div style={{position: "absolute", backgroundColor: "#DD6363", width: "50%", height: "23px", borderRadius: "5px 15px 15px 5px", zIndex: "-1"}}></div>
		</div>
	);
}

export default ProgressBar;