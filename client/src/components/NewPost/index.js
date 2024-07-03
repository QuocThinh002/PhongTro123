import NewPostItem from "./newPostItem";

const NewPost = (props) => {
    const { data, title, onRangeChange } = props;

    return (<>
        <div className='px-5 pt-3 pb-1 bg-white border-2 rounded-lg overflow-hidden'>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <div className="flex-col w-full">
                {data && (data.map(item => (
                    <div  key={item.id} className='my-2'>
                        <NewPostItem newPost={item} />
                    </div>
                )))}
            </div>
        </div>
    </>)
}

export default NewPost;