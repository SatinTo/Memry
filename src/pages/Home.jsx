import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton
} from "@ionic/react";
import React from "react";
import "./Home.css";

const Home = () => {
  return (
	<IonPage>
		<IonContent scrollEvents={false}>
			<div className="container">
				<h1>Memry</h1>
				<div>
					<IonButton>Play</IonButton>
					<IonButton fill="outline">Set Items</IonButton>
				</div>
			</div>
		</IonContent>
	</IonPage>
  );
};

export default Home;
