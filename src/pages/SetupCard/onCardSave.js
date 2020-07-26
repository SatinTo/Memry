import { Plugins } from '@capacitor/core';
import { PageRoutes } from '../../vanilla/PageRoutes';
const { Storage } = Plugins;

export function onCardSave({cardDetail, id, collectionID, dispatch, history}) {
	return async () => {
		
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

		dispatch({type: "SET_ITEMS", value: updatedItems, toast_visible: true, toast_message: "The item is successfully saved"});
		history.push(`${PageRoutes.card_list}/${collectionID}`);
	}
}