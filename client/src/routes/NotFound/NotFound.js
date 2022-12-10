import React from 'react';

import SectionTitle from '../../components/SectionTitle/SectionTitle';

function NotFound() {
    return (
        <section aria-label='error page' id='error'>
            <SectionTitle title={'Whoops!'} />
            <h1>Error 404: Page Not Found.</h1>
        </section>
    );
}

export default NotFound;