import React, {useState} from 'react';
import { IonContent, IonFabButton, IonPage, IonToolbar, IonCard, IonIcon, IonCardSubtitle, IonCardTitle, IonCardContent, IonButtons, IonBackButton, useIonViewWillEnter } from '@ionic/react';
import {arrowBackOutline, refreshOutline, checkmarkDoneOutline} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import { useHistory, useParams } from "react-router-dom";
import './Play.css';
import PlayProcessor from '../vanilla/PlayProcessor';

const { Storage } = Plugins;

const Play = () => {
	const history = useHistory();
	const {collectionID, difficulty} = useParams();
	const [flipped, setFlip] = useState(false);
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [cardItems, setCardItems] = useState([]);

	// Function to flip the card
	function flipCard() {
		setFlip(!flipped)
	}

	// Makesure not to cache the items
	useIonViewWillEnter(() => {
		Storage.get({ key: collectionID }).then((oldItems) => {
			const oldItemsJSON = (!oldItems.value) ? [] : JSON.parse(oldItems.value);

			// TODO: Change max item according to difficulty
			const PlayProcessorC = new PlayProcessor(oldItemsJSON, 30);
			const newCards = PlayProcessorC.getCards();

			// Put the items
			setCardItems(newCards);
			setCurrentCardIndex(0); // Start from top
			setFlip(false);
		});
	});
	
	function propagate(){
		
		// Update the mempoints of the current card to 100
		Storage.get({ key: collectionID }).then((oldItems) => {

			if (!oldItems.value)
				return;

			const TARGET_CARD_INDEX = cardItems[currentCardIndex].id;
			let CARD_ITEMS = JSON.parse(oldItems.value);
			CARD_ITEMS[TARGET_CARD_INDEX]["last_review"] = new Date().getTime();
			CARD_ITEMS[TARGET_CARD_INDEX]["mp"] = 100;

			Storage.set({key: collectionID, value: JSON.stringify(CARD_ITEMS)});
		});

		const nextIndex = currentCardIndex+1;

		if (nextIndex >= cardItems.length){
			history.replace("/completed/" + cardItems.length)
			return;
		}

		setCurrentCardIndex(nextIndex);
		setFlip(false);
	}
	
	return (
	<IonPage>
		<IonContent scrollEvents={false}>
			<IonToolbar style={{ marginTop: 10, paddingLeft: 10, marginBottom: 15}}>
				<IonButtons style={{display: "inline-block"}}>
					<IonBackButton defaultHref="home" text="" icon={arrowBackOutline} />
				</IonButtons>
				<div style={{display: "inline-block", marginLeft: 10, maxWidth: "85%"}}>
					<IonCardTitle style={{fontSize: "1.2em"}}>
						Total Cards ({cardItems.length ? currentCardIndex+1 : 0}/{cardItems.length})
					</IonCardTitle>
					<IonCardSubtitle style={{fontWeight: "normal", textTransform: "inherit"}}>I know you can do it. Get it done!</IonCardSubtitle>
				</div>	
			</IonToolbar>
			<div className="container" style={{ paddingTop: "8vh"}}>
				{
					(cardItems.length < 1) ?
						<IonCardSubtitle>Create a card to play.</IonCardSubtitle>
					:
					<>
						<IonCard style={{height: "64vh", boxShadow: "none"}}>
							<div className={"card" + (flipped ? " is-flipped" : "")} onClick={flipCard}>
								<div className="card__face card__face--front">
									<IonCardContent className="container">
										<IonCardTitle>{cardItems[currentCardIndex].front}</IonCardTitle>
									</IonCardContent>	
								</div>
								<div className="card__face card__face--back">
									<IonCardContent className="container">
										<IonCardTitle>{cardItems[currentCardIndex].back}</IonCardTitle>
									</IonCardContent>
								</div>
							</div>
						</IonCard>
						<IonToolbar>
							<div style={{width: "fit-content", margin: "20px auto"}}>
								<IonFabButton color="success" style={{display: "inline-block", marginRight: 15}} onClick={flipCard}>
									<IonIcon icon={refreshOutline} />
								</IonFabButton>
								<IonFabButton style={{display: "inline-block"}} onClick={propagate}>
									<IonIcon icon={checkmarkDoneOutline} />
								</IonFabButton>
							</div>
						</IonToolbar>
					</>
				}
			</div>
		</IonContent>
	</IonPage>
	);
};

export default Play;