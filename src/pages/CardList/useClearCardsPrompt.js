import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalStore';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const useClearCardsPrompt = (collectionId) => {
	const {dispatch} = useContext(GlobalContext);

	return function (){
		return dispatch({
			type: "SHOW_PROMPT",
			header: "Clear Cards",
			message: "Are you sure you want to remove all cards?",

			onOkay: async () => {
				// Delete all Card Items
				Storage.remove({key: collectionId});
		
				const oldItems = Storage.get({ key: collectionId });
				const newItemsJson = (oldItems.value === "undefined" || !oldItems.hasOwnProperty || !oldItems.value) ? [] : oldItems.value;
				
				dispatch({
					type: "SET_ITEMS",
					value: newItemsJson,
					toast_visible: true,
					toast_message: "All Items are successfully removed!"
				});
			}
		})
	}
};

export default useClearCardsPrompt;