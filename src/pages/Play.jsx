import { IonContent, IonFabButton, IonPage, IonToolbar, IonCard, IonIcon, IonCardSubtitle, IonCardTitle, IonCardContent, IonButtons, IonBackButton } from '@ionic/react';
import React, {useState} from 'react';
import {arrowBackOutline, refreshOutline, checkmarkDoneOutline} from 'ionicons/icons';
import './Play.css';

const Play = (props) => {
	const [flipped, setFlip] = useState(false);

	// Function to flip the card
	function flipCard() {
		setFlip(!flipped)
	}

	return (
	<IonPage>
		<IonToolbar style={{ marginTop: 10, paddingLeft: 10, marginBottom: 15}}>
			<IonButtons style={{display: "inline-block"}}>
				<IonBackButton defaultHref="home" text="" icon={arrowBackOutline} />
			</IonButtons>
			<div style={{display: "inline-block", marginLeft: 10, maxWidth: "85%"}}>
				<IonCardTitle style={{fontSize: "1.2em"}}>Total Cards (100/100)</IonCardTitle>
				<IonCardSubtitle style={{fontWeight: "normal", textTransform: "inherit"}}>Finish all cards or press back to reshuffle</IonCardSubtitle>
			</div>
		</IonToolbar>
		<IonContent scrollEvents={false}>
			<div className="container">
				<IonCard style={{height: "80vh", boxShadow: "none"}}>
					<div className={"card" + (flipped ? " is-flipped" : "")} onClick={flipCard}>
						<div className="card__face card__face--front">
							<IonCardContent className="container">
								<IonCardTitle>This is the question mother fucker</IonCardTitle>
							</IonCardContent>	
						</div>
						<div className="card__face card__face--back">
							<IonCardContent className="container">
								<IonCardTitle>This is the answer negga</IonCardTitle>
							</IonCardContent>	
						</div>	
					</div>
				</IonCard>
			</div>
		</IonContent>
		<IonToolbar>
			<div style={{width: "fit-content", margin: "20px auto"}}>
				<IonFabButton color="success" style={{display: "inline-block", marginRight: 15}} onClick={() => props.history.push("/completed")}>
					<IonIcon icon={refreshOutline} />
				</IonFabButton>
				<IonFabButton style={{display: "inline-block"}} onClick={() => props.history.push("/completed")}>
					<IonIcon icon={checkmarkDoneOutline} />
				</IonFabButton>
			</div>
		</IonToolbar>
	</IonPage>
	);
};

export default Play;