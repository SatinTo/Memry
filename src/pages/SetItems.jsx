import {
	IonContent,
	IonPage,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonCardTitle,
	IonCardSubtitle,
	IonFabButton,
	IonIcon,
	IonCardContent,
	IonCard,
	IonRow,
	IonCol,
	IonGrid
} from "@ionic/react";
import React, {useState, useEffect, useContext} from "react";
import {arrowBackOutline, addOutline, closeOutline} from 'ionicons/icons';
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
	const {state: {items}, dispatch} = useContext(ItemsContext);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		(async function(){
			if (initialized)
				return;

			const oldItems = await Storage.get({ key: 'items' });
			const oldItemsJSON = (!oldItems.value) ? [] : JSON.parse(oldItems.value);
			
			if (items.length < 1 || JSON.stringify(oldItemsJSON) !== JSON.stringify(items)) {
				dispatch({type: "SET_ITEMS", value: oldItemsJSON});
				console.log(oldItemsJSON, items);
			}

			setInitialized(true);
		})();
	}, [items, initialized, dispatch])

	if (items.length < 1) {
		return <></>;
	}
	return <>
		{
		items.map((data, index) => {
			return <Item key={index} data={data} id={index}/>
		})}
	</>
}

const SetItems = () => {
	const history = useHistory();
	
	return (
		<IonPage>
			<IonContent scrollEvents={false}>
				<IonToolbar style={{ marginTop: 10, paddingLeft: 10}}>
					<IonButtons style={{display: "inline-block"}}>
						<IonBackButton defaultHref="home" text="" icon={arrowBackOutline}/>
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
					<IonFabButton style={{display: "inline-block"}} color="danger"  
					onClick={() => history.push("/crudCard")}>
						<IonIcon icon={closeOutline} />
					</IonFabButton>
					<IonFabButton style={{display: "inline-block"}} onClick={() => history.push("/crudCard")}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</div>
			</IonContent>
		</IonPage>
	);
};
export default SetItems;