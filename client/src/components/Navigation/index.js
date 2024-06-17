import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { apiGetCategories } from '../../services/category';

const Navigation = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await apiGetCategories();
            const categories = response?.data?.categories || [];
            setCategories(categories)
        }
        fetchCategories()
    }, [])

    return (<>
        <div className="bg-secondary1 mb-4">
            <div className=" text-white text-sm font-semibold mx-auto w-[1120px]">
                <NavLink
                    to='/'
                    className={({ isActive }) => ((isActive ? "bg-secondary2" : "") + " hover:bg-secondary2 px-3 inline-block h-10 leading-10")}
                >
                    Trang chủ
                </NavLink>
                {categories?.length > 0 && categories.map((category) => (
                    <span key={category.code}>
                        <NavLink
                            to={category.path}
                            className={({ isActive }) => ((isActive ? "bg-secondary2" : "") + " hover:bg-secondary2 px-3 inline-block h-10 leading-10")}
                        >
                            {category.value}
                        </NavLink>
                    </span>
                ))}
            </div>
        </div>
    </>)
}

export default Navigation;