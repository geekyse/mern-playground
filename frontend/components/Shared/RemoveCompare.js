import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const RemoveCompare = ({id}) => {
    const dispatch = useDispatch()

    const handleRemove = (id) => {
        dispatch({
            type: 'REMOVE_ITEM_FROM_COMPARE',
            id
        })

        toast.success('Removed one item from compare list', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    return(
        <div className="remove-btn">
            <Link href="#">
                <a
                    className="remove"
                    onClick={(e)=>{e.preventDefault(); handleRemove(id)}}
                >
                    <i className="far fa-trash-alt"></i>
                </a>
            </Link>
        </div>
    )
}

export default RemoveCompare;