import { Plugins } from '@capacitor/core';
import { PageRoutes } from '../../vanilla/PageRoutes';
const { Storage } = Plugins;

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