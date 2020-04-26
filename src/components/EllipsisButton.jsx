import {
	IonIcon,
	IonFabButton,
} from "@ionic/react";
import React from "react";
import {ellipsisVertical} from 'ionicons/icons';

const EllipsisButton = ({itemID,callBack}) => {
	return (
		<div style={{position: "absolute", top: "5px", right: "0"}} >
			<IonFabButton 
				style={{width: "30px", height:"30px", "--box-shadow": "none", "--background": "none", "--background-activated": "none"}} 
				onClick={
					(e) => {
						e.persist();
						e.stopPropagation();
						callBack({event: e, status: true, id: itemID});
					}
				}
			>
				<IonIcon icon={ellipsisVertical} style={{height: "20px", width: "20px", color: "#000"}}/>
			</IonFabButton>
		</div>
	);
};

export default EllipsisButton;