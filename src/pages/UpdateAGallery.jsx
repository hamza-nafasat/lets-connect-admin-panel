import { useEffect, useState } from "react";
import AdminAside from "../components/AsideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleGalleryPostAction, updateSingleGalleryPostAction } from "../redux/actions/galleryActions";
import toast from "react-hot-toast";
import { clearGalleryError, clearGalleryMessage } from "../redux/reducers/galleryReducers";
import Loader from "../components/Loader";

const galleryCategories = ["image", "reel", "video"];
const galleryNewsTypes = ["pakistani", "international"];

const UpdateAGallery = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const galleryId = params.id;
    const { singleGalleryData, loading, message, error } = useSelector((state) => state.galleryReducer);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [newsType, setNewsType] = useState("");
    const [allowShares, setAllowShares] = useState(false);
    const [allowComments, setAllowComments] = useState(false);
    const [file, setFile] = useState("");
    const [youTubeUrl, setYouTubeUrl] = useState("");
    const [fileData, setFileData] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

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
                setMediaType("reel");
                setFileData(URL.createObjectURL(file));
            }
        }
    };
    // submit handler
    const submitHandler = async (e) => {
        console.log(file, mediaType, youTubeUrl);
        setBtnLoading(true);
        e.preventDefault();
        let allowComment = allowComments ? "yes" : "no";
        let allowShare = allowShares ? "yes" : "no";
        const formData = new FormData();
        if (title !== singleGalleryData?.title) formData.append("title", title);
        if (newsType !== singleGalleryData?.newsType) formData.append("newsType", newsType);
        formData.append("allowComments", allowComment);
        formData.append("allowShares", allowShare);
        if (category !== "video" && file) {
            formData.append("file", file);
            formData.append("category", mediaType);
        } else if (youTubeUrl) {
            formData.append("youTubeUrl", youTubeUrl);
            formData.append("category", mediaType);
        }
        await dispatch(updateSingleGalleryPostAction(galleryId, formData));
        setBtnLoading(false);
    };
    // set data when fetch a post
    useEffect(() => {
        if (singleGalleryData?.newsType) setNewsType(singleGalleryData.newsType);
        if (singleGalleryData?.category) setCategory(singleGalleryData.category);
        if (singleGalleryData?.allowComments) setAllowComments(singleGalleryData.allowComments);
        if (singleGalleryData?.allowShares) setAllowShares(singleGalleryData.allowShares);
        if (singleGalleryData?.title) setTitle(singleGalleryData.title);
        if (singleGalleryData?.media?.url) setFileData(singleGalleryData?.media?.url);
        if (singleGalleryData?.youTubeUrl) setYouTubeUrl(singleGalleryData?.youTubeUrl);
    }, [singleGalleryData]);
    // get post first time
    useEffect(() => {
        dispatch(getSingleGalleryPostAction(galleryId));
    }, [galleryId, dispatch]);
    // handle message and error
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearGalleryError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearGalleryMessage());
            return navigate(`/gallery-post/${singleGalleryData?._id}`);
        }
    }, [error, message, dispatch, navigate, singleGalleryData?._id]);

    const youTubeUrlOnChanger = (e) => {
        setYouTubeUrl(e.target.value);
        setMediaType("video");
    };
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="createPostPage">
                <article className="headingArticle">
                    <h2>Update Gallery Post</h2>
                </article>
                <article className="formArticleS">
                    <form onSubmit={submitHandler}>
                        {/* title  */}
                        <section>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter Post Title Here..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </section>
                        {/* categories  */}
                        <section>
                            <label htmlFor="galleryCategory">Post Category:</label>
                            <select
                                name="galleryCategory"
                                id="galleryCategory"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: "100%" }}
                            >
                                <option value="" style={{ display: "none" }}>
                                    Select a Category
                                </option>
                                {galleryCategories.map((category, i) => (
                                    <option key={i} value={category}>
                                        {category.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </section>
                        {/* news Type  */}
                        <section>
                            <label htmlFor="newsType">News Type:</label>
                            <select
                                name="newsType"
                                id="newsType"
                                value={newsType}
                                onChange={(e) => setNewsType(e.target.value)}
                                style={{ width: "100%" }}
                            >
                                <option value="" style={{ display: "none" }}>
                                    Select News Type
                                </option>
                                {galleryNewsTypes.map((type, i) => (
                                    <option key={i} value={type}>
                                        {type.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </section>
                        {/* file  */}
                        {category == "video" ? (
                            <section>
                                <label htmlFor="youTubeUrl">Youtube Url*:</label>
                                <input
                                    type="url"
                                    id="youTubeUrl"
                                    name="youTubeUrl"
                                    placeholder="Enter Youtube url here..."
                                    value={youTubeUrl}
                                    onChange={(e) => youTubeUrlOnChanger(e)}
                                />
                            </section>
                        ) : (
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
                        )}
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
                        {file && (
                            <section className="showFileSection">
                                {mediaType === "image" && <img src={fileData} alt="Uploaded" />}
                                {mediaType === "reel" && <video src={fileData} controls />}
                            </section>
                        )}
                        {/* submit button  */}
                        <button type="submit" disabled={btnLoading}>
                            Update
                        </button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default UpdateAGallery;
