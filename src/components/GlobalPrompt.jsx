import React, { useContext } from 'react';
import { IonAlert } from '@ionic/react';
import { GlobalContext } from '../context/GlobalStore';

const GlobalPrompt = () => {
	const {states: {prompt_visible, prompt_header, prompt_inputs, prompt_buttons}, dispatch} = useContext(GlobalContext);

	return (
		<IonAlert 
			isOpen={prompt_visible}
			onDidDismiss={() => dispatch({type: "HIDE_PROMPT"})}
			header={prompt_header}
			inputs={prompt_inputs}
			buttons={prompt_buttons}
		/>
	);
};

export default GlobalPrompt;