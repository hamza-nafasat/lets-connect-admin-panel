import { useEffect } from "react";
import toast from "react-hot-toast";
import { CiHeart } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import { PiShareFatThin } from "react-icons/pi";
import { RiMessage2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import Loader from "../components/Loader";
import { LineChartComponent } from "../components/charts/LineChart";
import { deleteEventAction, getSingleEvent } from "../redux/actions/eventActions";
import { clearEventError, clearEventMessage } from "../redux/reducers/eventReducers";

const SingleEvent = () => {
    const params = useParams();
    const eventId = params.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, message, error, singleEvent, deleteLoading } = useSelector(
        (state) => state.eventReducer
    );
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
        }
    }, [error, message, dispatch]);

    const deleteEVentHandler = async () => {
        await dispatch(deleteEventAction(singleEvent?.event?._id));
        return navigate("/events");
    };
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="singlePostPage">
                <section className="imgSection">
                    {singleEvent?.event?.poster?.url && (
                        <img className="eventPoster" src={singleEvent?.event?.poster?.url} alt="Uploaded" />
                    )}
                    <div className="eventDiv">
                        <button>
                            <CiHeart /> {singleEvent?.event?.likesCount}
                        </button>
                        <button>
                            <RiMessage2Line /> {singleEvent?.event?.commentsCount}
                        </button>
                        <button>
                            <PiShareFatThin /> {singleEvent?.event?.shares}
                        </button>
                        <button>
                            <IoIosPeople /> {singleEvent?.event?.attendenceCount}
                        </button>
                    </div>
                </section>
                <section className="detailsSection eventDetailsSection" style={{ width: "40%" }}>
                    <p>Posted : {singleEvent?.event?.createdAt?.split("T")[0]}</p>
                    <p>Start Time: {singleEvent?.event?.startTime?.split("T")[1].split(".")[0]}</p>
                    <p>Start Date: {singleEvent?.event?.startTime?.split("T")[0]}</p>
                    <p>End Time: {singleEvent?.event?.endTime?.split("T")[1].split(".")[0]}</p>
                    <p>End Date: {singleEvent?.event?.endTime?.split("T")[0]}</p>
                    <p>
                        Location: {singleEvent?.event?.location?.coordinates[0]},{" "}
                        {singleEvent?.event?.location?.coordinates[1]}
                    </p>
                    <Link to={"/update/event/" + singleEvent?.event?._id}>
                        <button className="editBtn">Edit Event</button>
                    </Link>
                    <button className="delBtn" onClick={deleteEVentHandler} disabled={deleteLoading}>
                        Delete Event
                    </button>
                </section>
                <section className="singleEventChartSection">
                    <h3>Total Reach On This Event</h3>
                    <div>
                        <LineChartComponent
                            data={singleEvent?.chartObject?.data}
                            title="Users"
                            borderColor="rgb(52, 61, 203)"
                            bgColor="rgb(52, 61, 203,0.5)"
                            labels={singleEvent?.chartObject?.label}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SingleEvent;
