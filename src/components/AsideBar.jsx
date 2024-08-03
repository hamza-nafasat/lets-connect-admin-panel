/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { IoIosAddCircleOutline, IoIosPeople } from "react-icons/io";
import { MdOutlineReport } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import { logoutAction } from "../redux/actions/userAction";

const AdminAside = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, user, uniqueId } = useSelector((state) => state.userReducer);
    const location = useLocation();

    const logoutHandler = () => {
        localStorage.clear();
        dispatch(logoutAction(uniqueId));
    };
    // check if not user then navigate to login
    useEffect(() => {
        if (!isAuthenticated) return navigate("/");
    }, [isAuthenticated, dispatch, navigate]);
    const isAdmin = user?.role === "admin";
    const isPostHandler = user?.role === "postHandler";
    const isReportHandler = user?.role === "reportHandler";
    return (
        <>
            <aside>
                <section className="logoSection">
                    <img src={logoImage} alt="logo" />
                    <h2>Let&apos;s Connect</h2>
                </section>
                <section className="listSection">
                    <ul>
                        <LiComponent
                            url={"/users"}
                            text={"Users"}
                            Icon={BiUser}
                            location={location}
                            display={isAdmin ? "block" : "none"}
                        />
                        <LiComponent
                            url={"/members"}
                            text={"Members"}
                            Icon={IoIosPeople}
                            location={location}
                            display={isAdmin ? "block" : "none"}
                        />
                        <LiComponent
                            url={"/posts"}
                            text={"Posts"}
                            Icon={IoIosAddCircleOutline}
                            location={location}
                            display={isAdmin || isPostHandler ? "block" : "none"}
                        />
                        <LiComponent
                            url={"/gallery"}
                            text={"Gallery"}
                            Icon={GrGallery}
                            location={location}
                            display={isAdmin || isPostHandler ? "block" : "none"}
                        />
                        <LiComponent
                            url={"/events"}
                            text={"Events"}
                            Icon={IoIosPeople}
                            location={location}
                            display={isAdmin || isPostHandler ? "block" : "none"}
                        />
                        <LiComponent
                            url={"/reports"}
                            text={"Reports"}
                            Icon={MdOutlineReport}
                            location={location}
                            display={isAdmin || isReportHandler ? "block" : "none"}
                        />
                    </ul>
                </section>
                <section className="btnSection">
                    <button onClick={logoutHandler} disabled={loading}>
                        <TbLogout2 />
                        Log out
                    </button>
                </section>
            </aside>
        </>
    );
};
export default AdminAside;

// THIS IS LI COMPONENT FOR EVERY SECTION LINKS IN ASIDE
const LiComponent = ({ url, text, Icon, location, display }) => {
    return (
        <li
            style={{
                fontWeight: location.pathname.includes(url) ? "600" : "400",
                display: display,
            }}
        >
            <Link
                to={url}
                style={{
                    color: location.pathname.includes(url) ? "rgb(52, 61, 203)" : "rgb(102, 102, 102)",
                }}
            >
                <Icon />
                {text}
            </Link>
        </li>
    );
};
