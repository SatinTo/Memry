import React, {createContext, useReducer} from 'react';
import { IonToast } from '@ionic/react';

export const GlobalContext = createContext({});

function globalReducer(state, action) {
	switch (action.type) {
		case "SET_ITEMS":
			const value_param = action.value;

			return Object.assign({}, state, {
				items: value_param,
				items_length: value_param.length,
				toast_visible: action.toast_visible,
				toast_message:  action.toast_message
			});
		case "SET_COLLECTION":
			return Object.assign({}, state, {
				collection: action.value,
				collection_length: action.value.length,
				toast_visible: action.toast_visible,
				toast_message:  action.toast_message
			});
		case "SHOW_TOAST":
			return Object.assign({}, state, {
				toast_visible: true,
				toast_message: action.value
			});
		case "HIDE_TOAST":
			return Object.assign({}, state, {
				toast_visible: false,
				toast_message: null
			});

		case "SHOW_PROMPT":
			return Object.assign({}, state, {
				prompt_visible: true,
				prompt_header: action.header,
				prompt_inputs: action.inputs,
				prompt_buttons: [
					state.prompt_cancel,
					{
						text: 'Ok',
						handler: action.onOkay
					}
				]	
			});
		case "HIDE_PROMPT":
			return Object.assign({}, state, {
				prompt_visible: false,
				prompt_header: null,
				prompt_inputs: [],
				prompt_buttons: []	
			});
		default:
			return state;
	}
}

export default function GlobalStore(props){
	const [state, dispatch] = useReducer(globalReducer, {
		// Collection States:
		collection: [],
		collection_length: 0,
		// Card Item States:
		items: [],
		items_length: 0,
		// Global Toast States:
		toast_visible: false,
		toast_message: null,
		// Global Prompt States:
		prompt_visible: false,
		prompt_header: null,
		prompt_inputs: [],
		prompt_buttons: [],
		// static Global Prompt States
		prompt_cancel: {
			text: 'Cancel',
			role: 'cancel',
			cssClass: 'secondary',
			handler: () => dispatch({type: "HIDE_PROMPT"})
		}
	});

	return (
		<GlobalContext.Provider value={{state, dispatch}}>
			{props.children}
			<IonToast
				isOpen={state.toast_visible}
				onDidDismiss={() => dispatch({type: "HIDE_TOAST"})}
				message={state.toast_message}
				duration={500}
			/>
		</GlobalContext.Provider>
	);
};
