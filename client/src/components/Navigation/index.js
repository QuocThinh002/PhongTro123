const Navigation = () => {
    const menu = [
        { title: 'Trang chủ', path: '/' },
        { title: 'Cho thuê phòng trọ', path: '/' },
        { title: 'Nhà cho thuê', path: '/' },
        { title: 'Cho thuê căn hộ', path: '/' },
        { title: 'Mặt bằng, văn phòng', path: '/' },
        { title: 'Tìm người ở ghép', path: '/' },
        { title: 'Tin tức', path: '/' },
        { title: 'Bảng giá dịch vụ', path: '/' },
    ]
    return (<>
        <div className="bg-secondary1 mb-4">
            <div className=" text-white text-sm font-semibold mx-auto w-[1120px]">
                {menu.map((item, index) => (
                    <span className="px-3 inline-block h-10 leading-10" key={index}>{item.title}</span>
                ))}
            </div>
        </div>
    </>)
}

export default Navigation;