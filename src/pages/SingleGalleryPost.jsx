import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { PiShareFatThin } from "react-icons/pi";
import { RiMessage2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import { deleteSingleGalleryPostAction, getSingleGalleryPostAction } from "../redux/actions/galleryActions";
import toast from "react-hot-toast";
import { clearGalleryError, clearGalleryMessage } from "../redux/reducers/galleryReducers";
import Loader from "../components/Loader";
import ReactPlayer from "react-player";

const SinglePost = () => {
    const params = useParams();
    const galleryId = params.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { singleGalleryData, loading, error, message } = useSelector((state) => state.galleryReducer);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        dispatch(getSingleGalleryPostAction(galleryId));
    }, [galleryId, dispatch]);

    const galleryDeleteHandler = async () => {
        setBtnLoading(true);
        await dispatch(deleteSingleGalleryPostAction(galleryId));
        setBtnLoading(false);
        return navigate("/gallery");
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearGalleryError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearGalleryMessage());
        }
    }, [error, message, dispatch]);
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="singlePostPage">
                <section className="imgSection">
                    {singleGalleryData?.category === "image" && (
                        <img src={singleGalleryData?.media?.url} alt="Uploaded" />
                    )}
                    {singleGalleryData?.category === "reel" && (
                        <video src={singleGalleryData?.media?.url} controls />
                    )}
                    {singleGalleryData?.category === "video" && (
                        <ReactPlayer url={singleGalleryData?.youTubeUrl} width={560} height={560} controls />
                    )}
                    <div>
                        <button>
                            <CiHeart /> {singleGalleryData?.likesCount}
                        </button>
                        <button>
                            <RiMessage2Line /> {singleGalleryData?.commentsCount}
                        </button>
                        <button>
                            <PiShareFatThin /> {singleGalleryData?.shares}
                        </button>
                    </div>
                </section>
                <section className="detailsSection">
                    <h3>Post By (Admin)</h3>
                    <p>
                        Posted :{" "}
                        {singleGalleryData?.createdAt?.split("T")[0]?.split("-")?.reverse()?.join("-")}
                    </p>
                    <p>Category: {singleGalleryData?.category}</p>
                    <p>Media Type: {singleGalleryData?.newsType}</p>
                    <p>Allow Shares: {singleGalleryData?.allowShares ? "yes" : "no"}</p>
                    <p>Allow Comments: {singleGalleryData?.allowComments ? "yes" : "no"}</p>
                    <Link to={`/update/gallery/${galleryId}`}>
                        <button className="editBtn">Edit Gallery Post</button>
                    </Link>
                    <button className="delBtn" onClick={galleryDeleteHandler} disabled={btnLoading}>
                        Delete Post
                    </button>
                </section>
            </main>
        </div>
    );
};

export default SinglePost;
