import React from "react";
import "./contact.css";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Map from "../assets/map.webp";
import SEO from "../components/SEO";

export default function Contact() {
    return (
        <div className="contact-section">
            <SEO
                title="Contact Us - ConnectME"
                description="Get in touch with ConnectME for smart metering and IoT inquiries. Offices in Dubai and Qatar."
            />
            <h1 className="contact-title">Get In Touch</h1>

            <form className="contact-form">

                <input
                    type="email"
                    placeholder="Email Address"
                    className="contact-input"
                />

                <input
                    type="text"
                    placeholder="Full Name"
                    className="contact-input"
                />

                <div className="two-inputs">
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="contact-input half"
                    />

                    <input
                        type="text"
                        placeholder="Subject"
                        className="contact-input half"
                    />
                </div>

                <textarea
                    placeholder="Message"
                    className="contact-textarea"
                />

                <button className="contact-btn1">Send Message</button>

            </form>
            <div className="ci-section">
                <h1 className="ci-title">Contact Information</h1>

                <div className="ci-grid">

                    {/* UAE Office */}
                    <div className="ci-card">
                        <div className="ci-bar"></div>
                        <div className="ci-content">
                            <FaMapMarkerAlt className="ci-icon" />

                            <h2 className="ci-heading">UAE Office</h2>

                            <p>
                                Warehouse-7, Al Qaseer Warehouse,<br />
                                Ras Al Khor Industrial area-2,<br />
                                Dubai - UAE.
                            </p>

                            <p>
                                Office : +971 4 234 8480 <br />
                                +971 4 234 9525<br />
                                Email: info@connectme.biz
                            </p>
                        </div>
                    </div>

                    {/* International Sales */}
                    <div className="ci-card">
                        <div className="ci-bar"></div>
                        <div className="ci-content">
                            <FaPhoneAlt className="ci-icon" />

                            <h2 className="ci-heading">International<br />Sales Inquiry</h2>

                            <p>
                                Email: sales@connectme.biz <br />
                                Mobile: +971 56 2250600
                            </p>
                        </div>
                    </div>

                    {/* Qatar Office */}
                    <div className="ci-card">
                        <div className="ci-bar"></div>
                        <div className="ci-content">
                            <FaMapMarkerAlt className="ci-icon" />

                            <h2 className="ci-heading">Qatar Office</h2>

                            <p>
                                First Floor, Building 98, Street 220,<br />
                                B-Ring Road, Zone 15,<br />
                                Doha, Qatar.
                            </p>

                            <p>
                                Mobile: +974 7135 2869 <br />
                                Email: sales.qat@connectme.biz
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="map-section">
                <iframe
                    title="ConnectME Dubai HQ"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.123!2d55.27!3d25.20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzAwLjAiTiA1NcKwMTYnMTIuMCJF!5e0!3m2!1sen!2sae!4v1612345678901!5m2!1sen!2sae"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="map-iframe"
                ></iframe>
            </div>
        </div>
    );
}
