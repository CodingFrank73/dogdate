

const LikesCard = (props) => {
   
    return (     
        <>
            <img src={`dogs/${props.like.dogName}.png`} alt="dog pic" />
            <div className="dogName">{props.like.dogName}</div>
            <div className="">{props.like.gender}</div>
        </>
    
     );
}
 
export default LikesCard;