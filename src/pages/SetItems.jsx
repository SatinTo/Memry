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
	IonGrid,
	IonCol
} from "@ionic/react";
import React from "react";
import {arrowBackOutline, addOutline} from 'ionicons/icons';

const cardStyle = {
	height: 210,
	width: 130,
	borderRadius: 5,
	margin:"0 0 5px 15px",
	display: "inline-block"
}

const SetItems = (props) => {
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
				<div className="card__face--front" style={cardStyle}>
					{/* <IonCardContent>
						<IonCardTitle></IonCardTitle>
					</IonCardContent> */}
				</div>
				<div className="card__face--front" style={cardStyle}>
					{/* <IonCardContent>
						<IonCardTitle></IonCardTitle>
					</IonCardContent> */}
				</div>
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