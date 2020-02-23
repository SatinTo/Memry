import { IonContent, IonFabButton, IonPage, IonToolbar, IonCard, IonIcon, IonCardSubtitle, IonCardTitle, IonCardContent, IonButtons, IonBackButton, IonAlert, IonHeader } from '@ionic/react';
import React, {useState} from 'react';
import {arrowBackOutline, refreshOutline, trashBinOutline, addOutline} from 'ionicons/icons';
import './CrudCard.css';
import './Play.css';

const Play = (props) => {
	const [flipped, setFlip] = useState(false);
	const [isPromptVisible, setPromptVisible] = useState(false);
	const [frontCardText, setFrontCardText ] = useState(null);
	const [backCardText, setBackCardText ] = useState(null);

	// Function to flip the card
	function flipCard() {
		setFlip(!flipped)
	}

	const alertProps = {
		isOpen: isPromptVisible,
		onDidDismiss: () => setPromptVisible(false),
		header: (flipped) ? "Answer!" : "Question!",
		inputs: [
			{
				name: `${(flipped) ? "Answer" : "Question"}`,
				type: 'text',
				placeholder: `Enter your ${(flipped) ? "Answer" : "Question"} here...`
			}
		],
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => setPromptVisible(false)
			},
			{
				text: 'Ok',
				handler: (data) => {
					if (flipped) {
						setBackCardText(data.Answer);
						return;
					} 

					setFrontCardText(data.Question);
				}
			}
		]
	}


	return (
	<IonPage>
		
		<IonContent scrollEvents={false}>
			<IonToolbar style={{ marginTop: 10, paddingLeft: 10, marginBottom: 15}}>
				<IonButtons style={{display: "inline-block"}}>
					<IonBackButton defaultHref="home" text="" icon={arrowBackOutline} />
				</IonButtons>
				<div style={{display: "inline-block", marginLeft: 10, maxWidth: "85%"}}>
					<IonCardTitle style={{fontSize: "1.2em"}}>{(flipped) ? "Back" : "Front"} Card</IonCardTitle>
					<IonCardSubtitle style={{fontWeight: "normal", textTransform: "inherit"}}>
						Serve as a {(flipped) ? "answer" : "question"} in an item
					</IonCardSubtitle>
				</div>	
			</IonToolbar>
			<div className="container" style={{ paddingTop: "8vh"}}>
				<IonCard style={{height: "64vh", boxShadow: "none"}}>
					<div className={"card" + (flipped ? " is-flipped" : "")} onClick={() => setPromptVisible(true)}>
						<div className="card__face card__face--front">
							<IonCardContent className="container">
								<IonCardTitle>
									{(frontCardText === null) ? <i>Put Question!</i> : frontCardText}
								</IonCardTitle>
							</IonCardContent>
						</div>
						<div className="card__face card__face--back">
							<IonCardContent className="container">
								<IonCardTitle>{(backCardText === null) ? <i>Put Answer!</i> : backCardText}</IonCardTitle>
							</IonCardContent>	
						</div>	
					</div>
				</IonCard>
				<IonToolbar>
					<div style={{width: "fit-content", margin: "0 auto 20px auto"}}>
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
			</div>
			
		</IonContent>
		
		<IonAlert {...alertProps} />
	</IonPage>
	);
};

export default Play;