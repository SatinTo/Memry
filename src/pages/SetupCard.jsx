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
import { generateCardProps, generateReducer, generatePromptProps, generateAlertProps}  from "./SetupCardProcessor";

import './SetupCard.css';
import './Play.css';

const { Storage } = Plugins;

export const RATE_YOUR_SELF = 0;
export const TYPE_THE_ANSWER = 1;

const SetupCard = (props) => {
	// Native JS
	const {id} = props.match.params;
	const updateMode = (typeof id !== "undefined");
	const DEFAULT_CARD_STATE = {
		front: null,
		back: null,
		type: RATE_YOUR_SELF
	};

	// Hooks
	const {dispatch} = useContext(ItemsContext);
	const [cardDetail, setCardDetail] = useState(DEFAULT_CARD_STATE);

	const [pageConfig, setPageConfig] = useState({
		cardFlipped: false,
		confirmDeleteShown: false,
		cardInputShown: false,
		toast: {
			visible: false,
			message: null	
		}
	});

	const reducer = generateReducer({setPageConfig, pageConfig, DEFAULT_CARD_STATE, setCardDetail, cardDetail, props});

	useIonViewWillEnter(() => {
		if (!updateMode)
			reducer({type: "RESET_CARD"});

		reducer({type: "UNFLIP_CARD"});

		Storage.get({ key: 'items' }).then((oldItems) => {
			const oldItemsJSON = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty) ? [] : JSON.parse(oldItems.value);
			
			if (!oldItemsJSON || !oldItemsJSON.hasOwnProperty(id))
				return;

			reducer({type: "SET_CARD_DETAILS", val: oldItemsJSON[id]});
		});
	});

	// Function to flip the card
	const alertProps = generateAlertProps({pageConfig, reducer});
	const promptProps = generatePromptProps({pageConfig, reducer, id, dispatch});
	const createCardProps = generateCardProps({pageConfig, cardDetail, reducer, id, dispatch});

	return (
	<IonPage >
		<IonContent style={{"--overflow": "hidden"}} scrollEvents={true}>
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
							<div 
								slot="end"
								className="ion-activatable"
								style={{position: "relative", padding: "5px", marginRight: "5px"}} 
								onClick={() => reducer({type: "SHOW_DELETE_CONFIRMATION"})}
							>
								<IonIcon icon={trashOutline} style={{color: "inherit", height: "20px", width: "20px"}} />
								<IonRippleEffect type="unbounded"></IonRippleEffect>
							</div>
						)
					}
				</IonToolbar>
			</IonHeader>
			<div style={{border: "1px solid #DBDDE0", borderRadius: "8px", width: "165px", margin: "auto"}}>
				<IonSelect 
					cancelText="Nah"
					okText="Select it!"
					value={cardDetail.type}
					placeholder="Select One"
					onIonChange={e => reducer({type: "SET_CARD_TYPE", val: e.detail.value})}
				>
					<IonSelectOption value={RATE_YOUR_SELF} >Rate-yourself</IonSelectOption>
					<IonSelectOption value={TYPE_THE_ANSWER}>Type-the-answer</IonSelectOption>
				</IonSelect>
			</div>

			<Card.RateYourself {...{pageConfig, reducer, updateMode, cardDetail, createCardProps}}  />

		</IonContent>
		
		<IonAlert {...alertProps}/>
		<IonAlert {...promptProps} />
		<IonToast
			isOpen={pageConfig.toast.visible}
			onDidDismiss={() => reducer({type: "HIDE_TOAST"})}
			message={pageConfig.toast.message}
			duration={500}
		/>
	</IonPage>
	);
};

// Card Types
const Card = {
	RateYourself: ({pageConfig, reducer, updateMode, cardDetail, createCardProps}) => {
		return (<>
			<IonCard style={{width: "68%", margin: "15px auto", boxShadow: "none"}}>
				<div  
					style={{height: "0", paddingBottom: "158%"}} 
					className={"card" + (pageConfig.cardFlipped ? " is-flipped" : "")} 
					onClick={() => reducer({type: "SHOW_CARD_INPUT"})}
				>
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
						style={{display: "inline-block", margin: "0 15px", "--background": (pageConfig.cardFlipped) ? "#b7b0ff" : "#97fff3"}} 
						onClick={() => reducer({type: "FLIP_CARD"})}
					>
						<IonIcon icon={refreshOutline} />
					</IonFabButton>
					
					<IonButton {...createCardProps}>
						{updateMode ? "Update card": "Create new card"}
					</IonButton>
				</div>
			</IonToolbar>
		</>)
	}	
};

export default SetupCard;