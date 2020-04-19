import {
	IonContent,
	IonPage,
	IonToolbar,
	IonCardTitle,
	IonIcon,
	IonRow,
	IonGrid,
	IonHeader,
	IonCol,
	IonCardContent,
	IonCard,
	IonFabButton
} from "@ionic/react";
import React, {useState, useContext} from "react";
import {albumsOutline, trashOutline, addSharp} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import { useHistory } from "react-router-dom";
import { ItemsContext } from "../ItemsStore";

// import RenderItems from '../components/RenderItems';
import Item from "../components/Item";
const { Storage } = Plugins;

const SetItems = () => {
	// const history = useHistory();
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
						<div slot="start" style={{ width: "67px", backgroundColor: "#B7B0FF", height: "23px", borderRadius: "5px 10px 10px 5px", color: "#656290", marginLeft: "3px"}}>
							<IonIcon icon={albumsOutline} style={{width: "20px", height: "20px", float:"left", padding: "1px"}}/>
							<span style={{fontWeight: "bold", fontSize: "10px", lineHeight: "12px", paddingLeft: "14px"}}>10</span>
						</div>
						
						<div style={{ display: "flex", padding: "1px", background: "#E5E5E5", marginLeft: "4px", borderRadius: "15px", color:"#575757", position: "relative", zIndex: "2", width: "190px", height: "23px"}}>
							<div style={{marginTop: "2px"}}>
								<IonIcon icon={addSharp} style={{width: "18px", height: "18px", float: "left"}}/>
								<span style={{fontSize:"10px", lineHeight: "18px", float: "left"}}>MemPoints: 10/100</span>
							</div>
							<div style={{position: "absolute", backgroundColor: "#DD6363", width: "50%", height: "23px", borderRadius: "5px 15px 15px 5px", zIndex: "-1"}}></div>
						</div>
						<IonFabButton slot="end" style={{"--background": "none", boxShadow: "none", "--border-color": "none", "--box-shadow": "none", width: "25px", height:"25px"}}>
							<IonIcon icon={trashOutline}  style={{color:"#575757", paddingRight: "5px"}}/>
						</IonFabButton>
					</IonToolbar>
				</IonHeader>
				<IonGrid>
					<IonRow >
						{/* <RenderItems/> */}
						<Item/>
						<Item/>
						<Item/>
						{/* Add New Card Button */}
						<IonCol size="6">
							<IonCard style={{boxShadow: "none", margin: 0, paddingBottom: "152%"}}>
								<div className="" style={{ width: "100%", borderRadius: "5px", display: "inline-block", height: "100%", border: "4px dashed #B7B0FF", position: "absolute"}}>
									<IonCardContent className="container">
										<IonCardTitle style={{color: "#B7B0FF"}}>
											<IonIcon icon={addSharp} style={{width: "50px", height: "50px"}}/>
											<h1 style={{fontSize: "13px", lineHeight: "15px"}}>Add New Card</h1>
										</IonCardTitle>
									</IonCardContent>
								</div>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>

	);
};

export default SetItems;