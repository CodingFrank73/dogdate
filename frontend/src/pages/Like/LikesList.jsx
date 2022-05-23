import LikesCard from "./LikesCard";


const LikesList = (props) => {
    return (        
        <>
            {props.likesArr.map((like, i) => <LikesCard like={like} wert={i} />)}
        </>
     );
}
 
export default LikesList;