import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import ReportCard from "../components/ReportCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getReportsAction } from "../redux/actions/reportActions.js";
import Loader from "../components/Loader.jsx";
import { clearReportError, clearReportMessage } from "../redux/reducers/reportReducers.js";
import toast from "react-hot-toast";

const reportReasons = ["misinformation", "hate speech", "nudity", "violence or threats", "other"];
const reportStatuses = ["pending", "resolved", "ignored"];

const Reports = () => {
    const dispatch = useDispatch();
    const onePageLimit = 8;
    const { reportsData, loading, error, message } = useSelector((state) => state.reportReducer);
    const [search, setSearch] = useState("");
    const [reason, setReason] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const isNextPage = page < totalPages;
    const isPrevPage = page > 1;
    // get reports First Time
    useEffect(() => {
        dispatch(getReportsAction(page, onePageLimit, reason, status));
    }, [dispatch, page, reason, status]);
    // set total pages
    useEffect(() => {
        if (reportsData?.totalPages) {
            setTotalPages(reportsData?.totalPages);
        }
    }, [reportsData, dispatch]);
    // handle error and message
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearReportError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearReportMessage());
        }
    }, [dispatch, error, message]);
    return (
        <div className="adminContainer">
            <AdminAside />
            <main className="reportsPage">
                {/* search section  */}
                <section className="searchSection">
                    <div>
                        <GoSearch />
                        <input
                            type="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* report filter s */}
                    <select value={reason} onChange={(e) => setReason(e.target.value)}>
                        <option value="">REPORT REASON</option>
                        {reportReasons.map((reason, i) => (
                            <option key={i} value={reason}>
                                {reason.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">STATUS</option>
                        {reportStatuses.map((status, i) => (
                            <option key={i} value={status}>
                                {status.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </section>
                {/* reports section */}
                {loading ? (
                    <Loader width="100%" height="100%" />
                ) : (
                    <section className="eventsSection">
                        {reportsData?.reports?.map((report, i) => (
                            <ReportCard key={i} {...report} />
                        ))}
                    </section>
                )}
                {/* pagination section  */}
                <section className="paginationSection">
                    <button onClick={() => setPage((pre) => pre - 1)} disabled={!isPrevPage}>
                        Prev
                    </button>{" "}
                    {page} of {totalPages || 1}{" "}
                    <button onClick={() => setPage((pre) => pre + 1)} disabled={!isNextPage}>
                        Next
                    </button>
                </section>
                {/* create event page  */}
                <Link to={"/create/event"} className="CreateBtn">
                    <FaPlus />
                </Link>
            </main>
        </div>
    );
};

export default Reports;
