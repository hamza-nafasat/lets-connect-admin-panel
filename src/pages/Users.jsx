/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import Loader, { Skeleton } from "../components/Loader.jsx";
import { LineChartComponent } from "../components/charts/LineChart";
import { searchUsersAction, usersStatsAction } from "../redux/actions/statsActions";
import toast from "react-hot-toast";
import { clearStatsError } from "../redux/reducers/statsReducers.js";

const UserGenders = ["male", "female", "other"];

const Users = () => {
    const onePageLimit = 8;
    const dispatch = useDispatch();
    const { usersStats, searchUsers, error, loading, searchUserLoading } = useSelector(
        (state) => state.statsReducer
    );
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const isNextPage = page < totalPages;
    const isPrevPage = page > 1;

    // getting users stats when any body access this page
    useEffect(() => {
        dispatch(usersStatsAction());
    }, [dispatch]);
    // getting users stats when any body access this page
    useEffect(() => {
        dispatch(searchUsersAction(page, onePageLimit, search, gender));
    }, [search, page, dispatch, gender]);
    // setting the total page using use effect when first time search users call
    useEffect(() => {
        if (searchUsers) {
            setTotalPages(Number(searchUsers?.totalPages));
        }
    }, [searchUsers]);
    // handle error
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearStatsError());
        }
    }, [error, dispatch]);
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="usersPage">
                {/* Users Stats Section */}
                <section className="statsSection">
                    <div>
                        <h3>{usersStats?.totalUsersCount}</h3>
                        <p>Total Users</p>
                    </div>
                    <div>
                        <h3>{usersStats?.veriFiedUsersCount}</h3>
                        <p>Verified Users</p>
                    </div>
                    <div>
                        <h3>{usersStats?.ActiveUsersCount}</h3>
                        <p>Active Users</p>
                    </div>
                </section>
                {/* Users Chart Section */}
                <section className="chartSection">
                    <LineChartComponent
                        data={usersStats?.lastOneYearUsersByMonths}
                        title="Users"
                        borderColor="rgb(52, 61, 203)"
                        bgColor="rgb(52, 61, 203,0.5)"
                    />
                </section>
                {/* search Section */}
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
                    <select
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">GENDER</option>
                        {UserGenders.map((gender) => (
                            <option key={gender} value={gender}>
                                {gender.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </section>
                {/* users list Section */}
                <section className="usersListSection">
                    <article className="singleUser">
                        <section className="headingSection">
                            <p style={{ width: "10%" }}>Image</p>
                            <p style={{ width: "25%" }}>Name</p>
                            <p style={{ width: "25%" }}>username</p>
                            <p style={{ width: "15%" }}>Points</p>
                            <p style={{ width: "10%" }}>Gender</p>
                            <p style={{ width: "15%" }}>CreatedAt</p>
                        </section>
                        {searchUserLoading ? (
                            <Skeleton width="85%" height="3.2rem" length={3} />
                        ) : (
                            searchUsers?.users?.map((user) => (
                                <SingleUser
                                    key={user._id}
                                    _id={user._id}
                                    name={user.name}
                                    username={user.username}
                                    photo={user.photo}
                                    points={user.points}
                                    gender={user.gender}
                                    createdAt={user.createdAt}
                                />
                            ))
                        )}
                    </article>
                    <section className="paginationSection">
                        <button onClick={() => setPage((pre) => pre - 1)} disabled={!isPrevPage}>
                            Prev
                        </button>{" "}
                        {page} of {totalPages || 1}{" "}
                        <button onClick={() => setPage((pre) => pre + 1)} disabled={!isNextPage}>
                            Next
                        </button>
                    </section>
                </section>
            </main>
        </div>
    );
};

export default Users;

function SingleUser({ _id, name, username, points, photo, gender }) {
    return (
        <div className="listSection">
            <Link to={`/user/${_id}`}>
                <img style={{ marginRight: "3%" }} src={photo.url} alt="user" />
                <h4 style={{ width: "25%" }}>{name}</h4>
                <p style={{ width: "25%" }}>{username}</p>
                <p style={{ width: "15%" }}>{points}</p>
                <p style={{ width: "10%" }}>{gender}</p>
                <p style={{ width: "15%" }}>3 days ago</p>
            </Link>
        </div>
    );
}
