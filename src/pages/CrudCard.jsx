import { IonContent, IonFabButton, IonPage, IonToolbar, IonCard, IonIcon, IonCardSubtitle, IonCardTitle, IonCardContent, IonButtons, IonBackButton, IonAlert, IonToast } from '@ionic/react';
import React, {useState, useEffect, useContext} from 'react';
import {arrowBackOutline, refreshOutline, trashBinOutline, addOutline} from 'ionicons/icons';
import { ItemsContext } from "../ItemsStore";
import { Plugins } from '@capacitor/core';

import './CrudCard.css';
import './Play.css';

const { Storage } = Plugins;

const Play = (props) => {
	const {dispatch} = useContext(ItemsContext);
	const [flipped, setFlip] = useState(false);
	const [isPromptVisible, setPromptVisible] = useState(false);
	const [isAlertVisible, setAlertVisible] = useState(false);
	const [frontCardText, setFrontCardText ] = useState(null);
	const [backCardText, setBackCardText ] = useState(null);
	const [toastState, setToastState] = useState({
		visible: false,
		message: null
	});

	const {id} = props.match.params
	// Ini ang nag kukua kang data from localStorage
	useEffect(() => {
		(async function(){
			const oldItems = await Storage.get({ key: 'items' });
			const oldItemsJSON = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty) ? [] : JSON.parse(oldItems.value);
			if (!oldItemsJSON || !oldItemsJSON.hasOwnProperty(id) || !oldItemsJSON[id].hasOwnProperty("front") || !oldItemsJSON[id].hasOwnProperty("back")){
				return;
			}
			setFrontCardText(oldItemsJSON[id].front);
			setBackCardText(oldItemsJSON[id].back);
		})();
	}, [id])

	// Function to flip the card
	function flipCard() {
		setFlip(!flipped)
	}

	// Delete a selected item
	async function deleteItem(id) {
		const oldItems = await Storage.get({ key:'items'});
		const newItemsJson = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty)? [] : JSON.parse(oldItems.value);
		const filteredItems = newItemsJson.filter((element, index) => String(index) !== String(id));
		// Update the Storage by setting the filteredItems
		await Storage.set({key: 'items', value: JSON.stringify(filteredItems)});
		//  Update the ItemsStore context;
		dispatch({type: "SET_ITEMS", value: filteredItems});
		// Print a success message
		setToastState({
			visible: true,
			message: "The Item is successfully removed!"
		});
		// Route back the page to setItems
		props.history.push("/setItems");
	}

	async function insertItem() {

		if (!frontCardText){
			setToastState({
				visible: true,
				message: "The front card is empty. Do not forget."
			});
			return;
		}

		if (!backCardText) {
			setToastState({
				visible: true,
				message: "The back card is empty. Do not forget."
			});
			return;
		}
		const oldItems = await Storage.get({ key: 'items' });
		const oldItemsJSON = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty) ? [] : JSON.parse(oldItems.value);
		let newItems;
		if (typeof id === "undefined"){
			newItems = [ 
				{
					front: frontCardText,
					back: backCardText
				},
				...oldItemsJSON
			];
		} else {
			oldItemsJSON[id].front = frontCardText;
			oldItemsJSON[id].back = backCardText;
			newItems = oldItemsJSON;
		}
		await Storage.set({
			key: 'items',
			value: JSON.stringify(newItems)
		});

		dispatch({type: "SET_ITEMS", value: newItems});
		
		setToastState({
			visible: true,
			message: "The Items are successfully saved."
		});
		props.history.push("/setItems");

		if (typeof id === "undefined"){
			setFrontCardText(false);
			setBackCardText(false);
		}
		setFlip(false);
	}

	const alertProps = {
		isOpen: isAlertVisible,
		onDidDismiss: () => setAlertVisible(false),
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
				handler: () => setAlertVisible(false)
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

	const promptProps = {
		isOpen: isPromptVisible,
		onDidDismiss: () => setPromptVisible(false),
		header: 'Delete Card',
		message: 'Are you sure you want to remove this Card?',
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => setPromptVisible(false)
			},
			{
				text: 'Okay',
				handler: () => {deleteItem(id)}
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
					<div className={"card" + (flipped ? " is-flipped" : "")} onClick={() => setAlertVisible(true)}>
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
						<IonFabButton style={{display: "inline-block",  marginBottom: 20}} onClick={insertItem}>
							<IonIcon icon={addOutline} />
						</IonFabButton>
						<IonFabButton 
							style={{display: "inline-block", margin: "0 15px", "--background": (flipped) ? "#b7b0ff" : "#97fff3"}} 
							onClick={flipCard}
						>
							<IonIcon icon={refreshOutline} />
						</IonFabButton>
						<IonFabButton style={{display: "inline-block", marginBottom: 20}}>
							<IonIcon icon={trashBinOutline} onClick={() => {setPromptVisible(true)}} />
							{/* onClick={} */}
						</IonFabButton>
					</div>
				</IonToolbar>
			</div>
		</IonContent>
		
		<IonAlert {...alertProps}/>
		<IonAlert {...promptProps} />
		<IonToast
			isOpen={toastState.visible}
			onDidDismiss={() => setToastState({visible: false, message: null})}
			message={toastState.message}
			duration={500}
		/>
	</IonPage>
	);
};

export default Play;