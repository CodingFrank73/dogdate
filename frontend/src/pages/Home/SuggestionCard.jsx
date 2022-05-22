
const SuggestionCard = (props) => {
    const x = props.wert + 2

    return (
        <div id={`dog-id${x}`} className={`dog-wrapper01`} style={{ zIndex: `${x}` }}>
            <img src={`dogs/${props.suggestion.dogName}.png`} alt="dog pic" />
            <div className="dogName">{props.suggestion.dogName}, {props.suggestion.age}</div>
            <div className="distanceKM">{props.suggestion.maxDistance} km</div>
        </div>

    );
}

export default SuggestionCard;
