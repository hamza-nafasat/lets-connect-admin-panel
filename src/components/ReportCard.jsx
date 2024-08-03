/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import removed from "../assets/removed.png";

const ReportCard = ({ reason, status, postId, createdAt, _id }) => {
    return (
        <article className="singleEvent">
            {/* main poster  */}
            <Link to={"/report/" + _id}>
                <img src={postId?.media?.url || removed} alt="poster" />
                <section>
                    <div>
                        <p>{reason}</p>
                        <p>{status}</p>
                    </div>
                    <p>{createdAt?.split("T")[0]}</p>
                </section>
            </Link>
        </article>
    );
};

export default ReportCard;
