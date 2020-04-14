import {
	IonContent,
	IonPage,
	IonToolbar,
	IonIcon,
	IonHeader,
	IonRow
} from "@ionic/react";
import React from "react";
import {calendarOutline, folderOpenSharp, settingsOutline} from 'ionicons/icons';
import CollectionItems from '../components/CollectionItems';

const Collections = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<div slot="start" style={{ width: "80px", backgroundColor: "#FDD9A2", height: "28px", borderRadius: "5px 10px 10px 5px", marginLeft: "10px"}}>
						<IonIcon icon={calendarOutline} style={{width: "2rem", height: "27px", color: "#D78203", float:"left"}}/>
						<span style={{float:"left", padding: "6px", marginLeft: "10px", fontWeight: "bold", color:"#D78203"}}>10</span>
					</div>
					<div style={{ width: "80px", backgroundColor: "#B0E7FF", height: "28px", borderRadius: "5px 10px 10px 5px", marginLeft: "10px"}}>
						<IonIcon icon={folderOpenSharp} style={{width: "2rem", height: "27px", color: "#236B8A", float:"left"}}/>
						<span style={{float:"left", padding: "6px", marginLeft: "10px", fontWeight: "bold", color:"#236B8A"}}>4 </span>
					</div>
					<IonIcon icon={settingsOutline} slot="end" style={{width: "30px", height:"30px", color:"#CCCCCC"}}/>
				</IonToolbar>
			</IonHeader>
			<IonContent scrollEvents={false}>
				<div style={{padding: "0 20px"}}>
					<IonRow>
						<CollectionItems />
						<CollectionItems />
						<CollectionItems />
						<CollectionItems />
					</IonRow>
				</div>
			</IonContent>
		</IonPage>

	);
};

export default Collections;