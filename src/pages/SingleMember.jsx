import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import { getSingleMemberAction } from "../redux/actions/statsActions";
import { clearStatsError } from "../redux/reducers/statsReducers";
import Loader from "../components/Loader";
import officialUserLogo from "../assets/official.webp";

const SingleMember = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const memberId = params.id;
    const { singleMember, loading, error } = useSelector((state) => state.statsReducer);

    useEffect(() => {
        dispatch(getSingleMemberAction(memberId));
    }, [dispatch, memberId]);

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
            <main className="singleUserPage">
                <article className="statsArticle">
                    <section className="first">
                        <div>
                            <h3>{singleMember?.gender?.toUpperCase()}</h3>
                            <p>Gender</p>
                        </div>
                        <div>
                            <h3>{singleMember?.maritalStatus?.toUpperCase()}</h3>
                            <p>Martial Status</p>
                        </div>
                    </section>
                    <section className="second" style={{ width: "100%" }}>
                        <div>
                            <h3>{singleMember?.numberOfFamilyMembers}</h3>
                            <p>Family Members</p>
                        </div>
                        <div>
                            <h3>{singleMember?.age}</h3>
                            <p>Age</p>
                        </div>
                        <div>
                            <h3>{singleMember?.workExperience}</h3>
                            <p>Work Experience</p>
                        </div>
                    </section>
                    <article
                        className="MemberExtraDetails"
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}
                    >
                        <section>
                            <p>Work Status : {singleMember?.currentWorkStatus}</p>
                            {singleMember?.jobTitle && <p>Job Title : {singleMember?.jobTitle} </p>}
                            <p>Education:{singleMember?.education}</p>
                            <p>Profession : {singleMember?.profession}</p>
                            {singleMember?.facebook && <p>Facebook Link : {singleMember?.facebook}</p>}
                            {singleMember?.twitter && <p>Twitter Link : {singleMember?.twitter}</p>}
                            {singleMember?.instagram && <p>Instagram Link : {singleMember?.instagram}</p>}
                        </section>
                    </article>
                </article>
                <article className="profileArticle">
                    <section className="card">
                        <img src={officialUserLogo} alt="usersPic" />
                        <h3>
                            {singleMember?.firstName} {singleMember?.lastName}
                        </h3>
                        <p>{singleMember?.email}</p>
                    </section>
                    <section className="details">
                        <p>National Id : {singleMember?.nationalId}</p>
                        <p>Father Name :{singleMember?.fatherName}</p>
                        <p>Father Id : {singleMember?.fatherNationalId}</p>
                        <p>Number : {singleMember?.contactNumber} </p>
                        <p>
                            Address : {singleMember?.city}, {singleMember?.state}, {singleMember?.country}
                        </p>
                        <p>House Address : {singleMember?.houseAddress}</p>
                    </section>
                </article>
            </main>
        </div>
    );
};

export default SingleMember;
