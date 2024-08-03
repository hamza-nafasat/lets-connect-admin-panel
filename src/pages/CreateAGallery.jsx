import { useEffect, useState } from "react";
import AdminAside from "../components/AsideBar";
import { useDispatch, useSelector } from "react-redux";
import { createSingleGalleryPostAction } from "../redux/actions/galleryActions";
import { useNavigate } from "react-router-dom";
import { clearGalleryError, clearGalleryMessage } from "../redux/reducers/galleryReducers";
import toast from "react-hot-toast";

const galleryCategories = ["image", "reel", "video"];
const galleryNewsTypes = ["pakistani", "international"];

const CreateAGallery = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, message } = useSelector((state) => state.galleryReducer);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [newsType, setNewsType] = useState("");
    const [allowShares, setAllowShares] = useState(true);
    const [allowComments, setAllowComments] = useState(true);
    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState("");
    const [mediaType, setMediaType] = useState("");
    const [youTubeUrl, setYouTubeUrl] = useState("");
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
                setMediaType("video");
                setFileData(URL.createObjectURL(file));
            } else if (fileType === "application") {
                setMediaType("docs");
                setFileData(URL.createObjectURL(file));
            }
        }
    };

    const submitHandler = async (e) => {
        setBtnLoading(true);
        let allowComment = allowComments ? "yes" : "no";
        let allowShare = allowShares ? "yes" : "no";
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("newsType", newsType);
        formData.append("allowComments", allowComment);
        formData.append("allowShares", allowShare);
        if (category === "video") {
            formData.append("youTubeUrl", youTubeUrl);
        } else {
            formData.append("file", file);
        }
        await dispatch(createSingleGalleryPostAction(formData));
        setBtnLoading(false);
    };
    // handle error and message
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearGalleryError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearGalleryMessage());
            return navigate("/gallery");
        }
    }, [message, error, dispatch, navigate]);
    return (
        <div className="adminContainer">
            <AdminAside />
            <main className="createPostPage">
                <article className="headingArticle">
                    <h2>Create Gallery Post</h2>
                </article>
                <article className="formArticleS">
                    <form onSubmit={submitHandler}>
                        {/* title  */}
                        <section>
                            <label htmlFor="title">Title*:</label>
                            <input
                                required
                                type="text"
                                id="title"
                                placeholder="Enter Post Title Here..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </section>
                        {/* categories  */}
                        <section>
                            <label htmlFor="galleryCategory">Post Category*:</label>
                            <select
                                required
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
                            <label htmlFor="newsType">News Type*:</label>
                            <select
                                required
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
                                    required
                                    type="url"
                                    id="youTubeUrl"
                                    name="youTubeUrl"
                                    placeholder="Enter Youtube Url..."
                                    value={youTubeUrl}
                                    onChange={(e) => setYouTubeUrl(e.target.value)}
                                />
                            </section>
                        ) : (
                            <section>
                                <label>Attach File*:</label>
                                <div className="file-upload-form" style={{ width: "100%" }}>
                                    <label className="file-upload-label">
                                        <div className="file-upload-design">
                                            <span className="browse-button">Click Here To Select a File</span>
                                        </div>
                                        <input
                                            required
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
                                {mediaType === "video" && <video src={fileData} controls />}
                                {mediaType === "docs" && <iframe src={fileData} title="Document" />}
                            </section>
                        )}
                        {/* submit button  */}
                        <button type="submit" disabled={btnLoading}>
                            Create Gallery Post
                        </button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default CreateAGallery;
