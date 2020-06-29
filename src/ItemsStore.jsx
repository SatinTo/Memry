import React, {createContext, useReducer} from 'react';

export const ItemsContext = createContext({});

function itemReducer(state, action) {
	switch (action.type) {
		case "SET_ITEMS":
			return Object.assign({}, state, {items: action.value, items_length: action.value.length});
		case "SET_COLLECTION":
			return Object.assign({}, state, {collection: action.value, collection_length: action.value.length});
		default:
			return state;
	}
}

export default function ItemsStore(props){
	const [state, dispatch] = useReducer(itemReducer, {
		items: [],
		items_length: 0,
		collection: [],
		collection_length: 0
	});

	return (
		<ItemsContext.Provider value={{state, dispatch}}>{props.children}</ItemsContext.Provider>
	);
};
