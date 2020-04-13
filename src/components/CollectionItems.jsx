import {
	IonContent,
	IonPage,
	IonToolbar,
	IonIcon,
	IonHeader,
	IonRow,
	IonCard,
	IonCardContent,
	IonCol,
	IonCardTitle
} from "@ionic/react";
import React from "react";
import {calendarOutline, folderOpenSharp, settingsOutline} from 'ionicons/icons';

const CollectionItems = () => {
	return (
		<IonCol size="6">
			<div style={{height: "20vh", boxShadow: "none"}}>
				<div className="card__face card__face--front" style={{ borderRadius: "10px", display: "inline-block", width: "calc(100% - 10px)", margin: "auto", height: "inherit"}}>
					<IonCardContent className="container">
						<IonCardTitle style={{fontSize: "10px"}}>
							Collection 1
						</IonCardTitle>
					</IonCardContent>
				</div>
			</div>
		</IonCol>
	)
}

export default CollectionItems
