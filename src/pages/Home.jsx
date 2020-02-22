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

const headerCss = {
	color: "#63a0fc",
	fontSize: "2.3em"
}

const Home = () => {
  return (
	<IonPage>
		<IonContent scrollEvents={false}>
			<div className="container">
				<h1 style={headerCss}><b>M</b>emry</h1>
				<div>
					<IonButton>
						<span style={{padding:"10px 20px", fontSize: "1.2em"}}>Play</span>
					</IonButton>
					<IonButton fill="outline">
						<span style={{fontSize: "1.2em"}}>Set Items</span>
					</IonButton>
				</div>
			</div>	
		</IonContent>
	</IonPage>
  );
};

export default Home;
