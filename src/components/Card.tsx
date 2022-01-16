import React, { useEffect } from 'react';
import '../App.css';



interface Props {
    nasaData :{
        copyright: string;
        date: string;
        explanation: string;
        hdurl: string;
        media_type: string;
        service_version: string;
        title: string;
        url: string;
    
    }

}
export default function Card(props: Props) {

    //like button state 
    const [like, setLike] = React.useState(false);
    const [cliked, setClicked] = React.useState(false);
    //like button click handler 
    // set in local storage
    const handleLike = () => {
        setLike(!like);
        localStorage.setItem('like', JSON.stringify(!like));
        //if like is now On change button to heart
        console.log(like)
    }

    useEffect(() => {
        getInitialLikeState();
    }, [])

   const getInitialLikeState = () => {
        const likeState = localStorage.getItem('like');
        if (likeState === 'true') {
            setLike(true);
        } else {
            setLike(false);
        }
    }

    useEffect(() => {
        console.log(props.nasaData)
    }, [props.nasaData])

    return (
        <div className="card">
            <div className="card-img-top">
                <img className="img" src={props.nasaData.url} alt={props.nasaData.title} />
            </div>
            <div className="card-body">
                <div className="card-content">
                    <h3>{props.nasaData.title}  {props.nasaData.date}</h3>
                    <p>{props.nasaData.explanation}</p>
                    
                        <button
                            onClick={handleLike}
                            className={`btn  ${like ? 'btn-danger' : 'btn-secondary'}`}
                            style={{width: '90px'}}

                        >
                            {like ? 'Liked ❤️' : 'Like ♡'}
                        </button>
                </div>
            </div>
        </div>
    );
}