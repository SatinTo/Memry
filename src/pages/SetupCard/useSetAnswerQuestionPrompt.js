import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalStore';

const useSetAnswerQuestionPrompt = (card_is_flipped, callback) => {
	const {dispatch} = useContext(GlobalContext);

	const SIDE_TYPE = card_is_flipped ? "Answer" : "Question";

	return function(){
		dispatch({
			type: "SHOW_PROMPT",
			header: `Put ${SIDE_TYPE}`,
			inputs: [
				{
					name: SIDE_TYPE,
					type: 'text',
					placeholder: `Enter your ${SIDE_TYPE} here...`
				}
			],
			onOkay: async (data) => {
				let inputData = data[SIDE_TYPE];
				inputData = inputData.replace(/\s/g, ""); // Remove all spaces
				
				if (inputData.length < 1){
					dispatch({type: "SHOW_TOAST", value: `Oooppss! The ${SIDE_TYPE} field is empty.`});
					return;
				}

				callback(data[SIDE_TYPE]);
			}
		})
	}
};

export default useSetAnswerQuestionPrompt;