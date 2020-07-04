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
	IonFooter,
} from "@ionic/react";
import React, {useState, useContext} from "react";
import {albumsOutline, trashOutline, addSharp, arrowBackOutline, caretForward} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalStore";
import { PageRoutes } from "../vanilla/PageRoutes";
import { formatNumber } from "../vanilla/NumberFormatter";
import RenderItems from '../components/RenderItems/RenderItems';
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

const PlayButtons = ({label, style, disabled, onClick}) => {
	let customCSS = {width: "80px", height: "34px", "--border-radius": "50px", margin: "0 5px", padding: "0", display: "inline-block"};

	Object.assign(customCSS, style); // Overwrite 

	return (
		<IonFabButton 
			style={customCSS} 
			disabled={disabled}
			onClick={onClick}
		>
			<IonIcon icon={caretForward} style={{width: "20px", height: "20px"}}/>
			<label htmlFor={label} style={{lineHeight: "15px", fontSize: "13px", fontWeight: "bold", paddingLeft: "5px"}}>
				{label}
			</label>
		</IonFabButton>
	);
}

const CardList = (props) => {
	const history = useHistory();
	const context = useContext(GlobalContext);
	const [isPromptVisible, setPromptVisible] = useState(false);
	const {state: {items_length}, dispatch} = context;
	const {collectionID} = props.match.params;

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
				handler: () => {
					// Delete all Card Items
					Storage.remove({key: collectionID});
		
					const oldItems = Storage.get({ key: collectionID });
					const newItemsJson = (oldItems.value === "undefined" || !oldItems.hasOwnProperty || !oldItems.value) ? [] : oldItems.value;
					
					dispatch({type: "SET_ITEMS", value: newItemsJson, toast_visible: true, toast_message: "All Items are successfully removed!"});
				}
			}
		]
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonFabButton slot="start" style={{paddingLeft: "5px", "--background": "none", boxShadow: "none", "--border-color": "none", "--box-shadow": "none", width: "25px", height:"25px", "--background-activated": "none"}} routerLink={PageRoutes.collections}>
						<IonIcon 
							icon={arrowBackOutline}
							style={{color: "#7D7D7D"}}
						/>
					</IonFabButton>
					<div slot="secondary">
						<Indicator style={{backgroundColor: "#B7B0FF", color: "#656290"}} icon={albumsOutline} label={formatNumber(items_length)}/>
						<ProgressBar label="MemPoints: 10/100"/>
					</div>
					
					<IonFabButton slot="end" disabled={(items_length < 1 ?"true": "false")} style={{"--background": "none", boxShadow: "none", "--border-color": "none", "--box-shadow": "none", width: "25px", height:"25px", "--background-activated": "none"}}>
						<IonIcon icon={trashOutline} style={{color:"#575757"}} onClick={() => setPromptVisible(true)}/>
					</IonFabButton>
				</IonToolbar>
			</IonHeader>
			<IonContent scrollEvents={false}>
				<IonGrid>
					<IonRow >
						<RenderItems collectionID={collectionID}/>

						{/* Add New Card Button */}
						<IonCol size="6">
							<IonCard style={{boxShadow: "none", margin: 0, paddingBottom: "152%"}} onClick={() => {history.push(`${PageRoutes.setup_card}/${collectionID}`)}}>
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
							style={{"--background" : (items_length > 100 ? "#FC6363" : "rgba(252, 99, 99, 0.5)")}} 
							label="Hell"
						/>
						<PlayButtons 
							disabled={(items_length > 30 ? "false": "true")}
							style={{"--background": (items_length > 30 ? "#FC8763": "rgba(252, 135, 99, 0.5)")}} 
							label="Hard"
						/>
						<PlayButtons 
							style={{"--background": "#63FCC5"}} 
							label="Easy" 
							onClick = {() => {
								// history.push(`${PagePath.play}/${collectionID}`);
								history.push(`${PageRoutes.play}/${collectionID}/0`);
							}}
						/>
					</div>
				</IonToolbar>
			</IonFooter>
			<IonAlert {...promptProps} />
		</IonPage>
	);
};

export default CardList;