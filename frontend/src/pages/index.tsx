import React from "react";
import { withAdminAuthSync } from '../util/auth';

 function Home() {
    return <>
        <div className={'col-12'}>
        </div>
    </>;
}

export default withAdminAuthSync(Home);
