import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalStore';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const useRemoveCollectionPrompt = (targetId) => {
	const {dispatch} = useContext(GlobalContext);

	return function (){
		return dispatch({
			type: "SHOW_PROMPT",
			header: "Delete Collection",
			message: "Are you sure you want to remove this collections?",

			onOkay: async () => {
				// Delete workspace
				const collections = await Storage.get({key: 'collections'});
				const newCollectionJSON = (collections.value) ? JSON.parse(collections.value) : [];
				const filteredCollections = newCollectionJSON.filter((e, i) => String(i) !== String(targetId));
				Storage.remove({key: targetId});
				Storage.set({key: 'collections', value: JSON.stringify(filteredCollections)});
				dispatch({type: "SET_COLLECTION", value: filteredCollections, toast_visible: true, toast_message: "Collection is successfully removed."});
			}
		})
	}
};

export default useRemoveCollectionPrompt;