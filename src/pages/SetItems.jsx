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
import React, {useState, useEffect} from "react";
import {arrowBackOutline, addOutline, closeOutline} from 'ionicons/icons';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const cardStyle = {
	height: 210,
	width: 130,
	borderRadius: 5,
	margin:"0 0 5px 15px",
	display: "inline-block"
}

const Item = ({id, data, history}) => {
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

const RenderItems = (props) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		if (items.length < 1) {
			(async function(){
				const oldItems = await Storage.get({ key: 'items' });
				const oldItemsJSON = (!oldItems.value) ? [] : JSON.parse(oldItems.value);
				setItems(oldItemsJSON);
			})();
		}
	}, [items])

	if (items.length < 1) {
		return <></>;
	}
	return <>
		{
		items.map((data, index) => {
			console.log("test");
			return <Item key={index} data={data} history={props.history} id={index}/>
		})}
	</>
}

const SetItems = (props) => {
	const [flipped, setFlip] = useState(false);

	// Function to flip the card
	function flipCard() {
		setFlip(!flipped)
	}
	
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
					<IonRow>
						<RenderItems history={props.history}/>
					</IonRow>
				</IonGrid>
				<div style={{width: "70px", position: "absolute", bottom: 10, right: 10, textAlign: "right"}}>
					<IonFabButton style={{display: "inline-block"}} color="danger"  
					onClick={() => props.history.push("/crudCard")}>
						<IonIcon icon={closeOutline} />
					</IonFabButton>
					<IonFabButton style={{display: "inline-block"}} onClick={() => props.history.push("/crudCard")}>
						<IonIcon icon={addOutline} />
					</IonFabButton>
				</div>
			</IonContent>
		</IonPage>
	);
};
export default SetItems;