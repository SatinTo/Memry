import { IonContent, IonFabButton, IonPage, IonFabList, IonToolbar, IonCard, IonItem, IonIcon, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonButtons, IonBackButton, IonFooter, IonTitle } from '@ionic/react';
import React, {useState} from 'react';
import {shuffleOutline, exitOutline} from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';

const Completed = () => {
	const history = useHistory();
	
	let {count} = useParams();

	return (
	<IonPage>
		<IonContent scrollEvents={false}>
			<div className="container">
				<IonToolbar>
					<IonTitle style={{color: "#63a0fc", fontSize: "3em"}}>{count}</IonTitle>
				</IonToolbar>
				<IonToolbar style={{lineHeight: "2.5em"}}>
					<IonTitle style={{fontSize: "1.4em", lineHeight: "1.4em", padding: 0}}>Cards Completed</IonTitle>
				</IonToolbar>
				<div style={{color: "#aaaaaa"}}>You either reshuffle or exit</div>
			</div>
			<IonToolbar style={{ position: "absolute", bottom: 0 }}>
				<div style={{width: "fit-content", margin: "20px auto"}}>
					<IonFabButton style={{display: "inline-block", marginRight: 15}} onClick={() => history.replace("/home")}>
						<IonIcon icon={exitOutline} style={{transform: "rotate(180deg)"}} />
					</IonFabButton>
					<IonFabButton color="success" style={{display: "inline-block"}} onClick={() => history.replace("/play")} >
						<IonIcon icon={shuffleOutline} />
					</IonFabButton>
				</div>
			</IonToolbar>
		</IonContent>
	</IonPage>
	);
};

export default Completed;