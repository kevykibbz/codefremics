import Link from 'next/link';
import React from 'react';

const Community = () => {
    return (
        <section className="communtiy">
            <div className="overlay pt-120 pb-120">
                <div className="container wow fadeInUp">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 order-lg-0 order-1">
                            <div className="community-item">
                                <img src="/images/community-01.png" alt="image" className="item item-1" />
                                <img src="/images/community-02.png" alt="image" className="item item-2" />
                                <img src="/images/community-03.png" alt="image" className="item item-3" />
                                <img src="/images/community-04.png" alt="image" className="item item-4" />
                                <img src="/images/community-05.png" alt="image" className="item item-5" />
                                <img src="/images/community-06.png" alt="image" className="item item-6" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="section-header">
                                <h5 className="sub-title">Out of 3M+ total Egamlio users</h5>
                                <h2 className="title">Chat and play with other Egamlio players who are serious about the Game.</h2>
                                <p>A professional trainer will help you make better decisions, know what to watch out for, and level up quickly.</p>
                            </div>
                            <Link href="register" className="cmn-btn">Join our community</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Community;