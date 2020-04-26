import {
	IonCardTitle,
	IonCardContent,
	IonCard,
	IonCol,
	IonIcon,
	IonFabButton,
	IonRippleEffect,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {refreshOutline} from 'ionicons/icons';
import EllipsisButton from "./EllipsisButton";
 
const Item = ({id, data, callBack, collectionID}) => {
	const history = useHistory();
	const [flipped, setFlip] = useState(false);

	// Function to flip the card
	function flipCard() {
		setFlip(!flipped)
	}

	return (
		<IonCol size="6">
			<IonCard className="ion-activatable ripple-parent" style={{boxShadow: "none", margin: 0}} onClick={() => {history.push("/crudCard/" + collectionID + "/" + id)}}>
				
				<div className={"card" + (flipped ? " is-flipped" : "")} style={{paddingBottom: "152%"}}>
					<div className="card__face card__face--front">
						<EllipsisButton callBack={callBack} itemID={id}/>
						<IonCardContent className="container">
							<IonCardTitle style={{fontSize: "13px", color: "#656290", lineHeight: "15px"}}>
								{data.front}
							</IonCardTitle>	
						</IonCardContent>
					</div>
					<div className="card__face card__face--back">
						<EllipsisButton callBack={callBack} itemID={id}/>
						<IonCardContent className="container">
							<IonCardTitle style={{fontSize: "13px", color: "#656290", lineHeight: "15px"}}>
								{data.back}
							</IonCardTitle>
						</IonCardContent>
					</div>
				</div>
				<IonRippleEffect type="inbound"></IonRippleEffect>
			</IonCard>
		
			<div style={{position: "absolute", bottom: "9px", left: "9px"}}>
				<IonFabButton style={{width: "20px", height:"20px", "--background": (flipped) ? "#b7b0ff" : "#97fff3"}} onClick={flipCard}>
					<IonIcon icon={refreshOutline} style={{width: "12px", height:"12px"}} />
				</IonFabButton>
			</div>
		</IonCol>
		
	);
}

export default Item;