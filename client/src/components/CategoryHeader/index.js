
const CategoryHeader = (props) => {
    const { header, subheader } = props;
    return (<>
        <div className="border border-red-500 mb-4">
            <h1>{header}</h1>
            <h3>{subheader}</h3>
            <div>
                CategoryHeader
            </div>
        </div>
    </>)
}

export default CategoryHeader;