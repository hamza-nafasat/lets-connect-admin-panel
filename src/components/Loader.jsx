/* eslint-disable react/prop-types */
const Loader = ({ width = "100vw", height = "100vh" }) => {
    return (
        <div style={{ height: height, width: width }} className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default Loader;

export const Skeleton = ({ width = "100%", height = "2rem", length = 6, bgColor = "gray" }) => {
    const skeletions = Array.from({ length }, (_, idx) => (
        <div key={idx} style={{ height, backgroundColor: bgColor }} className="skeleton-shape"></div>
    ));
    return (
        <div className="skeleton-loader" style={{ width }}>
            {skeletions}
        </div>
    );
};
