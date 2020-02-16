import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonItem, IonIcon, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import React from 'react';
import {arrowBackOutline} from 'ionicons/icons';

const Play = () => {
	return (
	<IonPage>
		<IonToolbar style={{ marginTop: 10, paddingLeft: 10}}>
			<IonButtons style={{display: "inline-block"}}>
				<IonBackButton defaultHref="home" text="" icon={arrowBackOutline} />
			</IonButtons>
			<div style={{display: "inline-block", marginLeft: 10, maxWidth: "85%"}}>
				<IonCardTitle style={{fontSize: "1.2em"}}>Total Cards (100/100)</IonCardTitle>
				<IonCardSubtitle style={{fontWeight: "normal", textTransform: "inherit"}}>Finish all cards or press back to reshuffle</IonCardSubtitle>
			</div>
		</IonToolbar>
		<IonContent scrollEvents={false}>
			<div className="container">
				<IonCard style={{backgroundColor: "#b7b0ff", height: "80vh"}}>
					<IonCardContent>
						<IonCardTitle>Card Title asda sdas da sdsa da sd asd as das das da sd asd as das das da sd asd as das ds ad asd asd asd</IonCardTitle>
					</IonCardContent>	
				</IonCard>
			</div>
		</IonContent>
	</IonPage>
	);
};

export default Play;