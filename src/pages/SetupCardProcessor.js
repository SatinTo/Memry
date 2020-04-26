import { Plugins } from '@capacitor/core';
import { PagePath } from '../vanilla/Constants';
const { Storage } = Plugins;

export function generateAlertProps({pageConfig, reducer}){
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
						reducer({type: "SET_BACK_CARD", val: data.Answer});
					}else{
						reducer({type: "SET_FRONT_CARD", val: data.Question});
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
					
					dispatch({type: "SET_ITEMS", value: filteredItems}); //  Update the ItemsStore context;

					reducer({type: "SHOW_TOAST", val: "The Item is successfully removed!"});
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
				reducer({type: "SHOW_TOAST", val: "The front card is empty. Do not forget."});
				return;
			}
	
			if (!cardDetail.back) {
				reducer({type: "SHOW_TOAST", val: "The back card is empty. Do not forget."});
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
	
			dispatch({type: "SET_ITEMS", value: updatedItems});
	
			reducer({type: "SHOW_TOAST", val: "The Items are successfully saved."});
			reducer({type: "GO_BACK_TO_CARD_LIST"});
		},
		
		style: {float: "right", marginRight: "7px"}
	}
}


export function generateReducer({setPageConfig, pageConfig, DEFAULT_CARD_STATE, setCardDetail, cardDetail, props, collectionID}){

	return function (action){
	   switch(action.type){
			case "FLIP_CARD":
				setPageConfig({...pageConfig, cardFlipped: !pageConfig.cardFlipped});
				break;
			case "UNFLIP_CARD":
				setPageConfig({...pageConfig, cardFlipped: false});
				break;
			case "SHOW_CARD_INPUT":
				setPageConfig({...pageConfig, cardInputShown: true});
				break;
			case "HIDE_CARD_INPUT":
				setPageConfig({...pageConfig, cardInputShown: false});
				break;
			case "SHOW_DELETE_CONFIRMATION":
				setPageConfig({...pageConfig, confirmDeleteShown: true});
				break;
			case "HIDE_DELETE_CONFIRMATION":
				setPageConfig({...pageConfig, confirmDeleteShown: false});
				break;
			case "RESET_CARD":
				setCardDetail(DEFAULT_CARD_STATE);
				break;
			case "SET_CARD_DETAILS":
				setCardDetail( {...cardDetail, ...action.val} );
				break;
			case "SET_FRONT_CARD":
				setCardDetail( {...cardDetail, front: action.val} );
				break;
			case "SET_BACK_CARD":
				setCardDetail( {...cardDetail, back: action.val} );
				break;
			case "SET_CARD_TYPE":
				setCardDetail( {...cardDetail, type: action.val} );
				break;
			case "SHOW_TOAST":
				setPageConfig({
					...pageConfig,
					toast: {
						visible: true,
						message: action.val
					}
				});
				break;
			case "HIDE_TOAST":
				setPageConfig({
					...pageConfig,
					toast: {
						visible: false,
						message: null
					}
				});
				break;
			case "GO_BACK_TO_CARD_LIST":
				props.history.push(`${PagePath.card_list}/${collectionID}`);
				break;
		}
	};
}