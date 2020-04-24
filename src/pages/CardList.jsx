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
	IonFabButton,
	IonAlert,
	IonButtons,
	IonBackButton,
	IonFooter
} from "@ionic/react";
import React, {useState, useContext} from "react";
import {albumsOutline, trashOutline, addSharp, arrowBackOutline, caretForward} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import { useHistory } from "react-router-dom";
import { ItemsContext } from "../ItemsStore";

import RenderItems from '../components/RenderItems';
import Indicator from "../components/Indicator";
const { Storage } = Plugins;

const ProgressBar = ({label}) => {
	return (
		<div style={{ display: "flex", backgroundColor: "#E5E5E5", marginRight: "10px",marginLeft: "3px", borderRadius: "15px", color:"#575757", position: "relative", zIndex: "2", width: "150px", height: "23px", float: "right"}}>
			<div style={{marginTop: "2px"}}>
				<IonIcon icon={addSharp} style={{width: "18px", height: "18px", float: "left"}}/>
				<span style={{fontSize:"10px", lineHeight: "18px", float: "left"}}>{label}</span>
			</div>
			<div style={{position: "absolute", backgroundColor: "#DD6363", width: "50%", height: "23px", borderRadius: "5px 15px 15px 5px", zIndex: "-1"}}></div>
		</div>
	);
}

const PlayButtons = ({label, style, disabled}) => {
	const customCSS = {
		...{width: "80px", height: "34px", "--border-radius": "50px", margin: "0 5px", padding: "0", display: "inline-block"},
		...style
	}

	return (
		<IonFabButton style={customCSS} disabled={disabled}>
			<IonIcon icon={caretForward} style={{width: "20px", height: "20px"}}/>
			<label htmlFor={label} style={{lineHeight: "15px", fontSize: "13px", fontWeight: "bold", paddingLeft: "5px"}}>
				{label}
			</label>
		</IonFabButton>
	);
}

const CardList = () => {
	const history = useHistory();
	const context = useContext(ItemsContext);
	const [isPromptVisible, setPromptVisible] = useState(false);

	const {state: {items_length}, dispatch} = context; 

	function deleteAllItems() {
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
		message: 'Are you sure you want to remove all cards?',
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => setPromptVisible(false)
			},
			{
				text: 'Okay',
				handler: () => {deleteAllItems()}
			}
		]
	}

	return (
		<IonPage>
			<IonContent scrollEvents={false}>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start" style={{paddingLeft: "5px"}}>
							<IonBackButton defaultHref="home" text="" icon={arrowBackOutline} style={{color: "#7D7D7D"}} />
						</IonButtons>
						
						<div slot="secondary">
							<Indicator style={{backgroundColor: "#B7B0FF", color: "#656290"}} icon={albumsOutline}  label="10"/>
							<ProgressBar label="MemPoints: 10/100"/>
						</div>
						
						<IonFabButton slot="end" disabled={(items_length < 1 ?"true": "false")} style={{"--background": "none", boxShadow: "none", "--border-color": "none", "--box-shadow": "none", width: "25px", height:"25px", "--background-activated": "none"}}>
							<IonIcon icon={trashOutline} style={{color:"#575757"}} onClick={() => setPromptVisible(true)}/>
						</IonFabButton>
					</IonToolbar>
				</IonHeader>
				<IonGrid>
					<IonRow >
						<RenderItems/>
						{/* Add New Card Button */}
						<IonCol size="6">
							<IonCard style={{boxShadow: "none", margin: 0, paddingBottom: "152%"}} onClick={() => {history.push("/crudCard")}}>
								<div className="" style={{ width: "100%", borderRadius: "5px", display: "inline-block",height: "100%", border: "4px dashed #B7B0FF", position: "absolute"}}>
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
			<IonFooter>
				<IonToolbar>
					<div style={{textAlign: "center", paddingTop: "5px"}}>
						<PlayButtons 
							disabled={(items_length > 100 ? "false": "true")} 
							style={{"--background" : (items_length > 100 ? "#FC6363" : "#fc636382")}} 
							label="Hell"
						/>
						<PlayButtons 
							disabled={(items_length > 30 ? "false": "true")}
							style={{"--background": (items_length > 30 ? "#FC8763": "#fc876382")}} 
							label="Hard"
						/>
						
						<PlayButtons style={{"--background": "#63FCC5"}} label="Easy"/>
					</div>
				</IonToolbar>
			</IonFooter>
			<IonAlert {...promptProps} />
			
		</IonPage>

	);
};

export default CardList;