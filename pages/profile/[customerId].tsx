import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import { Poppins } from 'next/font/google';
import { getAccessTokenFromCookies } from '@/utils/cookie';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

type CustomerDetails = {
  customer_id: string;
  first_name: string;
  other_names: string;
  email: string;
  description: string;
  gender: string;
  mobile: string;
};

const CustomerProfile: React.FC = () => {
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const router = useRouter();
  const { customerId } = router.query;

  useEffect(() => {
    const fetchCustomerData = async () => {
      const accessToken = getAccessTokenFromCookies();

      try {
        const response = await axios.get(`https://stemprotocol.codefremics.com/api/v2/customers/get-customer-details/${customerId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });


        if (response.headers['content-type'].includes('application/json')) {
          setCustomer(response.data?.response);
        } else {
          console.error('Response was not JSON:', response);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className={poppins.className}>
      <Header />
      <section className="banner-section inner-banner coach dashboard">
        <div className="overlay">
          <div className="banner-content my-banner-container" style={{ paddingTop: '50px !important' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-md-10">
                  <div className="main-content">
                    <h2>User Dashboard</h2>
                    <div className="breadcrumb-area">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb d-flex align-items-center">
                          <li className="breadcrumb-item">
                            <Link href="/">Home</Link>
                          </li>
                          <li className="breadcrumb-item">
                            <Link href="#">Profile</Link>
                          </li>
                          <li className="breadcrumb-item active" aria-current="page">
                            {`${customer.first_name} ${customer.other_names}`}
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="dashboard-section">
        <div className="overlay pb-120">
          <div className="container">
            <div className="row">
              <div className="col-xxl-3 col-lg-4 col-md-8">
                <div className="sidebar-single">
                  <div className="profile-img">
                    <img src="/images/profile3.png" alt="icon" />
                  </div>
                  <h5>{`${customer.first_name} ${customer.other_names}`}</h5>
                </div>
                <div className="sidebar-single">
                  <ul>
                    <li>
                      <Link href="/dashboard" className="active">
                        <img src="/images/icon/dashboard-menu-1.png" className="max-un" alt="icon" />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/orders">
                        <img src="/images/icon/dashboard-menu-2.png" className="max-un" alt="icon" />
                        My orders
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/personal-info">
                        <img src="/images/icon/dashboard-menu-3.png" className="max-un" alt="icon" />
                        Personal Information
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/invoices">
                        <img src="/images/icon/dashboard-menu-4.png" className="max-un" alt="icon" />
                        My Invoices
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/payment">
                        <img src="/images/icon/dashboard-menu-2.png" className="max-un" alt="icon" />
                        Payment method
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/password">
                        <img src="/images/icon/dashboard-menu-6.png" className="max-un" alt="icon" />
                        Change password
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="sidebar-single">
                  <div className="profile-img">
                    <img src="/images/icon/help-icon.png" alt="icon" />
                  </div>
                  <h5>Do you need help</h5>
                  <p>Just let us know how we can help you and we will try to find a solution as soon as possible.</p>
                  <Link href="contact" className="cmn-btn mt-4">
                    Chat with Us
                  </Link>
                </div>
              </div>
              <div className="col-xxl-9 col-lg-8 cus-mar">
                <div className="single-content">
                  <div className="head-area d-flex align-items-center justify-content-between">
                    <h5>CUSTOMER DETAILS</h5>
                  </div>
                  <div className="main-content">
                    <div className="single-box">
                      <ul>
                        <li>
                          <span>Name</span>
                          <span>:</span>
                          <span>{customer.first_name}</span>
                        </li>
                        <li>
                          <span>Other Names</span>
                          <span>:</span>
                          <span>{customer?.other_names}</span>
                        </li>
                        <li>
                          <span>Gender</span>
                          <span>:</span>
                          <span>{customer?.gender}</span>
                        </li>
                      </ul>
                      <Link href="#">
                        <img src="/images/icon/update-btn.png" alt="icon" />
                      </Link>
                    </div>
                  </div>
                  <div className="head-area mt-5 d-flex align-items-center justify-content-between">
                    <h5>Email Addresses</h5>
                  </div>
                  <div className="main-content">
                    <div className="single-box">
                      <ul>
                        <li>
                          <span>Email</span>
                          <span>:</span>
                          <span>{customer.email}</span>
                        </li>
                      </ul>
                      <Link href="#">
                        <img src="/images/icon/update-btn.png" alt="icon" />
                      </Link>
                    </div>
                  </div>
                  <div className="head-area mt-5 d-flex align-items-center justify-content-between">
                    <h5>Phone</h5>
                  </div>
                  <div className="main-content">
                    <div className="single-box">
                      <ul>
                        <li>
                          <span>Phone</span>
                          <span>:</span>
                          <span>{customer?.mobile}</span>
                        </li>
                      </ul>
                      <Link href="#">
                        <img src="/images/icon/update-btn.png" alt="icon" />
                      </Link>
                    </div>
                  </div>
                  <div className="head-area mt-5 d-flex align-items-center justify-content-between">
                    <h5>Description</h5>
                  </div>
                  <div className="main-content">
                    <div className="single-box">
                      <ul>
                        <li>
                          <span>Phone</span>
                          <span>:</span>
                          <span>{customer?.description}</span>
                        </li>
                      </ul>
                      <Link href="#">
                        <img src="/images/icon/update-btn.png" alt="icon" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CustomerProfile;