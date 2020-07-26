import {
	IonCardTitle,
	IonCardContent,
	IonCard,
	IonCol,
	IonRippleEffect,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { PageRoutes } from "../vanilla/PageRoutes";
import { handleButtonPress, handleButtonRelease } from "../vanilla/mouseHold";

const Item = ({id, data, callBack, collectionID, flipped}) => {
	const history = useHistory();

	let fontSize = 12;
	let newData = data.front;

	if (newData.length > 13 && newData.length <= 15){
		fontSize = fontSize - 1;
	} else if (newData.length === 16) {
		fontSize = fontSize - 2;
	} else if (newData.length > 16) {
		fontSize = fontSize - 2;
		newData = newData.substr(0, 12) + "...";
	} else {
		fontSize = 12;
		newData = data.front;
	}

	return (
		<IonCol size="6">
			<IonCard
				className="ion-activatable ripple-parent" 
				style={{boxShadow: "none", margin: 0}}
				onTouchStart = {() => handleButtonPress(callBack, id)}
				onTouchEnd = {handleButtonRelease}
				onMouseDown={() => handleButtonPress(callBack)}
				onMouseUp= {handleButtonRelease}
				onMouseLeave = {handleButtonRelease}
				onClick={() => {history.push(`${PageRoutes.setup_card}/${collectionID}/${id}`)}}>
				
				<div 
					className={"card" + (flipped ? " is-flipped" : "")} 
					style={{paddingBottom: "152%"}}
				>
					<div className="card__face card__face--front">
						<IonCardContent className="container">
							<IonCardTitle style={{fontSize: fontSize, color: "#656290", lineHeight: "15px"}}>
								{newData}
							</IonCardTitle>
						</IonCardContent>
					</div>
					<div className="card__face card__face--back">
						<IonCardContent className="container">
							<IonCardTitle style={{fontSize: "13px", color: "#656290", lineHeight: "15px"}}>
								{data.back}
							</IonCardTitle>
						</IonCardContent>
					</div>
				</div>
				<IonRippleEffect type="inbound"></IonRippleEffect>
			</IonCard>
		</IonCol>
	);
}

export default Item;