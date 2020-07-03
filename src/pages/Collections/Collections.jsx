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
} from "@ionic/react";
import React, { useState, useContext } from "react";
import {folderOpenSharp, settingsOutline,addSharp} from 'ionicons/icons';
import Indicator from "../../components/Indicator";
import { Plugins } from '@capacitor/core';
import { GlobalContext } from '../../context/GlobalStore'; 
import RenderCollections from "../../components/RenderCollections";
import { formatNumber } from "../../vanilla/NumberFormatter";

const { Storage } = Plugins;

const Collections = () => {
	const [showPopover, setShowpopover] = useState({event: null, status: false});
	const [isAlertVisible, setAlertVisible] = useState(false);
	const [isPromptVisible, setPromptVisible] = useState(false);
	const {state: {collection_length}, dispatch} = useContext(GlobalContext);

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
				handler: async (data) => {
					// Creates new Workspace
					const title = data.Title;
					title.replace(/\s/g, "");
					
					if (title.length < 1){
						dispatch({ type: "SHOW_TOAST", value: "Oooppss! The title should not be empty."})
						return false;
					}

					const collections = await Storage.get({ key: 'collections' });
					const collectionsJson = (!collections.value || collections.value === "undefined" || !collections.hasOwnProperty) ? [] : JSON.parse(collections.value);

					const newCollections = [
						...collectionsJson,
						title
					];

					await Storage.set({
						key: 'collections',
						value: JSON.stringify(newCollections)
					});

					dispatch({ type: "SET_COLLECTION", value: newCollections, toast_visible: true, toast_message: "New Collection is successfully added."});
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
				handler: () => {
					// Delete all Workspace
					Storage.clear();

					const collections =  Storage.get({key: 'collections'});
					const newCollectionJSON = (collections.value === "undefined" || !collections.hasOwnProperty || !collections.value) ? [] : collections.value

					dispatch({type: "SET_COLLECTION", value: newCollectionJSON, toast_visible: true, toast_message: "All Collections are successfully removed."});
					setShowpopover({event: null, status: false});
				}
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

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<div slot="start" >
						<Indicator style={{backgroundColor: "#B0E7FF", color: "#236B8A"}} icon={folderOpenSharp} label={formatNumber(collection_length)} />
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
						<RenderCollections />
						{/* Add Button */}
						<IonCol size="12">
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
		</IonPage>
	);
};

export default Collections;