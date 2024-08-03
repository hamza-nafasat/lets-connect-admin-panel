import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import { searchAllPostsAction } from "../redux/actions/postActions";
import toast from "react-hot-toast";
import { clearPostError } from "../redux/reducers/postReducers";

const postCategories = [
    "business",
    "politics",
    "technology",
    "science",
    "health",
    "sports",
    "crime",
    "usersPost",
    "document",
];

const Posts = () => {
    const dispatch = useDispatch();
    const [postCategory, setPostCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const isNextPage = page < totalPages;
    const isPrevPage = page > 1;
    const { totalPosts, loading, error } = useSelector((state) => state.postReducer);

    useEffect(() => {
        dispatch(searchAllPostsAction(postCategory, page, 6));
    }, [dispatch, postCategory, page]);
    // set total pages
    useEffect(() => {
        if (totalPosts?.totalPages) setTotalPages(totalPosts?.totalPages);
    }, [dispatch, totalPosts]);
    // handle error message
    useEffect(() => {
        if (error) {
            toast.error(error);
            console.log(error);
            dispatch(clearPostError());
        }
    }, [error, dispatch]);
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="postsPage">
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
                    <select value={postCategory} onChange={(e) => setPostCategory(e.target.value)}>
                        <option value="all">CATEGORIES</option>
                        {postCategories.map((category, i) => (
                            <option key={i} value={category}>
                                {category.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    {/* <button onClick={searchHandler}>Search</button> */}
                </section>
                {/* post section  */}
                <section className="postsSection">
                    {totalPosts?.data?.map((post, i) => (
                        <PostCard key={i} {...post} />
                    ))}
                </section>
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
                {/* create post page link */}
                <Link to={"/create/post"} className="CreateBtn">
                    <FaPlus />
                </Link>
            </main>
        </div>
    );
};

export default Posts;
