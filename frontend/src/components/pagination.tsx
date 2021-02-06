import Link from 'next/link';
import {useRouter} from 'next/router';

const Pagination = (props: any) => {

    const router = useRouter();

    if (props.total <= props.pageSize) {
        return <nav aria-label='Page navigation' className={'page-navigation'}>
            <ul className='pagination justify-content-end'>
                <li className='page-item disabled'>
                    <a className='page-link' tabIndex={-1}>Total: {props.total}</a>
                </li>
                <li className='page-item disabled'><a className='page-link'>Page: 1</a></li>
                <li className='page-item disabled'><a className='page-link'>Page Size: {props.pageSize}</a></li>
            </ul>
        </nav>;
    }

    function pagination(current: number, total: number) {

        let list = [];
        let pageLimit = 10;
        let upperLimit;
        let lowerLimit = upperLimit = Math.min(current, total);

        for (let b = 1; b < pageLimit && b < total;) {
            if (lowerLimit > 1) {
                lowerLimit--;
                b++;
            }
            if (b < pageLimit && upperLimit < total) {
                upperLimit++;
                b++;
            }
        }

        for (let i = lowerLimit; i <= upperLimit; i++) {
            list.push(i);
        }

        return list;
    }

    const currentUrl = () => {
        let currentQuery = router.query;

        let merged = {...currentQuery, page: 'x'};
        Object.keys(merged).forEach((key) => (merged[key] == null || merged[key] === '') && delete merged[key]);

        let queryString = Object.keys(merged).map(key => {
            return key + '=' + merged[key];
        }).join('&');

        return props.baseUrl + '?' + queryString;
    };

    const baseUrl = currentUrl();

    const generatePageUrl = (pageNumber: number) => {
        return baseUrl.replace('page=x', `page=${pageNumber}`);
    };

    let pages = pagination(props.currentPage, Math.ceil(props.total / props.pageSize));
    return (
        <>
            <nav aria-label='Page navigation'>
                <ul className='pagination justify-content-end'>
                    <li className='page-item disabled'>
                        <a className='page-link' tabIndex={-1}>Total: {props.total}</a>
                    </li>
                    <li className='page-item disabled'><a className='page-link'>Page Size: {props.pageSize}</a></li>

                    {pages && pages.map((item) => {
                        return <li key={item}
                                   className={props.currentPage === parseInt(item) ? 'page-item active' : 'page-item'}>
                            {props.currentPage === parseInt(item) ? <span className='page-link'>{item}</span> :
                                <Link href={generatePageUrl(item)}>
                                    <a className='page-link'>{item}</a>
                                </Link>
                            }
                        </li>;
                    })
                    }
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
