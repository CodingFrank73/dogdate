
const SuggestionCard = (props) => {
    console.log("Propos in SuggestionCard: ", props)
    const x = props.wert + 1

    return (
        <div>
            <div id={`dog-id${x}`} className={`dog-wrapper${props.wert}`} style={{ zIndex: `${x}` }}>
                <img src={`dogs/${props.suggestion.dogName}.png`} alt="dog pic" />
                <div className="dogName">{props.suggestion.dogName}, {props.suggestion.age}</div>
                <div className="distanceKM">{props.suggestion.maxDistance} km</div>
            </div>
        </div >
    );
}

export default SuggestionCard;