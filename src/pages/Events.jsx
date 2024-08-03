import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import EventCard from "../components/EventCard.jsx";
import Loader from "../components/Loader.jsx";
import { getAllEventsBySearchAction, getEventsStatsAction } from "../redux/actions/eventActions.js";
import { clearEventError, clearEventMessage } from "../redux/reducers/eventReducers.js";

const Events = () => {
    const dispatch = useDispatch();
    const { loading, message, error, eventStats, eventsData, searchLoading } = useSelector(
        (state) => state.eventReducer
    );
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);

    useEffect(() => {
        dispatch(getEventsStatsAction());
        dispatch(getAllEventsBySearchAction(1, 6, ""));
    }, [dispatch]);

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

    useEffect(() => {
        dispatch(getAllEventsBySearchAction(page, 6, search));
    }, [dispatch, page, search]);

    useEffect(() => {
        if (eventsData?.totalPages) setTotalPages(eventsData?.totalPages);
    }, [dispatch, eventsData]);

    const isNextPage = page < totalPages;
    const isPrevPage = page > 1;
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="eventsPage">
                {/* search section  */}
                <section className="searchSection">
                    <div style={{ minWidth: "95%" }}>
                        <GoSearch />
                        <input
                            type="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* <button onClick={searchHandler}>Search</button> */}
                </section>
                {/* stats section  */}
                <section className="statsSection">
                    <div>
                        <h3>{eventStats.totalEventsCount}</h3>
                        <p>Total Events</p>
                    </div>
                    <div>
                        <h3>{eventStats.lastMonthEventCount}</h3>
                        <p>Last Month Events</p>
                    </div>
                    <div>
                        <h3>{eventStats.lastMonthAttendance}</h3>
                        <p>Last Month Attendence</p>
                    </div>
                </section>
                {/* events section */}
                {searchLoading ? (
                    <Loader width="100%" height="100%" />
                ) : (
                    <section className="eventsSection">
                        {eventsData?.events?.map((event, i) => (
                            <EventCard key={i} {...event} />
                        ))}
                    </section>
                )}

                {/* pagination section  */}
                <section className="paginationSection">
                    <button onClick={() => setPage((pre) => pre - 1)} disabled={!isPrevPage}>
                        Prev
                    </button>{" "}
                    {page} of {totalPages}{" "}
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

export default Events;
