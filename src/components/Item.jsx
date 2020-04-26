import {
	IonCardTitle,
	IonCardContent,
	IonCard,
	IonCol,
	IonRippleEffect,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { PagePath } from "../vanilla/Constants";
import { handleButtonPress, handleButtonRelease } from "../vanilla/mouseHold";

const Item = ({id, data, callBack, collectionID, flipped}) => {
	const history = useHistory();

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
				onClick={() => {history.push(`${PagePath.setup_card}/${collectionID}/${id}`)}}>
				
				<div 
					className={"card" + (flipped ? " is-flipped" : "")} 
					style={{paddingBottom: "152%"}}
				>
					<div className="card__face card__face--front">
						<IonCardContent className="container">
							<IonCardTitle style={{fontSize: "13px", color: "#656290", lineHeight: "15px"}}>
								{data.front}
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