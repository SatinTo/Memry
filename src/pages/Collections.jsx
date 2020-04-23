import {
	IonContent,
	IonPage,
	IonToolbar,
	IonIcon,
	IonHeader,
	IonRow,
	IonCol,
	IonCardContent,
	IonCardTitle
} from "@ionic/react";
import React from "react";
import {calendarOutline, folderOpenSharp, settingsOutline,addSharp} from 'ionicons/icons';
import CollectionItems from '../components/CollectionItems';
import Indicator from "../components/Indicator";

const Collections = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<div slot="start" >
						<Indicator style={{backgroundColor: "#FDD9A2", color: "#D78203"}} icon={calendarOutline} label="10" />
						<Indicator style={{backgroundColor: "#B0E7FF", color: "#236B8A"}} icon={folderOpenSharp} label="4" />
					</div>
					<IonIcon icon={settingsOutline} slot="end" style={{width: "20px", height:"20px", color:"#CCCCCC"}}/>
				</IonToolbar>
			</IonHeader>
			<IonContent scrollEvents={false}>
				<div style={{padding: "0 20px"}}>
					<IonRow>
						<CollectionItems />
						<CollectionItems />
						<CollectionItems />
						<CollectionItems />
						<CollectionItems />
						{/* Add Button */}
						<IonCol size="6">
							<div style={{boxShadow: "none", paddingBottom: "56%", height: 0, border: "4px dashed #B0E7FF", borderRadius: "10px", position: "relative"}}>
								<div style={{ borderRadius: "10px", display: "inline-block", margin: "auto", height: "inherit"}}>
									<IonCardContent className="container">
										<IonCardTitle style={{fontSize: "12px", color: "#B0E7FF"}}>
											<IonIcon icon={addSharp} style={{height: "50px", width: "50px"}}/>
											<div style={{fontSize: "13px"}}>New Collection</div>
										</IonCardTitle>
									</IonCardContent>
								</div>
							</div>
						</IonCol>
					</IonRow>
				</div>
			</IonContent>
		</IonPage>

	);
};

export default Collections;