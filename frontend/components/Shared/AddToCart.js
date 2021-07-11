import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const AddToCart = ({id}) => {
    const dispatch = useDispatch()

    const handleAddToCart = (id) => {
        dispatch({
            type: 'ADD_TO_CART',
            id
        })

        toast.success('Added to the cart', {
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
                className="btn btn-light"
                onClick={(e) => {
                    e.preventDefault(); handleAddToCart(id)
                }}
            >
                Add to Cart
            </a>
        </Link>
    )
}

export default AddToCart;