import { Plugins } from '@capacitor/core';
import { PageRoutes } from '../../vanilla/PageRoutes';
const { Storage } = Plugins;

export function generateAlertProps({pageConfig, reducer, dispatch}){
	return {
		isOpen: pageConfig.cardInputShown,
		onDidDismiss: () => reducer({type: "HIDE_CARD_INPUT"}),
		header: (pageConfig.cardFlipped) ? "Answer!" : "Question!",
		inputs: [
			{
				name: `${(pageConfig.cardFlipped) ? "Answer" : "Question"}`,
				type: 'text',
				placeholder: `Enter your ${(pageConfig.cardFlipped) ? "Answer" : "Question"} here...`
			}
		],
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => reducer({type: "HIDE_CARD_INPUT"})
			},
			{
				text: 'Ok',
				handler: (data) => {
					if (pageConfig.cardFlipped) {
						let answer = data.Answer;
						answer = answer.replace(/\s/g, "");

						if (answer.length < 1){
							dispatch({type: "SHOW_TOAST", value: "Oooppss! The Answer field is empty."});
							return;
						}
						reducer({type: "SET_BACK_CARD", val: answer});
					}else{
						let question = data.Question;
						question = question.replace(/\s/g, "");

						if (question.length < 1){
							dispatch({type: "SHOW_TOAST", value: "Oooppss! The Question field is empty."});
							return;
						}
						reducer({type: "SET_FRONT_CARD", val: question});
					}
				}
			}
		]
	}
}

export function generatePromptProps({pageConfig, reducer, id, dispatch, collectionID}){
	return {
		isOpen: pageConfig.confirmDeleteShown,
		onDidDismiss: () => reducer({type: "HIDE_DELETE_CONFIRMATION"}),
		header: 'Delete Card',
		message: 'Are you sure you want to remove this Card?',
		buttons: [
			{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: () => reducer({type: "HIDE_DELETE_CONFIRMATION"})
			},
			{
				text: 'Okay',
				handler: async () => {
					const oldItems = await Storage.get({ key: collectionID});
					const newItemsJson = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty)? [] : JSON.parse(oldItems.value);
					const filteredItems = newItemsJson.filter((element, index) => String(index) !== String(id));
					
					await Storage.set({key: collectionID, value: JSON.stringify(filteredItems)}); // Update the Storage by setting the filteredItems
					
					//  Update the ItemsStore context
					dispatch({type: "SET_ITEMS", value: filteredItems, toast_visible: true, toast_message: "The Item is successfully removed!"}); 
					reducer({type: "GO_BACK_TO_CARD_LIST"});
				}
			}
		]
	};
}

export function generateCardProps({cardDetail, reducer, id, collectionID, dispatch}) {
	return {
		onClick: async () => {
		
			if (!cardDetail.front){
				dispatch({type: "SHOW_TOAST", value: "The front card is empty. Do not forget."});
				return;
			}
	
			if (!cardDetail.back) {
				dispatch({type: "SHOW_TOAST", value: "The back card is empty. Do not forget."});
				return;
			}
			
			const oldItems = await Storage.get({ key: collectionID });
			const oldItemsJSON = (!oldItems.value || oldItems.value === "undefined" || !oldItems.hasOwnProperty) ? [] : JSON.parse(oldItems.value);
			
			let updatedItems;
			if (typeof id === "undefined"){
				updatedItems = [
					...oldItemsJSON,
					cardDetail
				];
			} else {
				oldItemsJSON[id] = cardDetail;
				updatedItems = oldItemsJSON;
			}
	
			await Storage.set({ key: collectionID, value: JSON.stringify(updatedItems) });
	
			dispatch({type: "SET_ITEMS", value: updatedItems, toast_visible: true, toast_message: "The Items are successfully saved."});
			reducer({type: "GO_BACK_TO_CARD_LIST"});
		},
		
		style: {float: "right", marginRight: "7px"}
	}
}


export function generateReducer({setPageConfig, pageConfig, DEFAULT_CARD_STATE, setCardDetail, cardDetail, props, collectionID}){

	return function (action){
		switch(action.type){
			case "FLIP_CARD":
				setPageConfig(
					Object.assign({}, pageConfig, {cardFlipped: !pageConfig.cardFlipped})
				);
				break;
			case "UNFLIP_CARD":
				setPageConfig(
					Object.assign({}, pageConfig, {cardFlipped: false})
				);
				break;
			case "SHOW_CARD_INPUT":
				setPageConfig(
					Object.assign({}, pageConfig, {cardInputShown: true})
				);
				break;
			case "HIDE_CARD_INPUT":
				setPageConfig(
					Object.assign({}, pageConfig, {cardInputShown: false})
				);
				break;
			case "SHOW_DELETE_CONFIRMATION":
				setPageConfig(
					Object.assign({}, pageConfig, {confirmDeleteShown: true})
				);
				break;
			case "HIDE_DELETE_CONFIRMATION":
				setPageConfig(
					Object.assign({}, pageConfig, {confirmDeleteShown: false})
				);
				break;
			case "RESET_CARD":
				setCardDetail(DEFAULT_CARD_STATE);
				break;
			case "SET_CARD_DETAILS":
				setCardDetail(
					Object.assign({}, cardDetail, action.val)
				);
				break;
			case "SET_FRONT_CARD":
				setCardDetail(
					Object.assign({}, cardDetail, {front: action.val})
				);
				break;
			case "SET_BACK_CARD":
				setCardDetail(
					Object.assign({}, cardDetail, {back: action.val})
				);
				break;
			case "SET_CARD_TYPE":
				setCardDetail(
					Object.assign({}, cardDetail, {type: action.val})
				);
				break;
			case "GO_BACK_TO_CARD_LIST":
				props.history.push(`${PageRoutes.card_list}/${collectionID}`);
				break;
			default:
				return;
		}
	};
}