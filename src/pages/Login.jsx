import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../redux/actions/userAction";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, uniqueId } = useSelector((state) => state.userReducer);
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [Password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        if (!PhoneNumber || !Password) return toast.error("please fill both Phone number and Password");
        await dispatch(loginAction(`+${PhoneNumber}`, Password, uniqueId));
        setPhoneNumber("");
        setPassword("");
    };
    // show message and error and navigate to /users if user is logged in
    useEffect(() => {
        if (isAuthenticated) return navigate("/users");
    }, [isAuthenticated, dispatch, navigate]);

    return (
        <main className="loginPage">
            <section>
                <h1>Let&lsquo;s Connect</h1>
                <div>
                    <h3>Welcome back</h3>
                    <p>welcome back! Please enter your details</p>
                </div>
                <form onSubmit={loginHandler}>
                    <section>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="number"
                            id="phoneNumber"
                            name="phoneNumber"
                            autoComplete="off"
                            placeholder="Enter Your Number"
                            value={PhoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </section>
                    <section>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            name="password"
                            placeholder="Enter Your Password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>
                    <button disabled={loading}>Login</button>
                </form>
            </section>
        </main>
    );
};

export default Login;
