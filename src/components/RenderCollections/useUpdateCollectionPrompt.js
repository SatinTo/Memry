import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalStore';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const useUpdateCollectionPrompt = (targetId) => {
	const {dispatch} = useContext(GlobalContext);

	return function (){
		return dispatch({
			type: "SHOW_PROMPT",
			header: "Edit Collection",
			inputs: [
				{
					name: 'title',
					type: 'text',
					placeholder: 'Enter your collection title here...'
				}
			],

			onOkay: async (data) => {
				// Edit Workspace
				const collectionID = targetId;
				const newCollectionTitle = data.title;

				const collections = await Storage.get({ key: 'collections' });
				const collectionJSON = (!collections.value || collections.value === "undefined" || !collections.hasOwnProperty) ? [] : 
				JSON.parse(collections.value)
				
				let updatedCollections;

				if ( collectionID !== "undefined") {
					collectionJSON[collectionID].name = newCollectionTitle;
					updatedCollections = collectionJSON;
				}

				await Storage.set({ key: 'collections', value: JSON.stringify(updatedCollections)});
				dispatch({ type: "SET_COLLECTION", value: updatedCollections, toast_visible: true, toast_message: "Collection is successfully saved."});
			}
		})
	}
};

export default useUpdateCollectionPrompt;