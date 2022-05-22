import { keys } from "@mui/system";
import SuggestionCard from "./SuggestionCard";

const SuggestionsStaple = (props) => {
    return (
        <div className="home-doggy-bigpic">
            {props.suggestions.map((suggestion, i) => <SuggestionCard suggestion={suggestion} wert={i} />)}
        </div>
    );
}

export default SuggestionsStaple;