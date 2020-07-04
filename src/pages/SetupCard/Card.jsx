import React from 'react';
import { IonCard, IonCardContent, IonTextarea, IonCardTitle } from '@ionic/react';
import EllipsisButton from '../../components/EllipsisButton';
import ToolBar from './Toolbar';

// Card Types
const Card = {
	RateYourself: ({pageConfig, onClick, updateMode, cardDetail}) => {
		return (<>
			<IonCard style={{width: "68%", margin: "15px auto", boxShadow: "none"}}>
				<div  
					style={{height: "0", paddingBottom: "158%"}} 
					className={"card" + (pageConfig.cardFlipped ? " is-flipped" : "")} 
					onClick={onClick}
				>
					<div className="card__face card__face--front">
						<EllipsisButton callBack={()=>{}} itemID={0}/>
						<IonCardContent className="container">
							<IonCardTitle style={{color: "#656290"}}>
								{(updateMode || cardDetail.front !== null) ? cardDetail.front : <i>Put Question!</i>}
							</IonCardTitle>
						</IonCardContent>
					</div>
					<div className="card__face card__face--back">
						<EllipsisButton callBack={()=>{}} itemID={0}/>
						<IonCardContent className="container">
							<IonCardTitle style={{color: "#3D746D"}}>
								{(updateMode || cardDetail.back !== null) ? cardDetail.back : <i>Put Answer!</i>}
							</IonCardTitle>
						</IonCardContent>
					</div>
				</div>
			</IonCard>
		</>)
	},

	// Note: Not UPDATED
	TypeTheAnswer: ({pageConfig, reducer, updateMode, cardDetail, createCardProps}) => {
		return (<>
			<IonCard style={{width: "100%", margin: "15px auto", boxShadow: "none"}}>
				<div  
					style={{height: "0", paddingBottom: "68%"}} 
					className={"card" + (pageConfig.cardFlipped ? " is-flipped" : "")} 
					onClick={() => reducer({type: "SHOW_CARD_INPUT"})}
				>
					<div className="card__face">
						<EllipsisButton callBack={()=>{}} itemID={0}/>
						<IonCardContent className="container">
							<IonCardTitle style={{color: "#656290"}}>
								{(updateMode || cardDetail.front !== null) ? cardDetail.front : <i>Put Question!</i>}
							</IonCardTitle>
						</IonCardContent>
					</div>
				</div>
			</IonCard>
			<div style={{padding: "10px"}}>
				<IonTextarea 
					value={cardDetail.back}
					onIonChange={e => reducer({type: "SET_BACK_CARD", val: e.detail.value})}
					style={{
						border: "1px solid #97FFF3", 
						boxSizing: "border-box",
						boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
						borderRadius: "5px",
						padding: "0 10px"
					}}
					rows={3}
					placeholder={"Enter answer here"}
				/>
			</div>
			
			<ToolBar disabled={false} showRotate={false} misc={{pageConfig, reducer, createCardProps, updateMode}} />
		</>)
	}
};

export default Card;