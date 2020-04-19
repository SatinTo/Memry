import {
	IonCardTitle,
	IonCardContent,
	IonCard,
	IonCol,
	IonIcon,
	IonFabButton,
	IonRippleEffect
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import {ellipsisVertical, refreshOutline} from 'ionicons/icons';

const Item = ({id, data}) => {
	const history = useHistory();

	return (
		<IonCol size="6">
			<IonCard className="ion-activatable ripple-parent" style={{boxShadow: "none", margin: 0, paddingBottom: "152%"}}
			onClick={() => {history.push("/crudCard/" + id )}}>
				<div className="card__face card__face--front" style={{ width: "100%", borderRadius: "5px", display: "inline-block"}}>
					<div style={{float: "right", paddingTop: "7px"}}>
						<IonIcon icon={ellipsisVertical} style={{height: "20px", width: "20px", color: "#000"}}/>
					</div>
					<IonCardContent className="container">
						<IonCardTitle style={{fontSize: "13px", color: "#656290", lineHeight: "15px"}}>
							Who is the most handsome in your workspace?
						</IonCardTitle>
					</IonCardContent>
					<div style={{position: "absolute", bottom: "9px", left: "9px"}}>
						<IonFabButton style={{width: "20px", height:"20px", "--background": "#97FFF3"}}>
							<IonIcon icon={refreshOutline} style={{width: "12px", height:"12px"}} />
						</IonFabButton>
					</div>
				</div>
				<IonRippleEffect type="inbound"></IonRippleEffect>
			</IonCard>
		</IonCol>
	);
}

export default Item;