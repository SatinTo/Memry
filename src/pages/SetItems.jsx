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
						<div slot="start" style={{ width: "67px", backgroundColor: "#B7B0FF", height: "23px", borderRadius: "5px 10px 10px 5px", color: "#656290"}}>
							<IonIcon icon={albumsOutline} style={{width: "20px", height: "20px", float:"left", padding: "1px"}}/>
							<span style={{fontWeight: "bold", fontSize: "10px", lineHeight: "12px", paddingLeft: "26%"}}>10</span>
						</div>

						<IonIcon icon={trashOutline} slot="end" style={{width: "20px", height:"20px", color:"#575757", paddingRight: "5px"}}/>
					</IonToolbar>
				</IonHeader>
				<IonGrid>
					<IonRow >
						<RenderItems/>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>

	);
};

export default SetItems;