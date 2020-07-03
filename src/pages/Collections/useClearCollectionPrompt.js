import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalStore';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const useClearCollectionPrompt = (setShowpopover) => {
	const {dispatch} = useContext(GlobalContext);

	return 	function (){
		return dispatch({
			type: "SHOW_PROMPT",
			header: "Remove All Collections",
			message: "Are you sure you want to remove all collections?",

			onOkay: async () => {
				// Delete all Workspace
				Storage.clear();

				const collections =  Storage.get({key: 'collections'});
				const newCollectionJSON = (collections.value === "undefined" || !collections.hasOwnProperty || !collections.value) ? [] : collections.value

				dispatch({type: "SET_COLLECTION", value: newCollectionJSON, toast_visible: true, toast_message: "All Collections are successfully removed."});
				setShowpopover({event: null, status: false});
			}
		})
	}
}

export default useClearCollectionPrompt;