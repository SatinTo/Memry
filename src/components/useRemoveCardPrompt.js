import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalStore';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


const useRemoveCardPrompt = (targetId, collectionId, onAfterOkay) => {
	const {dispatch} = useContext(GlobalContext);

	return function (){
		return dispatch({
			type: "SHOW_PROMPT",
			header: "Delete Card",
			message: "Are you sure you want to remove this card?",

			onOkay: async () => {
				const cardID = targetId;
				const oldItems =  await Storage.get({ key: collectionId});
				const newItems = (oldItems.value ? JSON.parse(oldItems.value) : []);

				const filteredItems = newItems.filter((e, index) => String(index) !== String(cardID));
				Storage.set({key: collectionId, value: JSON.stringify(filteredItems)});

				dispatch({
					type: "SET_ITEMS",
					value: filteredItems,
					toast_visible: true,
					toast_message: "The Item is successfully removed!"
				});

				if (typeof onAfterOkay === "function")
					onAfterOkay();
			}
		})
	}
};

export default useRemoveCardPrompt;