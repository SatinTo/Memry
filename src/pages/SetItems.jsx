import {
	IonContent,
	IonPage,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonCardTitle,
	IonCardSubtitle,
	IonFabButton,
	IonIcon,
	IonCardContent,
	IonCard,
} from "@ionic/react";
import React, {useState} from "react";
import {arrowBackOutline, addOutline} from 'ionicons/icons';

const cardStyle = {
	height: 210,
	width: 130,
	borderRadius: 5,
	margin:"0 0 5px 15px",
	display: "inline-block"
}

const SetItems = (props) => {
	const [flipped, setFlip] = useState(false);

	// Function to flip the card
	function flipCard() {
		setFlip(!flipped)
	}
	
	return (
		<IonPage>
			<IonContent scrollEvents={false}>
				<IonToolbar style={{ marginTop: 10, paddingLeft: 10}}>
					<IonButtons style={{display: "inline-block"}}>
						<IonBackButton defaultHref="home" text="" icon={arrowBackOutline}/>
					</IonButtons>
					<div style={{display: "inline-block", marginLeft: 10, maxWidth: "85%"}}>
						<IonCardTitle style={{fontSize: "1.2em"}}>Set of Cards</IonCardTitle>
						<IonCardSubtitle style={{fontWeight: "normal", textTransform: "inherit"}}>
							Available Cards
						</IonCardSubtitle>
					</div>
				</IonToolbar>
				<IonCard style={{height: "64vh", boxShadow: "none", marginTop: "5px"}}>
					<div className="card__face card__face--front" style={{ width: "50%", height: "60%",borderRadius: "10px", display: "inline-block"}}>
						<IonCardContent className="container">
							<IonCardTitle style={{fontSize: "10px"}}>This is the question mother fucker</IonCardTitle>
						</IonCardContent>	
					</div>
					<div className="card__face card__face--front" style={{ width: "50%", height: "60%",borderRadius: "10px", display: "inline-block"}}>
						<IonCardContent className="container">
							<IonCardTitle style={{fontSize: "10px"}}>This is the question mother fucker</IonCardTitle>
						</IonCardContent>	
					</div>
				</IonCard>
				<div style={{width: "fit-content", position: "absolute", bottom: 10, right: 10}}>
					<IonFabButton style={{display: "inline-block"}} onClick={() => props.history.push("/crudCard")}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</div>
			</IonContent>
		</IonPage>
	);
};
export default SetItems;