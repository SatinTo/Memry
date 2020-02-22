import { IonContent, IonFabButton, IonPage, IonToolbar, IonCard, IonIcon, IonCardSubtitle, IonCardTitle, IonCardContent, IonButtons, IonBackButton } from '@ionic/react';
import React, {useState} from 'react';
import {arrowBackOutline, refreshOutline, trashBinOutline, addOutline} from 'ionicons/icons';
import './FrontCard.css';
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
				<IonCardTitle style={{fontSize: "1.2em"}}>Front Card</IonCardTitle>
				<IonCardSubtitle style={{fontWeight: "normal", textTransform: "inherit"}}>
					Serve as a question in an item
				</IonCardSubtitle>
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
				<IonFabButton style={{display: "inline-block",  marginBottom: 20}}>
					<IonIcon icon={addOutline} />
				</IonFabButton>
				<IonFabButton 
					style={{display: "inline-block", margin: "0 15px", "--background": (flipped) ? "#b7b0ff" : "#97fff3"}} 
					onClick={flipCard}
				>
					<IonIcon icon={refreshOutline} />
				</IonFabButton>
				<IonFabButton style={{display: "inline-block", marginBottom: 20}}>
					<IonIcon icon={trashBinOutline} />
				</IonFabButton>
			</div>
		</IonToolbar>
	</IonPage>
	);
};

export default Play;