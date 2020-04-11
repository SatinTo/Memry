import {
	IonCardTitle,
	IonCardContent,
	IonCard,
	IonCol
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
					<IonCardContent className="container">
						<IonCardTitle style={{fontSize: "10px"}}>
							{data.front}
						</IonCardTitle>
					</IonCardContent>
				</div>
			</IonCard>
		</IonCol>
	);
}

export default Item;