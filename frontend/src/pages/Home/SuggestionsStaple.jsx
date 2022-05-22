import { keys } from "@mui/system";
import SuggestionCard from "./SuggestionCard";

const SuggestionsStaple = (props) => {
    return (
        <div>
            {props.suggestions.map((suggestion, i) => <SuggestionCard suggestion={suggestion} wert={i} />)}
        </div>
    );
}

export default SuggestionsStaple;