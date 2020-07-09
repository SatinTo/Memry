import {
	IonCardContent,
	IonCol,
	IonCardTitle,
	IonIcon,
	IonRippleEffect
} from "@ionic/react";
import React from "react";
import { addSharp, albumsOutline} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { handleButtonRelease, handleButtonPress } from "../vanilla/mouseHold";
import { formatNumber } from "../vanilla/NumberFormatter";
import { PageRoutes } from "../vanilla/PageRoutes";

const CollectionItems = ({ id, name, callBack }) => {
	const history = useHistory();
	
	let fontSize = 12;
	let revisedName = name;

	if (name.length > 13 && name.length <= 15){
		fontSize = fontSize - 1;
	} else if (name.length === 16) {
		fontSize = fontSize - 2;
	} else if (name.length > 16) {
		fontSize = fontSize - 2;
		revisedName = name.substr(0, 12) + "...";
	} else {
		fontSize = 12;
		revisedName = name;
	}

	return (
		<IonCol size="12">
			<div 
				className="ion-activatable ripple-parent" 
				style={{boxShadow: "none", paddingBottom: "56%", height: 0, backgroundColor: "#B0E7FF", borderRadius: "10px", position: "relative"}}
				onTouchStart = {() => handleButtonPress(callBack, id)}
				onTouchEnd = {handleButtonRelease}
				onMouseDown={() => handleButtonPress(callBack)}
				onMouseUp= {handleButtonRelease}
				onMouseLeave = {handleButtonRelease}
				onClick = {() => {
					history.push(`${PageRoutes.card_list}/${id}`);
				}}
			>
				<div style={{display: "inline-block", margin: "auto", height: "inherit"}}>
					<IonCardContent className="container">
						<IonCardTitle style={{fontSize: fontSize, color: "#236B8A"}}>
							{revisedName}
						</IonCardTitle>
					</IonCardContent>
					<div style={{display: "flex", position: "absolute", width: "100%", bottom: "10px"}}>
						<div style={{ display: "flex", padding: "1px", paddingRight: "20px", background: "#E5E5E5", marginLeft: "4px", borderRadius: "15px", color:"#575757", position: "relative", zIndex: "2", width: "calc(100% - 100px)"}}>
							<div style={{marginTop: "2px", marginLeft: "2px"}}>
								<IonIcon icon={addSharp} style={{fontSize: "10px", float: "left", fontWeight: "bold"}}/>
								<span style={{fontSize:"10px", lineHeight: "10px", float: "left"}}>MemPoints: 10%</span>
							</div>
							<div style={{position: "absolute", backgroundColor: "#DD6363", width: "50%", height: "88%", borderRadius: "5px", zIndex: "-1"}}></div>
						</div>
						<div style={{display: "flex", marginLeft: "auto", backgroundColor: "#B7B0FF", padding: "2px", borderRadius: "8px 0 0 8px", color: "#656290"}}>
							<IonIcon icon={albumsOutline} style={{fontSize: "12px", paddingLeft: "4px"}} />
							<span style={{fontSize:"10px", paddingLeft: "4px"}}>{formatNumber(12356)} </span>
						</div>
					</div>
				</div>
				<IonRippleEffect type="inbound"></IonRippleEffect>
			</div>
		</IonCol>
	)
}

export default CollectionItems
