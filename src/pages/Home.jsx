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
				<h1 style={{color: "#63a0fc", fontSize: "2.3em"}}><b>M</b>emry</h1>
				<div>
					<IonButton>
						<span style={{padding:"10px 20px"}} className="textButton">Play</span>
					</IonButton>
					<IonButton fill="outline">
						<span className="textButton">Set Items</span>
					</IonButton>
				</div>
			</div>	
		</IonContent>
	</IonPage>
  );
};

export default Home;
