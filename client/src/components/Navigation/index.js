import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCategories } from '../../store/actions/category'

const Navigation = () => {

    let { categories } = useSelector(state => state.category)
    categories = [
        {
            path: '/',
            value: 'Trang chủ',
            code: 'HOME'
        },
        ...categories
    ]

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [])



    return (<>
        <div className="bg-secondary1 text-white mb-4 shadow ">
            <div className=" text-sm font-semibold mx-auto w-[1120px]">
                {categories?.length > 0 && categories.map((category) => (
                    <span key={category.code}>
                        <NavLink
                            to={category.path}
                            className={({ isActive }) => ((isActive ? "bg-primary text-black" : "") + " px-3 inline-block h-10 leading-10")}
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