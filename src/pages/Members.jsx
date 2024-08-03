/* eslint-disable react/prop-types */
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/official.webp";
import AdminAside from "../components/AsideBar";
import Loader, { Skeleton } from "../components/Loader";
import { LineChartComponent } from "../components/charts/LineChart";
import { membersStatsAction, searchMembersAction } from "../redux/actions/statsActions";
import toast from "react-hot-toast";
import { clearStatsError } from "../redux/reducers/statsReducers";
import { serverUrl } from "../redux/store";
import axios from "axios";

const maritalStatuses = ["married", "single"];
const socialLinks = ["facebook", "twitter", "instagram", "linkedin"];

const Members = () => {
    const onePageLimit = 8;
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [martialStatus, setMartialStatus] = useState("");
    const [socialLink, setSocialLink] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const isNextPage = page < totalPages;
    const isPrevPage = page > 1;
    const { loading, membersStats, searchMembers, error, memberSearchLoading } = useSelector(
        (state) => state.statsReducer
    );
    // export data in excel sheet
    const exportToExcel = async () => {
        try {
            // get full data of members
            let url = `${serverUrl}/admin/members/search?isExcel=yes`;
            if (search) url += `&name=${String(search)}`;
            if (socialLink) url += `&socialLink=${String(socialLink)}`;
            if (martialStatus) url += `&martialStatus=${String(martialStatus)}`;
            if (gender) url += `&gender=${String(gender)}`;
            if (city) url += `&city=${String(city)}`;
            const { data } = await axios.get(url, {
                withCredentials: true,
            });
            const worksheet = XLSX.utils.json_to_sheet(data?.members);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
            // Buffer for Excel file
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const eData = new Blob([excelBuffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
            });
            // Create a download link and trigger the download
            const link = document.createElement("a");
            link.href = URL.createObjectURL(eData);
            link.download = "members.xlsx";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong while exporting to excel");
        }
    };
    // getting users stats when someOne access this page
    useEffect(() => {
        dispatch(membersStatsAction());
    }, [dispatch]);
    // getting users stats when someOne access this page
    useEffect(() => {
        dispatch(searchMembersAction(page, onePageLimit, search, gender, martialStatus, socialLink, city));
    }, [search, page, dispatch, gender, martialStatus, socialLink, city]);
    // setting the total page using use effect when first time search members call
    useEffect(() => {
        if (searchMembers) {
            setTotalPages(Number(searchMembers?.totalPages));
        }
    }, [dispatch, searchMembers]);
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
                {/* Member Stats Section */}
                <section className="statsSection">
                    <div>
                        <h3>{membersStats?.totalMembersCount}</h3>
                        <p>Total Members</p>
                    </div>
                    <div>
                        <h3>{membersStats?.totalMaleMembersCount}</h3>
                        <p>Male Members</p>
                    </div>
                    <div>
                        <h3>{membersStats?.totalFemaleMembersCount}</h3>
                        <p>Female Members</p>
                    </div>
                </section>
                {/* Member Chart Section */}
                <section className="chartSection">
                    <LineChartComponent
                        data={membersStats?.lastOneYearMembersByMonths}
                        title="Users"
                        borderColor="rgb(52, 61, 203)"
                        bgColor="rgb(52, 61, 203,0.5)"
                    />
                </section>
                {/* Member search Section */}
                <section className="searchSection" style={{ maxWidth: "85%" }}>
                    <div>
                        <GoSearch />
                        <input
                            type="search"
                            placeholder="search by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {/* gender  */}
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">GENDER</option>
                        <option value="male">MALE</option>
                        <option value="female">FEMALE</option>
                        <option value="prefer not to say">NOT SAY</option>
                    </select>
                    {/* martialStatus */}
                    <select value={martialStatus} onChange={(e) => setMartialStatus(e.target.value)}>
                        <option value="">MARITAL</option>
                        {maritalStatuses.map((status, i) => (
                            <option key={i} value={status}>
                                {status.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <select value={socialLink} onChange={(e) => setSocialLink(e.target.value)}>
                        <option value="">SOCIAL LINKS</option>
                        {socialLinks.map((status, i) => (
                            <option key={i} value={status}>
                                {status.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </section>
                {/* Member list Section */}
                <section className="usersListSection">
                    <article className="userCard">
                        <section className="headingSection">
                            <p style={{ width: "10%" }}>Image</p>
                            <p style={{ width: "25%" }}>Name</p>
                            <p style={{ width: "25%" }}>FatherName</p>
                            <p style={{ width: "20%" }}>Country</p>
                            {/* <p>Id</p> */}
                            <p style={{ width: "20%" }}>CreatedAt</p>
                        </section>
                        {memberSearchLoading ? (
                            <Skeleton width="85%" height="3.2rem" length={1} />
                        ) : (
                            searchMembers?.members?.map((member) => (
                                <MemberCard key={member._id} {...member} />
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
                    <section className="excelBtn">
                        <button onClick={exportToExcel}>Export in Excel</button>
                    </section>
                </section>
            </main>
        </div>
    );
};

export default Members;

function MemberCard({ firstName, lastName, fatherName, _id, country, createdAt }) {
    return (
        <div className="listSection">
            <Link to={`/member/${_id}`}>
                <img style={{ marginRight: "3%" }} src={logo} alt="user" />
                <h4 style={{ width: "25%" }}>
                    {firstName} {lastName}
                </h4>
                <p style={{ width: "25%" }}>{fatherName}</p>
                <p style={{ width: "20%" }}>{country}</p>
                <p style={{ width: "20%" }}>{createdAt?.split("T")[0]}</p>
            </Link>
        </div>
    );
}
