
const HeaderCategory = (props) => {
    const { header, subheader } = props;
    return (<>
        <div className="border border-red-500">
            <h1>{header}</h1>
            <h3>{subheader}</h3>
        </div>
    </>)
}

export default HeaderCategory;