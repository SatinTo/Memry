import { IonContent, IonPage, IonToolbar, IonCardTitle, IonIcon, IonRow, IonGrid, IonHeader, IonCol, IonCardContent, IonCard, IonFabButton, IonFooter } from "@ionic/react";
import React, {useContext} from "react";
import {albumsOutline, trashOutline, addSharp, arrowBackOutline} from 'ionicons/icons';
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalStore";
import { PageRoutes } from "../../vanilla/PageRoutes";
import { formatNumber } from "../../vanilla/NumberFormatter";
import RenderItems from '../../components/RenderItems/RenderItems';
import Indicator from "../../components/Indicator";
import useClearCardsPrompt from "./useClearCardsPrompt";
import ProgressBar from "./ProgressBar";
import PlayButton from "./PlayButton";

const CardList = (props) => {
	const history = useHistory();
	const context = useContext(GlobalContext);
	const {state: {items_length}} = context;
	const {collectionID} = props.match.params;

	const clearCards = useClearCardsPrompt(collectionID);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonFabButton slot="start" style={{paddingLeft: "5px", "--background": "none", boxShadow: "none", "--border-color": "none", "--box-shadow": "none", width: "25px", height:"25px", "--background-activated": "none"}} routerLink={PageRoutes.collections}>
						<IonIcon 
							icon={arrowBackOutline}
							style={{color: "#7D7D7D"}}
						/>
					</IonFabButton>
					<div slot="secondary">
						<Indicator style={{backgroundColor: "#B7B0FF", color: "#656290"}} icon={albumsOutline} label={formatNumber(items_length)}/>
						<ProgressBar label="MemPoints: 10%"/>
					</div>
					
					<IonFabButton slot="end" onClick={clearCards} disabled={(items_length < 1 ?"true": "false")} style={{"--background": "none", boxShadow: "none", "--border-color": "none", "--box-shadow": "none", width: "25px", height:"25px", "--background-activated": "none"}}>
						<IonIcon icon={trashOutline} style={{color:"#575757"}}/>
					</IonFabButton>
				</IonToolbar>
			</IonHeader>
			<IonContent scrollEvents={false}>
				<IonGrid>
					<IonRow >
						<RenderItems collectionID={collectionID}/>

						{/* Add New Card Button */}
						<IonCol size="6">
							<IonCard style={{boxShadow: "none", margin: 0, paddingBottom: "152%"}} onClick={() => {history.push(`${PageRoutes.setup_card}/${collectionID}`)}}>
								<div className="" style={{ width: "100%", borderRadius: "5px", display: "inline-block",height: "100%", border: "4px dashed #B7B0FF", position: "absolute"}}>
									<IonCardContent className="container">
										<IonCardTitle style={{color: "#B7B0FF"}}>
											<IonIcon icon={addSharp} style={{width: "50px", height: "50px"}}/>
											<h1 style={{fontSize: "13px", lineHeight: "15px"}}>Add New Card</h1>
										</IonCardTitle>
									</IonCardContent>
								</div>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<div style={{textAlign: "center", paddingTop: "5px"}}>
						<PlayButton 
							disabled={(items_length > 100 ? "false": "true")} 
							style={{"--background" : (items_length > 100 ? "#FC6363" : "rgba(252, 99, 99, 0.5)")}} 
							label="Hell"
							onClick = {() => {
								history.push(`${PageRoutes.play}/${collectionID}/2`);
							}}
						/>
						<PlayButton 
							disabled={(items_length > 30 ? "false": "true")}
							style={{"--background": (items_length > 30 ? "#FC8763": "rgba(252, 135, 99, 0.5)")}} 
							label="Hard"
							onClick = {() => {
								history.push(`${PageRoutes.play}/${collectionID}/1`);
							}}
						/>
						<PlayButton 
							style={{"--background": "#63FCC5"}} 
							label="Easy" 
							onClick = {() => {
								history.push(`${PageRoutes.play}/${collectionID}/0`);
							}}
						/>
					</div>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default CardList;