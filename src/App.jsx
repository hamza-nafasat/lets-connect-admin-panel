import { Suspense, lazy, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { loadUserAction } from "./redux/actions/userAction.js";
import { addUniqueId, clearUserError, clearUserMessage } from "./redux/reducers/userReducers.js";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import { messaging, getToken } from "./utils/firebase.js";

const Login = lazy(() => import("./pages/Login.jsx"));
const Users = lazy(() => import("./pages/Users.jsx"));
const SingleUser = lazy(() => import("./pages/SingleUser.jsx"));
const Members = lazy(() => import("./pages/Members.jsx"));
const SingleMember = lazy(() => import("./pages/SingleMember.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const UpdateAGallery = lazy(() => import("./pages/UpdateAGallery.jsx"));
const CreateAGallery = lazy(() => import("./pages/CreateAGallery.jsx"));
const SingleGalleryPost = lazy(() => import("./pages/SingleGalleryPost.jsx"));
const Posts = lazy(() => import("./pages/Posts.jsx"));
const SinglePost = lazy(() => import("./pages/SinglePost.jsx"));
const CreateAPost = lazy(() => import("./pages/CreateAPost.jsx"));
const UpdateAPost = lazy(() => import("./pages/UpdateAPost.jsx"));
const Events = lazy(() => import("./pages/Events.jsx"));
const UpdateEvent = lazy(() => import("./pages/UpdateEvent.jsx"));
const SingleEvent = lazy(() => import("./pages/SingleEvent.jsx"));
const CreateEvent = lazy(() => import("./pages/CreateEvent.jsx"));
const Reports = lazy(() => import("./pages/Reports.jsx"));
const SingleReport = lazy(() => import("./pages/SingleReport.jsx"));

const App = () => {
    const dispatch = useDispatch();
    const { message, error, loading, user } = useSelector((state) => state.userReducer);
    // load user while refresh or enter on page
    useEffect(() => {
        dispatch(loadUserAction());
    }, [dispatch]);

    useEffect(() => {
        if (error && error !== "Invalid or Expired Access Token") {
            toast.error(error);
            dispatch(clearUserError());
        }
        if (message) {
            toast.success(message);
            dispatch(clearUserMessage());
        }
    }, [error, message, dispatch]);

    // generate and store token in state
    useEffect(() => {
        const requestPermissionAndFetchToken = async () => {
            try {
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                    const token = await getToken(messaging, {
                        vapidKey: import.meta.env.VITE_VAPID_KEY,
                    });
                    dispatch(addUniqueId(token));
                } else {
                    console.error("Notification permission denied");
                }
            } catch (error) {
                console.error("Error getting FCM token:", error);
            }
        };
        requestPermissionAndFetchToken();
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    {/* Only Super Admin Routes */}
                    {/* ======================= */}
                    <Route
                        element={
                            <ProtectedRoutes
                                user={user?.role === "admin" ? true : false}
                                redirectUrl={
                                    user?.role === "postHandler"
                                        ? "/posts"
                                        : user?.role === "reportHandler"
                                        ? "/reports"
                                        : "/"
                                }
                            />
                        }
                    >
                        <Route path="/members" element={<Members />} />
                        <Route path="/member/:id" element={<SingleMember />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/user/:id" element={<SingleUser />} />
                    </Route>
                    {/* Only post Handler and Supper Admin Routes  */}
                    {/* ========================================== */}
                    <Route
                        element={
                            <ProtectedRoutes
                                user={user?.role === "admin" || user?.role == "postHandler" ? true : false}
                                redirectUrl={user?.role === "reportHandler" ? "/reports" : "/"}
                            />
                        }
                    >
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/update/gallery/:id" element={<UpdateAGallery />} />
                        <Route path="/create/gallery" element={<CreateAGallery />} />
                        <Route path="/gallery-post/:id" element={<SingleGalleryPost />} />
                        <Route path="/posts" element={<Posts />} />
                        <Route path="/create/post" element={<CreateAPost />} />
                        <Route path="/update/post/:id" element={<UpdateAPost />} />
                        <Route path="/post/:id" element={<SinglePost />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/event/:id" element={<SingleEvent />} />
                        <Route path="/create/event" element={<CreateEvent />} />
                        <Route path="/update/event/:id" element={<UpdateEvent />} />
                    </Route>
                    {/* Only Admin and Report Handlers Routes  */}
                    {/* ====================================== */}
                    <Route
                        element={
                            <ProtectedRoutes
                                user={user?.role === "admin" || user?.role === "reportHandler" ? true : false}
                                redirectUrl={
                                    user?.role === "postHandler"
                                        ? "/posts"
                                        : user?.role === "postHandler"
                                        ? "/posts"
                                        : "/"
                                }
                            />
                        }
                    >
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/report/:id" element={<SingleReport />} />
                    </Route>
                </Routes>
                <Toaster position="top-right" />
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
