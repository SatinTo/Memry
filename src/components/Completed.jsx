import { IonContent, IonFabButton, IonToolbar, IonIcon, IonTitle } from '@ionic/react';
import React from 'react';
import {exitOutline} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const Completed = ({count}) => {
	const history = useHistory();

	return (
		<IonContent scrollEvents={false}>
			<div className="container">
				<IonToolbar>
					<IonTitle style={{color: "#63a0fc", fontSize: "3em"}}>{count}</IonTitle>
				</IonToolbar>
				<IonToolbar style={{lineHeight: "2.5em"}}>
					<IonTitle style={{fontSize: "1.4em", lineHeight: "1.4em", padding: 0}}>Cards Completed</IonTitle>
				</IonToolbar>
				<div style={{color: "#aaaaaa"}}>Job well done!</div>
			</div>
			<IonToolbar style={{ position: "absolute", bottom: 0 }}>
				<div style={{width: "fit-content", margin: "20px auto"}}>
					<IonFabButton style={{display: "inline-block", marginRight: 15}} onClick={() => history.goBack()}>
						<IonIcon icon={exitOutline} style={{transform: "rotate(180deg)"}} />
					</IonFabButton>
				</div>
			</IonToolbar>
		</IonContent>
	);
};

export default Completed;