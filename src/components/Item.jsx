import {
	IonCardTitle,
	IonCardContent,
	IonCard,
	IonCol,
	IonIcon,
	IonFabButton,
	IonRippleEffect
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {ellipsisVertical, refreshOutline} from 'ionicons/icons';
 
// import '../pages/Play.css';

const Item = ({id, data}) => {
	const history = useHistory();
	const [flipped, setFlip] = useState(false);
	
	// Function to flip the card
	function flipCard() {
		setFlip(!flipped)
	}

	return (
		<IonCol size="6">
			{/*  */}
			<div style={{position: "absolute", top: "6px", right: "0", zIndex: "1"}} >
				<IonFabButton style={{width: "30px", height:"30px", "--box-shadow": "none", "--background": "none", "--background-activated": "none"}}>
					<IonIcon icon={ellipsisVertical} style={{height: "20px", width: "20px", color: "#000"}}/>
				</IonFabButton>
			</div>

			<IonCard className="ion-activatable ripple-parent" style={{boxShadow: "none", margin: 0}} onClick={() => {history.push("/crudCard/" + id )}}>
	
				<div className={"card" + (flipped ? " is-flipped" : "")} style={{paddingBottom: "152%"}}>
					{/* Fron Card */}
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
			<div style={{position: "absolute", bottom: "9px", left: "9px"}}>
				<IonFabButton style={{width: "20px", height:"20px", "--background": (flipped) ? "#b7b0ff" : "#97fff3"}} onClick={flipCard}>
					<IonIcon icon={refreshOutline} style={{width: "12px", height:"12px"}} />
				</IonFabButton>
			</div>
		</IonCol>
	);
}

export default Item;