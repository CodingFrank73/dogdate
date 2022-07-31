import LikeCard from "./LikeCard";

const LikeList = (props) => {

    return (
        <div className="likeList">
            {props.likesArr.map((like, i) =>
                <LikeCard
                    like={like}
                    wert={i}
                    token={props.token}
                    profileImage={props.profileImage}
                />)}
        </div>
    );
}

export default LikeList;