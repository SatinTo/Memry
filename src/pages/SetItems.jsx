import {
	IonContent,
	IonPage,
	IonToolbar,
	IonButtons,
	IonCardTitle,
	IonCardSubtitle,
	IonFabButton,
	IonIcon,
	IonRow,
	IonGrid,
	IonAlert,
	IonHeader
} from "@ionic/react";
import React, {useState, useContext} from "react";
import {arrowBackOutline, addOutline, closeOutline, albumsOutline, trashOutline} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import { useHistory } from "react-router-dom";
import { ItemsContext } from "../ItemsStore";

import RenderItems from '../components/RenderItems';
const { Storage } = Plugins;

const SetItems = () => {
	const history = useHistory();
	const context = useContext(ItemsContext);
	const [isPromptVisible, setPromptVisible] = useState(false);

	function deleteAllItems(context) {
		const {dispatch} = context;
		
		Storage.remove({key: "items"});
		
		const oldItems = Storage.get({ key: 'items' });
		const newItemsJson = (oldItems.value === "undefined" || !oldItems.hasOwnProperty || !oldItems.value) ? [] : 
		oldItems.value;
		
		dispatch({type: "SET_ITEMS", value: newItemsJson});
	}

	const promptProps = {
		isOpen: isPromptVisible,
		onDidDismiss: () => setPromptVisible(false),
		header: 'Clear Cards',
		message: 'Are you sure you want to remove all Cards?',
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => setPromptVisible(false)
			},
			{
				text: 'Okay',
				handler: () => {deleteAllItems(context)}
			}
		]
	}

	return (
		<IonPage>
			
			<IonContent scrollEvents={false}>
				<IonHeader>
					<IonToolbar>
						<div slot="start" style={{ width: "80px", backgroundColor: "#FDD9A2", height: "28px", borderRadius: "5px 10px 10px 5px", marginLeft: "10px"}}>
							<IonIcon icon={albumsOutline} style={{width: "2rem", height: "27px", color: "#D78203", float:"left"}}/>
							<span style={{float:"left", padding: "6px", marginLeft: "10px", fontWeight: "bold", color:"#D78203"}}>10</span>
						</div>
						<IonIcon icon={trashOutline} slot="end" style={{width: "30px", height:"30px", color:"#CCCCCC"}}/>
					</IonToolbar>
				</IonHeader>
				<IonGrid>
					<IonRow >
						<RenderItems/>
					</IonRow>
				</IonGrid>
			</IonContent>

			<IonAlert {...promptProps} />
		</IonPage>

	);
};

export default SetItems;