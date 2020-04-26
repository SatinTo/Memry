import {
	IonContent,
	IonPage,
	IonToolbar,
	IonIcon,
	IonHeader,
	IonRow,
	IonCol,
	IonCardContent,
	IonCardTitle,
	IonFabButton,
	IonAlert,
	IonLabel,
	IonItem,
	IonPopover,
	IonList,
	IonToast
} from "@ionic/react";
import React, { useState, useContext } from "react";
import {calendarOutline, folderOpenSharp, settingsOutline,addSharp} from 'ionicons/icons';
import Indicator from "../components/Indicator";
import { Plugins } from '@capacitor/core';
import { ItemsContext } from '../ItemsStore'; 
import RenderCollections from "../components/RenderCollections";

const { Storage } = Plugins;

const Collections = () => {
	const [showPopover, setShowpopover] = useState({event: null, status: false});
	const [isAlertVisible, setAlertVisible] = useState(false);
	const [isPromptVisible, setPromptVisible] = useState(false);
	const [toastState, setToastState] = useState({visible: false, message: null});
	const {state: {collection_length}, dispatch} = useContext(ItemsContext);

	function deleteAllCollection() {
		Storage.remove({key: 'collections'});

		const collections =  Storage.get({key: 'collections'});
		const newCollectionJSON = (collections.value === "undefined" || !collections.hasOwnProperty || !collections.value) ? [] : collections.value

		dispatch({type: "SET_COLLECTION", value: newCollectionJSON});

		setToastState({visible: true, message: "All Collections are successfully removed."});
		setShowpopover({event: null, status: false});
	}

	const alertProps = {
		isOpen: isAlertVisible,
		onDidDismiss: () => setAlertVisible(false),
		header: "Collection Title",
		inputs: [{
			name: "Title",
			type: "text",
			placeholder: "Enter your Collection title here..."
		}],
		buttons: [
			{
				text: "Cancel",
				role: "Cancel",
				cssClass: "secondary",
				handler: () => setAlertVisible(false)
			},
			{
				text: "Ok",
				handler: (data) => {
					const title = data.Title
					insertItem(title)
				}
			}
		]
	}

	const promptProps = {
		isOpen: isPromptVisible,
		onDidDismiss: () => setPromptVisible(false),
		header: "Remove All Collections",
		message: "Are you sure you want to remove all collections?",
		buttons: [
			{
				text: "Cancel",
				role: 'cancel',
				handler: () => setPromptVisible(false)
			},
			{
				text: 'Okay',
				handler: () => {deleteAllCollection()}
			}
		]
	}

	const popoverProps = {
		isOpen: showPopover.status,
		onDidDismiss: () => setShowpopover({ event: null, status: false}),
		event: showPopover.event,
		showBackdrop: "true",
		mode: 'ios',
		translucent: true
	}

	
	// Inserting Collection
	async function insertItem(title) {
		const collections = await Storage.get({ key: 'collections' });
		const collectionsJson = (!collections.value || collections.value === "undefined" || !collections.hasOwnProperty) ? [] : JSON.parse(collections.value);

		const newCollections = [
			title,
			...collectionsJson
		];

		await Storage.set({
			key: 'collections',
			value: JSON.stringify(newCollections)
		});

		dispatch({ type: "SET_COLLECTION", value: newCollections})
		setToastState({ visible: true, message: "New Collection is successfully added."})
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<div slot="start" >
						<Indicator style={{backgroundColor: "#FDD9A2", color: "#D78203"}} icon={calendarOutline} label="10" />
						<Indicator style={{backgroundColor: "#B0E7FF", color: "#236B8A"}} icon={folderOpenSharp} label="4" />
					</div>
					
					<IonFabButton 
						slot="end" 
						style={{"--background": "none", boxShadow: "none", "--border-color": "none", "--box-shadow": "none", width: "25px", height:"25px", "--background-activated": "none"}}
						disabled={(collection_length < 1 ?"true": "false")}
						onClick={
							(e) => {
								e.persist();
								setShowpopover({event: e, status: true})
							}
						}
					>
						<IonIcon 
							icon={settingsOutline} 
							style={{width: "20px", height:"20px", color:"#CCCCCC"}} 
						/>

					</IonFabButton>
				</IonToolbar>
			</IonHeader>
			<IonContent scrollEvents={false}>
				<div style={{padding: "0 20px"}}>
					<IonRow>
						<RenderCollections callBack={setToastState} />
						{/* Add Button */}
						<IonCol size="6">
							<div style={{boxShadow: "none", paddingBottom: "50%", height: 0, border: "4px dashed #B0E7FF", borderRadius: "10px", position: "relative"}}>
								<div style={{ borderRadius: "10px", display: "inline-block", margin: "auto", height: "inherit"}}>
									<IonCardContent 
										className="container" 
										style={{paddingLeft: 0, paddingRight: 0}}
										onClick={() => setAlertVisible(true)}
									>
										<IonCardTitle style={{fontSize: "12px", color: "#B0E7FF"}}>
											<IonIcon icon={addSharp} style={{height: "40px", width: "40px"}}/>
											<h1 style={{fontSize: "13px"}}>New Collection</h1>
										</IonCardTitle>
									</IonCardContent>
								</div>
							</div>
						</IonCol>
					</IonRow>
				</div>
			</IonContent>

			<IonPopover {...popoverProps}>
				<IonList>
					<IonItem
						detail={false}
						button
						style={{"--background-activated": "#007EFF", "--color-activated": "#007EFF"}}
						onClick={() => setPromptVisible(true)}
					>
						<IonLabel style={{fontSize: "14px"}}>Reset Workspace</IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel style={{fontSize: "14px"}}>Coming soon...</IonLabel>
					</IonItem>
				</IonList>
			</IonPopover>

			<IonAlert {...alertProps}/>
			<IonAlert {...promptProps}/>

			<IonToast
				isOpen={toastState.visible}
				onDidDismiss={() => setToastState({visible: false, message: null})}
				message={toastState.message}
				duration={500}
			/>
		</IonPage>
	);
};

export default Collections;