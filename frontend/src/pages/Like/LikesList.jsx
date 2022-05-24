import LikesCard from "./LikesCard";


const LikesList = (props) => {
    return (
        <div className="likeList">
            {props.likesArr.map((like, i) => <LikesCard like={like} wert={i} />)}
        </div>
    );
}

export default LikesList;