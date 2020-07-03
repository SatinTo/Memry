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
				show_toast: action.show_toast,
				toast_message:  action.toast_message
			});
		case "SET_COLLECTION":
			return Object.assign({}, state, {
				collection: action.value,
				collection_length: action.value.length,
				show_toast: action.show_toast,
				toast_message:  action.toast_message
			});
		case "SHOW_TOAST":
			return Object.assign({}, state, {
				show_toast: true,
				toast_message: action.value
			})
		case "HIDE_TOAST":
			return Object.assign({}, state, {
				show_toast: false,
				toast_message: null
			})
		default:
			return state;
	}
}

export default function GlobalStore(props){
	const [state, dispatch] = useReducer(globalReducer, {
		items: [],
		items_length: 0,
		collection: [],
		collection_length: 0,
		show_toast: false,
		toast_message: null
	});

	return (
		<GlobalContext.Provider value={{state, dispatch}}>
			{props.children}
			<IonToast
				isOpen={state.show_toast}
				onDidDismiss={() => dispatch({type: "HIDE_TOAST"})}
				message={state.toast_message}
				duration={500}
			/>
		</GlobalContext.Provider>
	);
};
