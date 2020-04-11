import {
	IonContent,
	IonPage,
	IonToolbar,
	IonButton,
	IonFooter
} from "@ionic/react";
import React from "react";

const Home = (props) => {
	const currentYear = new Date().getFullYear();

	return (
		<IonPage>
			<IonContent scrollEvents={false}>
				<div className="container">
					<h1 style={{color: "#63a0fc", fontSize: "2.3em"}}><b>M</b>emry</h1>
					<div>
						<IonButton>
							<span 
								style={{padding:"10px 20px"}} 
								className="textButton" 
								onClick={() => props.history.push("/play")}
							>
								Play
							</span>
						</IonButton>
						<IonButton fill="outline">
							<span 
								className="textButton"
								onClick={() => props.history.push("/setItems")}
								>
								Set Items
							</span>
						</IonButton>
					</div>
				</div>
			</IonContent>
			<IonFooter>
				<IonToolbar style={{textAlign:"center", color:"#9f9f9f"}}>
					DatosAnalyticos &copy; {currentYear}
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default Home;
