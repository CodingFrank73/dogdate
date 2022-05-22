import { keys } from "@mui/system";
import SuggestionCard from "./SuggestionCard";

const SuggestionsStaple = (props) => {
    return (
        <>
            {props.suggestions.map((suggestion, i) => <SuggestionCard suggestion={suggestion} wert={i} />)}
        </>
    );
}

export default SuggestionsStaple;