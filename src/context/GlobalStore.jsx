import React, {createContext, useReducer} from 'react';

export const GlobalContext = createContext({});

function globalReducer(state, action) {
	switch (action.type) {
		case "SET_ITEMS":
			return Object.assign({}, state, {items: action.value, items_length: action.value.length});
		case "SET_COLLECTION":
			return Object.assign({}, state, {collection: action.value, collection_length: action.value.length});
		default:
			return state;
	}
}

export default function GlobalStore(props){
	const [state, dispatch] = useReducer(globalReducer, {
		items: [],
		items_length: 0,
		collection: [],
		collection_length: 0
	});

	return (
		<GlobalContext.Provider value={{state, dispatch}}>{props.children}</GlobalContext.Provider>
	);
};
