import { useEffect, useState } from "react";
import AdminAside from "../components/AsideBar";
import { getSingleEvent, updateEventAction } from "../redux/actions/eventActions";
import { clearEventError, clearEventMessage } from "../redux/reducers/eventReducers";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const UpdateEvent = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const eventId = params.id;
    const { loading, message, error, singleEvent, updateLoading } = useSelector(
        (state) => state.eventReducer
    );
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [allowShares, setAllowShares] = useState(true);
    const [allowComments, setAllowComments] = useState(true);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [poster, setPoster] = useState(false);
    const [posterPreview, setPosterPreview] = useState("");
    const [multiFiles, setMultiFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    // multi files handle function
    const handleMultiFileChange = (event) => {
        const selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImages((prevImages) => [...prevImages, { url: e.target.result, name: file.name }]);
                };
                reader.readAsDataURL(file);
            } else if (file.type.startsWith("video/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setVideos((prevVideos) => [...prevVideos, { url: e.target.result, name: file.name }]);
                };
                reader.readAsDataURL(file);
            } else {
                console.log(`Unsupported file type: ${file.name}`);
            }
        }
        setMultiFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };
    // poster handle function
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type.split("/")[0];
            setPoster(file);
            if (fileType === "image") {
                const reader = new FileReader();
                reader.onload = (e) => setPosterPreview(e.target.result);
                reader.readAsDataURL(file);
            }
        }
    };
    // remove image function
    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        const removedImage = updatedImages.splice(index, 1)[0];
        setImages(updatedImages);
        setMultiFiles((prevFiles) => prevFiles.filter((file) => file.name !== removedImage.name));
    };
    // remove video function
    const handleRemoveVideo = (index) => {
        const updatedVideos = [...videos];
        const removedVideo = updatedVideos.splice(index, 1)[0];
        setVideos(updatedVideos);
        setMultiFiles((prevFiles) => prevFiles.filter((file) => file.name !== removedVideo.name));
    };
    // submit handler
    const submitHandler = async (e) => {
        e.preventDefault();
        let allowShare = allowShares ? "yes" : "no";
        let allowComment = allowComments ? "yes" : "no";
        const formData = new FormData();
        if (title) formData.append("title", title);
        if (startTime) formData.append("startTime", startTime);
        if (endTime) formData.append("endTime", endTime);
        if (allowShare) formData.append("allowShares", allowShare);
        if (allowComment) formData.append("allowComments", allowComment);
        if (latitude) formData.append("latitude", latitude);
        if (longitude) formData.append("longitude", longitude);
        if (poster) {
            let mediaType = "poster";
            formData.append("files", poster, poster.name);
            formData.append("mediaType", mediaType);
        }
        if (images.length > 0) {
            multiFiles.forEach((image) => {
                formData.append("files", image, image.name);
            });
        }
        if (videos.length > 0) {
            multiFiles.forEach((video) => {
                formData.append("files", video, video.name);
            });
        }
        if (images.length > 0 || videos.length > 0) {
            let mediaType = "data";
            formData.append("mediaType", mediaType);
        }
        await dispatch(updateEventAction(eventId, formData));
    };
    // set data to states
    useEffect(() => {
        let event = {};
        if (singleEvent?.event) {
            event = singleEvent?.event;
            setTitle(event?.title);
            setStartTime(event?.startTime?.slice(0, -5));
            setEndTime(event?.endTime?.slice(0, -5));
            setAllowShares(event?.allowShares);
            setAllowComments(event?.allowComments);
            setPosterPreview(event?.poster?.url);
            setLatitude(event?.location?.coordinates[0]);
            setLongitude(event?.location?.coordinates[1]);
        }
    }, [singleEvent]);
    // get single event
    useEffect(() => {
        dispatch(getSingleEvent(eventId));
    }, [eventId, dispatch]);
    // handle error and message
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearEventError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearEventMessage());
            return navigate(`/event/${eventId}`);
        }
    }, [error, message, dispatch, navigate, eventId]);

    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="createPostPage">
                <article className="headingArticle">
                    <h2>Update Event</h2>
                </article>
                <article className="formArticleS">
                    <form onSubmit={submitHandler}>
                        {/* title  */}
                        <section>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Enter Post Title Here..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </section>
                        {/* Start Time  */}
                        <section>
                            <label htmlFor="startTime">Start Time:</label>
                            <input
                                type="datetime-local"
                                name="startTime"
                                id="startTime"
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
                        {/* Latitude  */}
                        <section>
                            <label htmlFor="latitude">Latitude:</label>
                            <input
                                type="number"
                                name="latitude"
                                id="latitude"
                                placeholder="Enter Location Latitudes..."
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                            />
                        </section>
                        {/* longitude  */}
                        <section>
                            <label htmlFor="longitude">Longitude:</label>
                            <input
                                type="number"
                                name="longitude"
                                id="longitude"
                                placeholder="Enter Location Longitudes..."
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                            />
                        </section>
                        {/* Event poster  */}
                        <section>
                            <label htmlFor="poster">Poster:</label>
                            <div className="file-upload-form" style={{ width: "100%" }}>
                                <label className="file-upload-label">
                                    <div className="file-upload-design">
                                        <span className="browse-button">Select a Poster</span>
                                    </div>
                                    <input
                                        id="poster"
                                        name="poster"
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                        </section>
                        {/* show poster  */}
                        {posterPreview && (
                            <article className="ShowPoster">
                                <h3>Event Poster:</h3>
                                <div>
                                    <div>
                                        <img src={posterPreview} alt="img" />
                                    </div>
                                </div>
                            </article>
                        )}
                        {/* select images and videos  */}
                        <section>
                            <label htmlFor="eventFiles">Files:</label>
                            <div className="file-upload-form" style={{ width: "100%" }}>
                                <label className="file-upload-label">
                                    <div className="file-upload-design">
                                        <span className="browse-button">Add Event Images & Videos</span>
                                    </div>
                                    <input
                                        id="eventFiles"
                                        name="eventFiles"
                                        type="file"
                                        onChange={handleMultiFileChange}
                                        accept="image/*,video/*"
                                        multiple
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
                        {/* show images */}
                        {images.length > 0 && (
                            <article className="showMultiImages">
                                <h3>Selected Images:</h3>
                                <div>
                                    {images.map((img, index) => (
                                        <div key={index}>
                                            <img key={index} src={img.url} alt="img" />
                                            <span onClick={() => handleRemoveImage(index)}>❌</span>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        )}
                        {/* show videos  */}
                        {videos.length > 0 && (
                            <article className="showMultiVideos">
                                <h3>Selected Videos:</h3>
                                <div>
                                    {videos.map((vid, index) => (
                                        <div key={index}>
                                            <video key={index} src={vid.url} controls />
                                            <span onClick={() => handleRemoveVideo(index)}>❌</span>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        )}
                        {/* submit button  */}
                        <button type="submit" disabled={updateLoading}>
                            Update
                        </button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default UpdateEvent;
