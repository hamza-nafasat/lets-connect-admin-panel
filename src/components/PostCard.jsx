/* eslint-disable react/prop-types */
import { CiHeart } from "react-icons/ci";
import { RiMessage2Line } from "react-icons/ri";
import { PiShareFatThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import pdfSampleImage from "../assets/pdf.webp";

const PostCard = ({ _id, media, mediaType, likesCount, shares, commentsCount, createdAt, content }) => {
    return (
        <article className="singlePost">
            <Link to={`/post/${_id}`}>
                {mediaType === "image" && <img src={media?.url} alt="Uploaded" />}
                {mediaType === "video" && <video src={media?.url} controls />}
                {mediaType === "docs" && <img src={pdfSampleImage} alt="Uploaded" />}
                {mediaType === "text" && <p>{content}</p>}
                <section>
                    <div style={{ display: "flex", justifyContent: "space-around", height: "2rem" }}>
                        {mediaType !== "text" && content && <p> {content}</p>}
                    </div>
                    <div>
                        <p>
                            <CiHeart /> {likesCount}
                        </p>
                        <p>
                            <RiMessage2Line /> {commentsCount}
                        </p>
                        <p>
                            <PiShareFatThin /> {shares}
                        </p>
                    </div>
                    <p>{createdAt?.split("T")[0]}</p>
                </section>
            </Link>
        </article>
    );
};

export default PostCard;
