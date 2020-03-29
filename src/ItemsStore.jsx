import React, {createContext, useReducer} from 'react';

export const ItemsContext = createContext({});

function itemReducer(state, action) {
	switch (action.type) {
		case "SET_ITEMS":
			return { ...state, items: action.value}
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
