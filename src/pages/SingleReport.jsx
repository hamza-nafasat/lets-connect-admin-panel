import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import remove from "../assets/removed.png";
import AdminAside from "../components/AsideBar";
import Loader from "../components/Loader";
import { deleteSinglePostAction } from "../redux/actions/postActions";
import {
    banReportedPostOwnerAction,
    deleteReportAction,
    getSingleReportAction,
    processReportAction,
} from "../redux/actions/reportActions";
import { clearPostError, clearPostMessage } from "../redux/reducers/postReducers";
import { clearReportError, clearReportMessage } from "../redux/reducers/reportReducers";

const SingleReport = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const reportId = params.id;
    const navigate = useNavigate();
    const { loading, error, singleReport, message, deleteLoading } = useSelector(
        (state) => state.reportReducer
    );
    const {
        deletePostLoading,
        message: postMessage,
        error: postError,
    } = useSelector((state) => state.postReducer);
    const [ignoreBtnLoading, setIgnoreBtnLoading] = useState(false);
    const [approvedBtnLoading, setApprovedBtnLoading] = useState(false);
    const [banUserLoading, setBanUserLoading] = useState(false);
    // delete reported post handler
    // ============================
    const deletePostHandler = async () => {
        await dispatch(deleteSinglePostAction(singleReport?.postId?._id));
        dispatch(getSingleReportAction(reportId));
    };
    // ignore report handler
    // ============================
    const ignoreReportHandler = async () => {
        setIgnoreBtnLoading(true);
        await dispatch(processReportAction(reportId, "ignored"));
        await dispatch(getSingleReportAction(reportId));
        setIgnoreBtnLoading(false);
    };
    // approved report handler
    // ============================
    const approveReportHandler = async () => {
        setApprovedBtnLoading(true);
        await dispatch(processReportAction(reportId, "resolved"));
        await dispatch(getSingleReportAction(reportId));
        setApprovedBtnLoading(false);
    };
    // delete report handler
    // ============================
    const deleteReportHandler = async () => {
        await dispatch(deleteReportAction(reportId));
        return navigate("/reports");
    };
    // get single report
    // ============================
    useEffect(() => {
        dispatch(getSingleReportAction(reportId));
    }, [dispatch, reportId]);
    // Ban A User Handler
    // ============================
    const banUserHandler = async () => {
        setBanUserLoading(true);
        await dispatch(banReportedPostOwnerAction(singleReport?.postId?.ownerId));
        setBanUserLoading(false);
    };
    // handle error and message
    // ============================
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearReportError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearReportMessage());
        }
        if (postError) {
            toast.error(postError);
            dispatch(clearPostError());
        }
        if (postMessage) {
            toast.success(postMessage);
            dispatch(clearPostMessage());
        }
    }, [error, message, dispatch, postError, postMessage]);
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="singleReportPage">
                <section className="imgSection">
                    <img src={singleReport?.postId?.media?.url || remove} alt="Uploaded" />
                    <p className="reportDescription">{singleReport?.description}</p>
                </section>
                <section className="detailsSection reportDetailsSection">
                    <p>Report Reason : {singleReport?.reason}</p>
                    <p>Report Status : {singleReport?.status}</p>
                    <p>Reported : {singleReport?.createdAt?.split("T")[0]}</p>
                    <button
                        className="editBtn"
                        onClick={ignoreReportHandler}
                        disabled={
                            singleReport?.status === "ignored"
                                ? true
                                : false || ignoreBtnLoading || singleReport?.postId?.media
                                ? false
                                : true
                        }
                    >
                        Ignored Report
                    </button>
                    <button className="delBtn" onClick={deleteReportHandler} disabled={deleteLoading}>
                        Delete Report
                    </button>
                    <button
                        className="editBtn"
                        onClick={approveReportHandler}
                        disabled={singleReport?.status === "resolved" ? true : false || approvedBtnLoading}
                    >
                        Approve Report
                    </button>
                    <button
                        className="delBtn"
                        onClick={deletePostHandler}
                        disabled={singleReport?.postId?._id ? false : true || deletePostLoading}
                    >
                        Delete Reported Post
                    </button>
                    <button
                        className="editBtn"
                        onClick={banUserHandler}
                        disabled={
                            banUserLoading ? true : false || singleReport?.postId?.ownerId ? false : true
                        }
                    >
                        Ban Reported Post Owner
                    </button>
                </section>
            </main>
        </div>
    );
};

export default SingleReport;
