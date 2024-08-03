/* eslint-disable react/prop-types */
import { CiHeart } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import { PiShareFatThin } from "react-icons/pi";
import { RiMessage2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const EventCard = ({ title, _id, likesCount, commentsCount, attendenceCount, shares, createdAt, poster }) => {
    return (
        <article className="singleEvent">
            {/* main poster  */}
            <Link to={"/event/" + _id}>
                <img src={poster.url} alt="poster" />
                {/* details section  */}
                <section>
                    <p className="title">{title}</p>
                </section>
                {/* like comment share attendence section  */}
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
                        <p>
                            <IoIosPeople /> {attendenceCount}
                        </p>
                    </div>
                    <p>{createdAt.split("T")[0].replaceAll("-", "/")}</p>
                </section>
            </Link>
        </article>
    );
};

export default EventCard;
