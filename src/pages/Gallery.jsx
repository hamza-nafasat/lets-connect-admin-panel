import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminAside from "../components/AsideBar";
import GalleryCard from "../components/GalleryCard";
import Loader from "../components/Loader";
import { getAllGalleryPostBySearchAction } from "../redux/actions/galleryActions";

const galleryCategories = ["image", "video", "reel"];
const galleryNewsTypes = ["international", "pakistani"];

const Gallery = () => {
    const onePageLimit = 6;
    const dispatch = useDispatch();
    const { galleryPostsData, loading } = useSelector((state) => state.galleryReducer);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [newsType, setNewsType] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // search on btn click
    const searchHandler = () => {
        dispatch(getAllGalleryPostBySearchAction(category, newsType, page, onePageLimit, search));
    };
    // search when any body do some thing expect btn click
    useEffect(() => {
        dispatch(getAllGalleryPostBySearchAction(category, newsType, page, onePageLimit, search));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, newsType, page, dispatch]);
    // set total pages
    useEffect(() => {
        if (galleryPostsData) {
            setTotalPages(galleryPostsData?.totalPages);
        }
    }, [galleryPostsData]);
    const isNextPage = page < totalPages;
    const isPrevPage = page > 1;
    return loading ? (
        <Loader />
    ) : (
        <div className="adminContainer">
            <AdminAside />
            <main className="postsPage">
                {/* search section  */}
                {/* =============== */}
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
                    {/* gallery category for search  */}
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="all">CATEGORY</option>
                        {galleryCategories.map((category, i) => (
                            <option key={i} value={category}>
                                {category.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    {/* gallery news type for search  */}
                    <select value={newsType} onChange={(e) => setNewsType(e.target.value)}>
                        <option value="all">NEWS TYPE</option>
                        {galleryNewsTypes.map((type, i) => (
                            <option key={i} value={type}>
                                {type.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <button onClick={searchHandler}>Search</button>
                </section>
                {/* post section  */}
                {/* =============== */}
                <section className="postsSection">
                    {galleryPostsData?.data?.map((post) => (
                        <GalleryCard key={post._id} {...post} />
                    ))}
                </section>
                {/* pagination section  */}
                {/* =============== */}
                <section className="paginationSection">
                    <button onClick={() => setPage((pre) => pre - 1)} disabled={!isPrevPage}>
                        Prev
                    </button>{" "}
                    {page} of {totalPages || 1}{" "}
                    <button onClick={() => setPage((pre) => pre + 1)} disabled={!isNextPage}>
                        Next
                    </button>
                </section>
                {/* create gallery page link */}
                <Link to={"/create/gallery"} className="CreateBtn">
                    <FaPlus />
                </Link>
            </main>
        </div>
    );
};

export default Gallery;
