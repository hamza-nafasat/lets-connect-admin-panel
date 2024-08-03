/* eslint-disable react/prop-types */
import { CiHeart } from "react-icons/ci";
import { PiShareFatThin } from "react-icons/pi";
import { RiMessage2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const GalleryCard = ({
    _id,
    title,
    category,
    newsType,
    media,
    likesCount,
    shares,
    commentsCount,
    createdAt,
    youTubeUrl,
}) => {
    return (
        <article className="singlePost">
            {/* main poster  */}
            <Link to={"/gallery-post/" + _id}>
                {category === "image" && <img src={media?.url} alt="Uploaded" />}
                {category === "reel" && <video src={media?.url} controls />}
                {category === "video" && youTubeUrl && (
                    <ReactPlayer url={youTubeUrl} width={288} height={288} style={{ borderRadius: "10px" }} />
                )}
                {/* details section  */}
                <section>
                    <p className="title">{title}</p>
                    <div className="galleryTypes">
                        <p>{category.toUpperCase()}</p>
                        <p>{newsType.toUpperCase()}</p>
                    </div>
                </section>
                {/* like comment share section  */}
                <section>
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
                    <p>{createdAt?.split("T")[0].split("-").reverse().join("-")}</p>
                </section>
            </Link>
        </article>
    );
};

export default GalleryCard;
