import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { PiShareFatThin } from "react-icons/pi";
import { RiMessage2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import Loader from "../components/Loader";
import { deleteSinglePostAction, getSinglePostAction } from "../redux/actions/postActions";
import { clearPostError, clearPostMessage } from "../redux/reducers/postReducers";
import toast from "react-hot-toast";

const SinglePost = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postId = params?.id;
    const [buttonLoading, setButtonLoading] = useState(false);
    const { singlePost, loading, error, message } = useSelector((state) => state.postReducer);

    const deletePostHandler = async () => {
        setButtonLoading(true);
        await dispatch(deleteSinglePostAction(postId));
        setButtonLoading(false);
        return navigate("/posts");
    };
    // call get single post when page reload
    useEffect(() => {
        setButtonLoading(false);
        dispatch(getSinglePostAction(postId));
    }, [dispatch, postId]);

    // handle error message
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearPostError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearPostMessage());
        }
    }, [error, dispatch, message]);
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="singlePostPage">
                <section className="imgSection">
                    {singlePost?.mediaType === "image" && <img src={singlePost?.media?.url} alt="Uploaded" />}
                    {singlePost?.mediaType === "video" && <video src={singlePost?.media?.url} controls />}
                    {singlePost?.mediaType === "docs" && (
                        <iframe src={singlePost?.media?.url} title="document" />
                    )}
                    {singlePost.mediaType === "text" && <p>{singlePost?.content}</p>}
                    <div>
                        <button>
                            <CiHeart /> {singlePost?.likesCount}
                        </button>
                        <button>
                            <RiMessage2Line /> {singlePost?.commentsCount}
                        </button>
                        <button>
                            <PiShareFatThin /> {singlePost?.shares}
                        </button>
                    </div>
                </section>
                <section className="detailsSection">
                    <h3>Post By ({singlePost?.ownerId?.name})</h3>
                    <p>Posted : {singlePost?.createdAt?.split("T")[0]}</p>
                    <p>Category: {singlePost?.category}</p>
                    {singlePost?.mediaType !== "text" && <p>Content: {singlePost?.content}</p>}
                    <p>Media Type: {singlePost?.mediaType}</p>
                    <p>Allow Shares: {singlePost?.allowShares ? "yes" : "no"}</p>
                    <p>Allow Comments: {singlePost?.allowComments ? "yes" : "no"}</p>
                    <Link to={`/update/post/${singlePost?._id}`}>
                        <button className="editBtn">Edit Post</button>
                    </Link>
                    <button className="delBtn" onClick={deletePostHandler} disabled={buttonLoading}>
                        Delete Post
                    </button>
                </section>
            </main>
        </div>
    );
};

export default SinglePost;
