import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalStore';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;


const useNewCollectionPrompt = () => {
	const {dispatch} = useContext(GlobalContext);
	
	return function(){
		dispatch({
			type: "SHOW_PROMPT",
			header: "Collection Title",
			inputs: [{
				name: "Title",
				type: "text",
				placeholder: "Enter your Collection title here..."
			}],
			onOkay: async (data) => {
				// Creates new Workspace
				const title = data.Title;
				title.replace(/\s/g, "");
				
				if (title.length < 1){
					dispatch({ type: "SHOW_TOAST", value: "Oooppss! The title should not be empty."})
					return false;
				}
	
				const collections = await Storage.get({ key: 'collections' });
				const collectionsJson = (!collections.value || collections.value === "undefined" || !collections.hasOwnProperty) ? [] : JSON.parse(collections.value);
	
				const newCollections = [
					...collectionsJson,
					{name: title}
				];
	
				await Storage.set({
					key: 'collections',
					value: JSON.stringify(newCollections)
				});
	
				dispatch({ type: "SET_COLLECTION", value: newCollections, toast_visible: true, toast_message: "New Collection is successfully added."});
			}
		})
	}
}

export default useNewCollectionPrompt;