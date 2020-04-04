import React, {createContext, useReducer} from 'react';
import { logoWindows } from 'ionicons/icons';

export const ItemsContext = createContext({});

function itemReducer(state, action) {
	switch (action.type) {
		case "SET_ITEMS":
			return { ...state, items: action.value};
		case "DELETE_ALL":
			return { ...state, items: window.localStorage.clear()}
		default:
			return state;
	}
}

export default function ItemsStore(props){
	const [state, dispatch] = useReducer(itemReducer, {
		items: []
	});

	return (
		<ItemsContext.Provider value={{state, dispatch}}>{props.children}</ItemsContext.Provider>
	);
};
