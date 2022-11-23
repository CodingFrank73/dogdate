import { useState } from "react"
import { useNavigate } from "react-router-dom";
import apiBaseUrl from "../../api"

const LikesCard = (props) => {
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const makeLikeToMatch = async (idUserA) => {
    try {
      const response = await fetch(apiBaseUrl + '/api/like/updateLikeToMatch', {
        method: "PUT",
        headers: {
          token: "JWT " + props.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idUserA })
      })
      const result = await response.json()

      if (!result.err) {
        navigate('/match', {
          state: {
            dogName: props.like.dogName,
            profileImage: props.like.profileImage,
            myImage: props.profileImage
          }
        })
        return
      }

      if (result.err.validationErrors) {
        const firstError = result.err.validationErrors[0];
        setError(firstError.msg + ":" + firstError.param);
        return
      }

    } catch (error) {
      console.log("error..............");
    }
  }

  return (
    <div>
      <div onClick={e => makeLikeToMatch(props.like._id)} className="likeCard">
        <img src={props.like.bigImage} alt="dog pic" />
        <div className="likeDogname">{props.like.dogName}</div>
      </div>
    </div >
  );
}

export default LikesCard;