import React from 'react';
import '../Styles/LandingPage.css';

const LandingPage = () => {
    return (
        <div className='bg-image'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8'>
                <div className='mx-auto max-w-2xl lg:mx-0'>
                    <h1 className='text-3xl font-bold tracking-tight text-white sm:text-6xl'> Feel Safe Within a Village...</h1>
                    <div>
                        <h2 className='mt-6 text-1xl text-semibold leading-8 text-gray-300 '>
                            With Emergency Response times being as HIGH as they are.. Maybe it's time to rethink our WELL-BEING and put our SAFETY in our own HANDS.
                        </h2>
                    </div>
                </div>

                <div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:mx-w-none'>
                    <div className='grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10'>
                        <div className='flex flex-col-center space-x-5 font-bold text-1xl md:text-2xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200'>

                            <h4> Promote Care </h4>
                            <h4> Prevent Further Injury </h4>
                            <h4>Preserve Life</h4>
                        </div>

                        <div>
                            <p className='mx-20 space-x-5'>...It's the Village App Way!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};

export default LandingPage;