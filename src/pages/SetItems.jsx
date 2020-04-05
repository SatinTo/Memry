import {
	IonContent,
	IonPage,
	IonToolbar,
	IonButtons,
	IonCardTitle,
	IonCardSubtitle,
	IonFabButton,
	IonIcon,
	IonCardContent,
	IonCard,
	IonRow,
	IonCol,
	IonGrid,
	IonAlert
} from "@ionic/react";
import React, {useState, useEffect, useContext} from "react";
import {arrowBackOutline, addOutline, closeOutline, logoWindows} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import { useHistory } from "react-router-dom";
import { ItemsContext } from "../ItemsStore";

const { Storage } = Plugins;

const Item = ({id, data}) => {
	const history = useHistory();

	return (
		<IonCol size="6">
			<IonCard style={{height: "40vh", boxShadow: "none", margin: 0}}
			onClick={() => {history.push("/crudCard/" + id )}}>
				<div className="card__face card__face--front" style={{ width: "100%", borderRadius: "10px", display: "inline-block"}}>
					<IonCardContent className="container">
						<IonCardTitle style={{fontSize: "10px"}}>
							{data.front}
						</IonCardTitle>
					</IonCardContent>
				</div>
			</IonCard>
		</IonCol>
	);
}

const RenderItems = () => {
	const context = useContext(ItemsContext);
	const {state: {items}, dispatch} = context;
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		(async function(){
			if (initialized)
				return;

			const oldItems = await Storage.get({ key: 'items' });
			const oldItemsJSON = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty) ? [] : JSON.parse(oldItems.value);
			
			if (items.length < 1 || JSON.stringify(oldItemsJSON) !== JSON.stringify(items)) {
				dispatch({type: "SET_ITEMS", value: oldItemsJSON});
			}

			setInitialized(true);
		})();
	}, [items, initialized, dispatch])

	if (items.length < 1) {
		return <></>;
	}
	return <>
		{items.map((data, index) => {
			return <Item key={index} data={data} id={index}/>
		})}
	</>
}



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
		header: 'Delete Card',
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
				<IonToolbar style={{ marginTop: 10, paddingLeft: 10}}>
					<IonButtons style={{display: "inline-block"}} onClick={() => history.push("/home")} >
						<IonIcon icon={arrowBackOutline} style={{ fontSize: 30, color: "gray"}}/>
					</IonButtons>
					<div style={{display: "inline-block", marginLeft: 10, maxWidth: "85%"}}>
						<IonCardTitle style={{fontSize: "1.2em"}}>Set of Cards</IonCardTitle>
						<IonCardSubtitle style={{fontWeight: "normal", textTransform: "inherit"}}>
							Available Cards
						</IonCardSubtitle>
					</div>
				</IonToolbar>
				<IonGrid>
					<IonRow >
						<RenderItems/>
					</IonRow>
				</IonGrid>
				<div style={{width: "70px", position: "fixed", bottom: 10, right: 10, textAlign: "right"}}>
					<IonFabButton style={{display: "inline-block"}} color="danger">
						<IonIcon icon={closeOutline} onClick={() => {setPromptVisible(true)}} />
					</IonFabButton>
					<IonFabButton style={{display: "inline-block"}} onClick={() => history.push("/crudCard")}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</div>
			</IonContent>

			<IonAlert {...promptProps} />
		</IonPage>

	);
};
export default SetItems;