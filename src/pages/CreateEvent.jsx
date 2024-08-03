import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import { createEventAction } from "../redux/actions/eventActions";
import { clearEventError, clearEventMessage } from "../redux/reducers/eventReducers";

const CreateEvent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, message, error } = useSelector((state) => state.eventReducer);
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [allowShares, setAllowShares] = useState(true);
    const [allowComments, setAllowComments] = useState(true);
    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    // title, coordinates, startTime, endTime, liveUrl

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.split("/")[0];
            setFile(file);
            if (fileType === "image") {
                const reader = new FileReader();
                reader.onload = (e) => setFileData(e.target.result);
                reader.readAsDataURL(file);
            }
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!title) return toast.error("please add title");
        if (!startTime) return toast.error("please add start time");
        if (!endTime) return toast.error("please add end time");
        if (!latitude) return toast.error("please add latitude");
        if (!longitude) return toast.error("please add longitude");
        if (!file) return toast.error("please add poster");

        let formData = new FormData();
        let allowComment = allowComments ? "yes" : "no";
        let allowShare = allowShares ? "yes" : "no";

        formData.append("title", title);
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("allowShares", allowShare);
        formData.append("allowComments", allowComment);
        formData.append("file", file, file.name);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        if (liveUrl) formData.append("liveUrl", liveUrl);
        await dispatch(createEventAction(formData));
    };

    // handle error and message
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearEventError);
        }
        if (message) {
            toast.success(message);
            dispatch(clearEventMessage);
            return navigate("/events");
        }
    }, [error, message, dispatch, navigate]);
    return (
        <div className="adminContainer">
            <AdminAside />
            <main className="createPostPage">
                <article className="headingArticle">
                    <h2>Create New Event</h2>
                </article>
                <article className="formArticleS">
                    <form onSubmit={submitHandler}>
                        {/* title  */}
                        <section>
                            <label htmlFor="title">Title*:</label>
                            <input
                                required
                                type="text"
                                autoFocus
                                name="title"
                                id="title"
                                placeholder="Enter Post Title Here..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </section>
                        {/* live Url  */}
                        <section>
                            <label htmlFor="liveUrl">LiveUrl:</label>
                            <input
                                type="url"
                                name="liveUrl"
                                id="liveUrl"
                                placeholder='Enter "https://" url here...'
                                value={liveUrl}
                                onChange={(e) => setLiveUrl(e.target.value)}
                            />
                        </section>
                        {/* Start Time  */}
                        <section>
                            <label htmlFor="startTime">Start Time*:</label>
                            <input
                                type="datetime-local"
                                name="startTime"
                                id="startTime"
                                required
                                onChange={(e) => setStartTime(e.target.value)}
                                value={startTime}
                            />
                        </section>
                        {/* End Time  */}
                        <section>
                            <label htmlFor="endTime">End Time:</label>
                            <input
                                type="datetime-local"
                                name="endTime"
                                id="endTime"
                                onChange={(e) => setEndTime(e.target.value)}
                                value={endTime}
                            />
                        </section>
                        {/* latitude  */}
                        <section>
                            <label htmlFor="latitude">Latitudes*:</label>
                            <input
                                required
                                type="number"
                                name="latitude"
                                id="latitude"
                                placeholder="Enter Location Latitudes"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                            />
                        </section>
                        {/* longitude  */}
                        <section>
                            <label htmlFor="longitude">Longitude*:</label>
                            <input
                                required
                                type="number"
                                name="longitude"
                                id="longitude"
                                placeholder="Enter Location Longitudes"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                            />
                        </section>
                        {/* Event poster  */}
                        <section>
                            <label htmlFor="poster">Poster*:</label>
                            <div className="file-upload-form" style={{ width: "100%" }}>
                                <label className="file-upload-label">
                                    <div className="file-upload-design">
                                        <span className="browse-button">Select a Poster</span>
                                    </div>
                                    <input
                                        required
                                        id="poster"
                                        name="poster"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
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
                        {/* show poster  */}
                        {file && (
                            <section className="showFileSection">
                                {fileData && <img src={fileData} alt="Uploaded" />}
                            </section>
                        )}
                        {/* submit button  */}
                        <button type="submit" disabled={loading}>
                            Create New Event
                        </button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default CreateEvent;
