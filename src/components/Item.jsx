import {
	IonCardTitle,
	IonCardContent,
	IonCard,
	IonCol,
	IonCardHeader,
	IonCardSubtitle
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";

const Item = ({id, data}) => {
	const history = useHistory();

	return (
		<IonCol size="6">
			<IonCard style={{height: "40vh", boxShadow: "none", margin: 0}}
			onClick={() => {history.push("/crudCard/" + id )}}>
				<div className="card__face card__face--front" style={{ width: "100%", borderRadius: "10px", display: "inline-block"}}>
					<IonCardHeader>
						<IonCardSubtitle>Card Subtitle</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent className="container">
						<IonCardTitle style={{fontSize: "10px"}}>
							Who is the most handsome in your workspace?
						</IonCardTitle>
					</IonCardContent>
				</div>
			</IonCard>
		</IonCol>
	);
}

export default Item;