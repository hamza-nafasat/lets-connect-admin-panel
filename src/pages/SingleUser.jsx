import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import Loader from "../components/Loader";
import { getSingleUserAction } from "../redux/actions/statsActions";
import { clearStatsError } from "../redux/reducers/statsReducers";
import { banReportedPostOwnerAction } from "../redux/actions/reportActions";
import { clearReportError, clearReportMessage } from "../redux/reducers/reportReducers";

const SingleUser = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const userId = params.id;
    const [banUserLoading, setBanUserLoading] = useState(false);
    const { singleUser, loading, error } = useSelector((state) => state.statsReducer);
    const { message: reportMessage, error: reportError } = useSelector((state) => state.reportReducer);

    useEffect(() => {
        dispatch(getSingleUserAction(userId));
    }, [dispatch, userId]);

    const banUserHandler = async () => {
        setBanUserLoading(true);
        await dispatch(banReportedPostOwnerAction(userId));
        await dispatch(getSingleUserAction(userId));
        setBanUserLoading(false);
    };
    // handle error
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearStatsError());
        }
        if (reportError) {
            toast.error(reportError);
            dispatch(clearReportError());
        }
        if (reportMessage) {
            toast.success(reportMessage);
            dispatch(clearReportMessage());
        }
    }, [error, dispatch, reportError, reportMessage]);
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="singleUserPage">
                <article className="statsArticle">
                    <section className="first">
                        <div>
                            <h3>{singleUser?.joinedEventsCount}</h3>
                            <p>Event Joined</p>
                        </div>
                        <div>
                            <h3>{singleUser?.points}</h3>
                            <p>Points</p>
                        </div>
                    </section>
                    <section className="second" style={{ width: "100%" }}>
                        <div>
                            <h3>{singleUser?.referralCount}</h3>
                            <p>Referrals</p>
                        </div>
                        <div>
                            <h3>{singleUser?.followersCount}</h3>
                            <p>Followers</p>
                        </div>
                        <div>
                            <h3>{singleUser?.followingCount}</h3>
                            <p>Followings</p>
                        </div>
                    </section>
                </article>
                <article className="profileArticle">
                    <section className="card">
                        <img src={singleUser?.photo?.url} alt={singleUser?.username} />
                        <h3>{singleUser?.name}</h3>
                        <p>{singleUser?.username}</p>
                        <p>{singleUser?.email}</p>
                    </section>
                    <section className="details">
                        <p>Number : {singleUser?.phoneNumber}</p>
                        <p>Last Active : {singleUser?.lastLogin?.split("T")[0]}</p>
                        <p>Gender : {singleUser?.gender}</p>
                        <p>CreatedAt : {singleUser?.createdAt?.split("T")[0]}</p>
                        <p>Banned : {singleUser?.isBanned ? "yes" : "no"}</p>
                        <button className="editBtn" onClick={banUserHandler} disabled={banUserLoading}>
                            {singleUser?.isBanned ? "Unban" : "Ban"} {singleUser?.name}
                        </button>
                    </section>
                </article>
            </main>
        </div>
    );
};

export default SingleUser;
