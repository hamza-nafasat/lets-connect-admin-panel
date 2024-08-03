import { useEffect, useState } from "react";
import AdminAside from "../components/AsideBar";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePostAction, updateSinglePostAction } from "../redux/actions/postActions";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { clearPostError, clearPostMessage } from "../redux/reducers/postReducers";

const postCategories = [
    "business",
    "politics",
    "technology",
    "science",
    "health",
    "sports",
    "crime",
    "usersPost",
    "document",
];

const UpdateAPost = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const postId = params?.id;
    const { singlePost, loading, error, message } = useSelector((state) => state.postReducer);
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [allowShares, setAllowShares] = useState(false);
    const [allowComments, setAllowComments] = useState(false);
    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [buttonLoader, setButtonLoader] = useState(false);

    // handle image change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.split("/")[0];
            setFile(file);
            if (fileType === "image") {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFileData(e.target.result);
                    setMediaType("image");
                };
                reader.readAsDataURL(file);
            } else if (fileType === "video") {
                setMediaType("video");
                setFileData(URL.createObjectURL(file));
            } else if (fileType === "application") {
                setMediaType("docs");
                setFileData(URL.createObjectURL(file));
            }
        }
    };

    const submitHandler = async (e) => {
        setButtonLoader(true);
        let allowComment = allowComments ? "yes" : "no";
        let allowShare = allowShares ? "yes" : "no";
        e.preventDefault();
        const formData = new FormData();
        formData.append("category", category);
        formData.append("content", content);
        formData.append("allowComments", allowComment);
        formData.append("allowShares", allowShare);
        formData.append("file", file);
        formData.append("mediaType", mediaType);
        await dispatch(updateSinglePostAction(postId, formData));
        setButtonLoader(false);
    };

    useEffect(() => {
        if (singlePost?.category) setCategory(singlePost?.category);
        if (singlePost?.content) setContent(singlePost?.content);
        if (singlePost?.allowComments) setAllowComments(singlePost?.allowComments);
        if (singlePost?.allowShares) setAllowShares(singlePost?.allowShares);
        if (singlePost?.mediaType) setMediaType(singlePost?.mediaType);
        if (singlePost?.media) setFileData(singlePost?.media?.url);
    }, [singlePost]);

    useEffect(() => {
        dispatch(getSinglePostAction(postId));
        setButtonLoader(false);
    }, [postId, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearPostError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearPostMessage());
            return navigate(`/post/${singlePost?._id}`);
        }
    }, [error, message, dispatch, navigate, singlePost?._id]);
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="createPostPage">
                <article className="headingArticle">
                    <h2>Update Post</h2>
                </article>
                <article className="formArticleS">
                    <form onSubmit={submitHandler}>
                        {/* post categories  */}
                        <section>
                            <label htmlFor="postCategory">Post Category:</label>
                            <select
                                name="postCategory"
                                id="postCategory"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: "100%" }}
                            >
                                <option value="" style={{ display: "none" }}>
                                    Select a Category
                                </option>
                                {postCategories.map((category, i) => (
                                    <option key={i} value={category}>
                                        {category.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </section>
                        {/* post content  */}
                        <section>
                            <label htmlFor="content">Content:</label>
                            <textarea
                                name="content"
                                id="content"
                                cols="30"
                                rows="10"
                                placeholder="Enter Text Content Here"
                                style={{ width: "100%" }}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </section>
                        {/* post file  */}
                        <section>
                            <label>Attach File:</label>
                            <div className="file-upload-form" style={{ width: "100%" }}>
                                <label className="file-upload-label">
                                    <div className="file-upload-design">
                                        <span className="browse-button">Click Here To Select a File</span>
                                    </div>
                                    <input
                                        id="file"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*,video/*,.pdf"
                                    />
                                </label>
                            </div>
                        </section>
                        {/* allow shares  */}
                        <section className="toggelButton">
                            <label>Allow Shares:</label>
                            <div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        name="allowShares"
                                        checked={allowShares}
                                        onChange={() => setAllowShares(!allowShares)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </section>
                        {/* allow Comments  */}
                        <section className="toggelButton">
                            <label>Allow Comments:</label>
                            <div>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={allowComments}
                                        onChange={() => setAllowComments(!allowComments)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </section>
                        {/* show file  */}
                        {fileData && (
                            <section className="showFileSection">
                                {mediaType === "image" && <img src={fileData} alt="Uploaded" />}
                                {mediaType === "video" && <video src={fileData} controls />}
                                {mediaType === "docs" && <iframe src={fileData} title="Document" />}
                            </section>
                        )}
                        {/* submit button  */}
                        <button type="submit" disabled={buttonLoader}>
                            Update
                        </button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default UpdateAPost;
