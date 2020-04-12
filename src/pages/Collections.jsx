import {
	IonContent,
	IonPage,
	IonToolbar,
	IonIcon,
	IonHeader,
	IonRow,
	IonCard,
	IonCardContent,
	IonCol,
	IonCardTitle
} from "@ionic/react";
import React from "react";
import {calendarOutline, folderOpenSharp, settingsOutline} from 'ionicons/icons';

const Collections = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<div slot="start" style={{ width: "80px", backgroundColor: "#FDD9A2", height: "28px", borderRadius: "5px 10px 10px 5px", marginLeft: "10px"}}>
						<IonIcon icon={calendarOutline} style={{width: "2rem", height: "27px", color: "#D78203", float:"left"}}/>
						<span style={{float:"left", padding: "6px", marginLeft: "10px"}}>10</span>
					</div>
					<div style={{ width: "80px", backgroundColor: "#B0E7FF", height: "28px", borderRadius: "5px 10px 10px 5px", marginLeft: "10px"}}>
						<IonIcon icon={folderOpenSharp} style={{width: "2rem", height: "27px", color: "#236B8A", float:"left"}}/>
						<span style={{float:"left", padding: "6px", marginLeft: "10px"}}>10 </span>
					</div>
					<IonIcon icon={settingsOutline} slot="end" style={{width: "30px", height:"30px", color:"#CCCCCC"}}/>
				</IonToolbar>
			</IonHeader>
			<IonContent scrollEvents={false}>
				<div style={{padding: "0 20px"}}>
					<IonRow>
						<IonCol size="6">
							<div style={{height: "20vh", boxShadow: "none"}}>
								<div className="card__face card__face--front" style={{ borderRadius: "10px", display: "inline-block", width: "calc(100% - 10px)", margin: "auto", height: "inherit"}}>
									<IonCardContent className="container">
										<IonCardTitle style={{fontSize: "10px"}}>
											Collection 1
										</IonCardTitle>
									</IonCardContent>
								</div>
							</div>
						</IonCol>
						<IonCol size="6">
							<div style={{height: "20vh", boxShadow: "none"}}>
								<div className="card__face card__face--front" style={{ borderRadius: "10px", display: "inline-block", width: "calc(100% - 10px)", margin: "auto", height: "inherit"}}>
									<IonCardContent className="container">
										<IonCardTitle style={{fontSize: "10px"}}>
											Collection 1
										</IonCardTitle>
									</IonCardContent>
								</div>
							</div>
						</IonCol>
						<IonCol size="6">
							<div style={{height: "20vh", boxShadow: "none"}}>
								<div className="card__face card__face--front" style={{ borderRadius: "10px", display: "inline-block", width: "calc(100% - 10px)", margin: "auto", height: "inherit"}}>
									<IonCardContent className="container">
										<IonCardTitle style={{fontSize: "10px"}}>
											Collection 1
										</IonCardTitle>
									</IonCardContent>
								</div>
							</div>
						</IonCol>
						<IonCol size="6">
							<div style={{height: "20vh", boxShadow: "none"}}>
								<div className="card__face card__face--front" style={{ borderRadius: "10px", display: "inline-block", width: "calc(100% - 10px)", margin: "auto", height: "inherit"}}>
									<IonCardContent className="container">
										<IonCardTitle style={{fontSize: "10px"}}>
											Collection 1
										</IonCardTitle>
									</IonCardContent>
								</div>
							</div>
						</IonCol>
					</IonRow>
				</div>
			</IonContent>
		</IonPage>

	);
};

export default Collections;