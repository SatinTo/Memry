import {
	IonContent,
	IonPage,
	IonToolbar,
	IonIcon,
	IonHeader,
	IonRow,
	IonCol,
	IonCardContent,
	IonCardTitle,
	IonFabButton,
	IonAlert,
	IonLabel,
	IonItem,
	IonPopover,
	IonList
} from "@ionic/react";
import React, { useState } from "react";
import {calendarOutline, folderOpenSharp, settingsOutline,addSharp} from 'ionicons/icons';
import CollectionItems from '../components/CollectionItems';
import Indicator from "../components/Indicator";

const Collections = () => {
	const [showPopover, setShowpopover] = useState({event: null, status: false});
	const [isAlertVisible, setAlertVisible] = useState(false);
	

	const alertProps = {
		isOpen: isAlertVisible,
		onDidDIsmiss: () => setAlertVisible(false),
		header: "Collection Title",
		inputs: [{
			name: "Title",
			type: "text",
			placeholder: "Enter your Collection title here..."
		}],
		buttons: [
			{
				text: "Cancel",
				role: "Cancel",
				cssClass: "secondary",
				handler: () => setAlertVisible(false)
			},
			{
				text: "Ok",
				handler: (data) => {
					console.log(data)
				}
			}
		]
	}

	const popoverProps = {
		isOpen: showPopover.status,
		onDidDismiss: () => setShowpopover({ event: null, status: false}),
		event: showPopover.event,
		showBackdrop: "true",
		mode: 'ios',
		translucent: true
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<div slot="start" >
						<Indicator style={{backgroundColor: "#FDD9A2", color: "#D78203"}} icon={calendarOutline} label="10" />
						<Indicator style={{backgroundColor: "#B0E7FF", color: "#236B8A"}} icon={folderOpenSharp} label="4" />
					</div>
					
					<IonFabButton 
						slot="end" 
						style={{"--background": "none", boxShadow: "none", "--border-color": "none", "--box-shadow": "none", width: "25px", height:"25px", "--background-activated": "none"}}
						onClick={
							(e) => {
								e.persist();
								setShowpopover({event: e, status: true})
							}
						}
					>
						<IonIcon 
							icon={settingsOutline} 
							style={{width: "20px", height:"20px", color:"#CCCCCC"}} 
						/>

					</IonFabButton>
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
							<div style={{boxShadow: "none", paddingBottom: "50%", height: 0, border: "4px dashed #B0E7FF", borderRadius: "10px", position: "relative"}}>
								<div style={{ borderRadius: "10px", display: "inline-block", margin: "auto", height: "inherit"}}>
									<IonCardContent 
										className="container" 
										style={{paddingLeft: 0, paddingRight: 0}}
										onClick={() => setAlertVisible(true)}
									>
										<IonCardTitle style={{fontSize: "12px", color: "#B0E7FF"}}>
											<IonIcon icon={addSharp} style={{height: "40px", width: "40px"}}/>
											<h1 style={{fontSize: "13px"}}>New Collection</h1>
										</IonCardTitle>
									</IonCardContent>
								</div>
							</div>
						</IonCol>
					</IonRow>
				</div>
			</IonContent>

			<IonPopover {...popoverProps}>
				<IonList>
					<IonItem
						detail={false}
						button
						style={{"--background-activated": "#007EFF", "--color-activated": "#007EFF"}}
					>
						<IonLabel style={{fontSize: "14px"}}>Reset Workspace</IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel style={{fontSize: "14px"}}>Coming soon...</IonLabel>
					</IonItem>
				</IonList>
			</IonPopover>
			<IonAlert {...alertProps}/>

		</IonPage>
	);
};

export default Collections;