import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const AddToCompare = ({id}) => {
    const dispatch = useDispatch()

    const handleAddToCompare = (id) => {
        dispatch({
            type: 'ADD_TO_COMPARE',
            id
        })

        toast.success('Added to the compare list', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    return(
        <Link href="#">
            <a 
                data-tip="Add to Compare" 
                data-place="left" 
                onClick={e => {
                        e.preventDefault(); 
                        handleAddToCompare(id)
                    }
                }
            >
                <i className="fas fa-sync"></i>
            </a>
        </Link>
    )
}

export default AddToCompare;