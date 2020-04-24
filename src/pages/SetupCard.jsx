import { 
	IonContent,
	IonFabButton,
	IonPage, 
	IonToolbar, 
	IonCard, 
	IonIcon, 
	IonCardTitle, 
	IonCardContent, 
	IonButtons, 
	IonBackButton, 
	IonAlert, 
	IonToast,
	useIonViewWillEnter, 
	IonHeader, 
	IonRippleEffect, 
	IonButton, 
	IonSelect,
	IonSelectOption,
} from '@ionic/react';

import React, {useState, useContext} from 'react';
import {arrowBackOutline, refreshOutline, trashOutline} from 'ionicons/icons';
import { ItemsContext } from "../ItemsStore";
import { Plugins } from '@capacitor/core';

import './SetupCard.css';
import './Play.css';

const { Storage } = Plugins;

export const RATE_YOUR_SELF = 0;
export const TYPE_THE_ANSWER = 1;

const SetupCard = (props) => {
	const {dispatch} = useContext(ItemsContext);
	const [flipped, setFlip] = useState(false);
	const [isDelConfirmVisible, setDelConfirmVisible] = useState(false);
	const [isCardInputVisible, setCardInputVisible] = useState(false);
	const [cardDetail, setCardDetail] = useState({
		front: null,
		back: null
	});
	
	const [toastState, setToastState] = useState({
		visible: false,
		message: null
	});
	
	const [type, setType] = useState(RATE_YOUR_SELF);

	const {id} = props.match.params
	const updateMode = (typeof id !== "undefined");

	useIonViewWillEnter(() => {
		if (!updateMode){
			setCardDetail({ front: null, back: null })
		}
		
		setFlip(false);

		Storage.get({ key: 'items' }).then((oldItems) => {
			const oldItemsJSON = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty) ? [] : JSON.parse(oldItems.value);
			if (!oldItemsJSON || !oldItemsJSON.hasOwnProperty(id) || !oldItemsJSON[id].hasOwnProperty("front") || !oldItemsJSON[id].hasOwnProperty("back")){
				return;
			}
			setCardDetail( oldItemsJSON[id] )
		});
	});

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

		if (!cardDetail.front){
			setToastState({
				visible: true,
				message: "The front card is empty. Do not forget."
			});
			return;
		}

		if (!cardDetail.back) {
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
					front: cardDetail.front,
					back: cardDetail.back
				},
				...oldItemsJSON
			];
		} else {
			oldItemsJSON[id].front = cardDetail.front;
			oldItemsJSON[id].back = cardDetail.back;
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
	}

	const alertProps = {
		isOpen: isCardInputVisible,
		onDidDismiss: () => setCardInputVisible(false),
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
				handler: () => setCardInputVisible(false)
			},
			{
				text: 'Ok',
				handler: (data) => {
					if (flipped) {
						setCardDetail({...cardDetail, back: data.Answer});
						console.log({...cardDetail, back: data.Answer});
						return;
					}
					
					setCardDetail({...cardDetail, front: data.Question});
				}
			}
		]
	}

	const promptProps = {
		isOpen: isDelConfirmVisible,
		onDidDismiss: () => setDelConfirmVisible(false),
		header: 'Delete Card',
		message: 'Are you sure you want to remove this Card?',
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => setDelConfirmVisible(false)
			},
			{
				text: 'Okay',
				handler: () => deleteItem(id)
			}
		]
	}

	return (
	<IonPage >
		<IonContent style={{"--overflow": "hidden"}} scrollEvents={false}>
			<IonHeader>
				<IonToolbar style={{ marginTop: 10, paddingLeft: 10, marginBottom: 15, height: "50px", color: "#7D7D7D"}}>
					<IonButtons slot="start">
						<IonBackButton defaultHref="/home" text="" icon={arrowBackOutline} style={{color: "inherit"}} />
					</IonButtons>
					<IonCardTitle style={{fontSize: "1.2em", color: "inherit", position: "absolute", left: "43px", lineHeight: "21px", display: "flex", alignItems: "center", top: 0, bottom: 0}}>
						{updateMode ? "Update card": "Create new card"}
					</IonCardTitle>

					{
						updateMode && (
							<div slot="end" className="ion-activatable" style={{position: "relative", padding: "5px", marginRight: "5px"}} onClick={() => {setDelConfirmVisible(true)}} >
								<IonIcon icon={trashOutline} style={{color: "inherit", height: "20px", width: "20px"}} />
								<IonRippleEffect type="unbounded"></IonRippleEffect>
							</div>
						)
					}
				</IonToolbar>
			</IonHeader>
			<div style={{border: "1px solid #DBDDE0", borderRadius: "8px", width: "165px", margin: "auto"}}>
				<IonSelect cancelText="Nah" okText="Select it!" value={type} placeholder="Select One" onIonChange={e => setType(e.detail.value)}>
					<IonSelectOption value={RATE_YOUR_SELF} >Rate-yourself</IonSelectOption>
					<IonSelectOption disabled={true} value={TYPE_THE_ANSWER}>Type-the-answer</IonSelectOption>
				</IonSelect>
			</div>
				
			<IonCard style={{width: "68%", margin: "15px auto", boxShadow: "none"}}>
				<div  style={{height: "0", paddingBottom: "158%"}} className={"card" + (flipped ? " is-flipped" : "")} onClick={() => setCardInputVisible(true)}>
					<div className="card__face card__face--front">
						<IonCardContent className="container">
							<IonCardTitle style={{color: "#656290"}}>
								{(updateMode || cardDetail.front !== null) ? cardDetail.front : <i>Put Question!</i>}
							</IonCardTitle>
						</IonCardContent>
					</div>
					<div className="card__face card__face--back">
						<IonCardContent className="container">
							<IonCardTitle style={{color: "#3D746D"}}>
								{(updateMode || cardDetail.back !== null) ? cardDetail.back : <i>Put Answer!</i>}
							</IonCardTitle>
						</IonCardContent>
					</div>
				</div>
			</IonCard>
			<IonToolbar>
				<div style={{width: "fit-content", margin: "0 auto 20px auto"}}>
					<IonFabButton 
						style={{display: "inline-block", margin: "0 15px", "--background": (flipped) ? "#b7b0ff" : "#97fff3"}} 
						onClick={flipCard}
					>
						<IonIcon icon={refreshOutline} />
					</IonFabButton>
					
					<IonButton disabled={!flipped} shape="round" onClick={insertItem} style={{float: "right", marginRight: "7px"}}>
						{updateMode ? "Update card": "Create new card"}
					</IonButton>
				</div>
			</IonToolbar>
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

export default SetupCard;