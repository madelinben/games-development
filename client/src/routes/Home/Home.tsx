import React from 'react';

import SectionTitle from '../../components/SectionTitle/SectionTitle';

function NotFound() {
    return (
        <section aria-label='home page' id='home'>
            <SectionTitle title={'Home'} />
            <h1>Success 200: Welcome Home.</h1>
        </section>
    );
}

export default NotFound;