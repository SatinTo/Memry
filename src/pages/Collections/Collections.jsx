import {IonContent, IonPage, IonToolbar, IonIcon, IonHeader, IonRow, IonCol, IonCardContent, IonCardTitle, IonFabButton, IonLabel, IonItem, IonPopover, IonList} from "@ionic/react";
import React, { useState, useContext } from "react";
import {folderOpenSharp, settingsOutline,addSharp} from 'ionicons/icons';
import Indicator from "../../components/Indicator";
import { GlobalContext } from '../../context/GlobalStore'; 
import RenderCollections from "../../components/RenderCollections/RenderCollections";
import { formatNumber } from "../../vanilla/NumberFormatter";
import useNewCollectionPrompt from "./useNewCollectionPrompt";
import useClearCollectionPrompt from "./useClearCollectionPrompt";

const Collections = () => {
	const [showPopover, setShowpopover] = useState({event: null, status: false});
	const {state: {collection_length}} = useContext(GlobalContext);

	const newCollection = useNewCollectionPrompt();
	const clearCollection = useClearCollectionPrompt(setShowpopover);

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
						<Indicator style={{backgroundColor: "#B0E7FF", color: "#236B8A"}} icon={folderOpenSharp} label={formatNumber(collection_length)} />
					</div>
					
					<IonFabButton 
						slot="end" 
						style={{"--background": "none", boxShadow: "none", "--border-color": "none", "--box-shadow": "none", width: "25px", height:"25px", "--background-activated": "none"}}
						disabled={(collection_length < 1 ?"true": "false")}
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
						<RenderCollections />
						{/* Add Button */}
						<IonCol size="12">
							<div style={{boxShadow: "none", paddingBottom: "50%", height: 0, border: "4px dashed #B0E7FF", borderRadius: "10px", position: "relative"}}>
								<div style={{ borderRadius: "10px", display: "inline-block", margin: "auto", height: "inherit"}}>
									<IonCardContent className="container" style={{paddingLeft: 0, paddingRight: 0}} onClick={newCollection} >
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
						onClick={clearCollection}
					>
						<IonLabel style={{fontSize: "14px"}}>Reset Workspace</IonLabel>
					</IonItem>
					<IonItem>
						<IonLabel style={{fontSize: "14px"}}>Coming soon...</IonLabel>
					</IonItem>
				</IonList>
			</IonPopover>

		</IonPage>
	);
};

export default Collections;