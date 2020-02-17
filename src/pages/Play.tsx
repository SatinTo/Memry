import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonItem, IonIcon, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import React, {useState} from 'react';
import {arrowBackOutline} from 'ionicons/icons';
import './Play.css';

const Play = () => {

	const [flipped, setFlip] = useState(false);

	return (
	<IonPage>
		<IonToolbar style={{ marginTop: 10, paddingLeft: 10}}>
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
					<div className={"card" + (flipped ? " is-flipped" : "")} onClick={() => setFlip(!flipped)}>
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
	</IonPage>
	);
};

export default Play;