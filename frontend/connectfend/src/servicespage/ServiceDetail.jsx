import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import serviceData from "../data/serviceData";
import { FaCheckCircle } from "react-icons/fa";
import "../productDetails/productDetails.css"; // Reusing PDP styles where possible
import "./serviceDetail.css"; // Specific service styles

export default function ServiceDetail() {
    const { category, serviceId } = useParams();
    const [service, setService] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [dashboardIndex, setDashboardIndex] = useState(0);
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    useEffect(() => {
        // Find Service
        let foundService = null;
        let foundCat = null;

        if (serviceId) {
            foundCat = serviceData.find(c => c.slug === category);
            if (foundCat) {
                foundService = foundCat.items.find(i => i.id === serviceId);
            }
        }

        if (foundService) {
            setService(foundService);
            setBreadcrumbs([
                { label: foundCat.category, path: "#" },
                { label: foundService.name, path: "#" }
            ]);
        }
    }, [category, serviceId]);

    // Dashboard Carousel Logic
    useEffect(() => {
        if (service && service.softwareDashboard && service.softwareDashboard.length > 1) {
            const interval = setInterval(() => {
                setDashboardIndex((prev) => (prev + 1) % service.softwareDashboard.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [service]);

    const nextDashboard = () => {
        if (service && service.softwareDashboard) {
            setDashboardIndex((prev) => (prev + 1) % service.softwareDashboard.length);
        }
    };

    const prevDashboard = () => {
        if (service && service.softwareDashboard) {
            setDashboardIndex((prev) => (prev - 1 + service.softwareDashboard.length) % service.softwareDashboard.length);
        }
    };

    // Carousel Logic
    useEffect(() => {
        if (service && service.heroImages && service.heroImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % service.heroImages.length);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [service]);

    if (!service) return <div className="pd-not-found">Loading or Service Not Found...</div>;

    return (
        <div className="pd-page service-page">

            {/* BREADCRUMBS */}
            <div className="pd-breadcrumb">
                {breadcrumbs.map((b, i) => (
                    <span key={i}>
                        <span>{b.label}</span>
                        {i < breadcrumbs.length - 1 && " / "}
                    </span>
                ))}
            </div>

            {/* HERO SECTION */}
            <div className="pd-hero service-hero">
                <div className="pd-hero-content">
                    <h1 className="pd-title">{service.name}</h1>
                    <p className="pd-tagline">{service.description}</p>

                    <div className="pd-actions">
                        <Link to="/contact" className="btn-primary">Request Consultation</Link>
                        {service.brochure && (
                            <a href={service.brochure} download className="btn-secondary">
                                Download Brochure
                            </a>
                        )}
                    </div>
                </div>
                <div className="pd-hero-image">
                    {service.heroImages && service.heroImages.length > 0 ? (
                        <div className="hero-carousel">
                            {service.heroImages.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`${service.name} ${index + 1}`}
                                    className={`carousel-image ${index === currentImageIndex ? "active" : ""}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <img src={service.heroImage} alt={service.name} />
                    )}
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="pd-content">

                {/* OVERVIEW CONTENT */}
                {service.content && (
                    <section className="pd-section">
                        <h2 className="section-title">Overview</h2>
                        <div className="service-text-block">
                            {service.content.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </section>
                )}

                {/* OFFERINGS SECTION (Utility Billing specific) */}
                {service.offerings && (
                    <section className="pd-section offerings-section">
                        <h2 className="section-title">Our Offerings</h2>
                        <div className="offerings-list">
                            {service.offerings.map((offering, i) => (
                                <div key={i} className="offering-item">
                                    {offering}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* SOLUTIONS FOR SECTION (Utility Billing specific) */}
                {service.solutionsFor && (
                    <section className="pd-section solutions-for-section">
                        <h2 className="section-title">Our one stop billing solutions offer headache free to</h2>
                        <ul className="solutions-for-list">
                            {service.solutionsFor.map((sol, i) => (
                                <li key={i}>{sol}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* FEATURES LIST (Simple) */}
                {service.features && (
                    <section className="pd-section">
                        <h2 className="section-title">Key Features</h2>
                        <ul className="pd-features-list">
                            {service.features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* SOFTWARE DASHBOARD CAROUSEL */}
                {service.softwareDashboard && (
                    <section className="pd-section dashboard-section">
                        <h2 className="section-title">Software Dashboard</h2>
                        <div className="dashboard-carousel">
                            <button className="dashboard-nav prev" onClick={prevDashboard}>&#10094;</button>

                            <div className="dashboard-display">
                                <img
                                    src={service.softwareDashboard[dashboardIndex]}
                                    alt={`Dashboard View ${dashboardIndex + 1}`}
                                    className="dashboard-image"
                                />
                            </div>

                            <button className="dashboard-nav next" onClick={nextDashboard}>&#10095;</button>
                        </div>
                        <div className="dashboard-dots">
                            {service.softwareDashboard.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`dot ${idx === dashboardIndex ? "active" : ""}`}
                                    onClick={() => setDashboardIndex(idx)}
                                ></span>
                            ))}
                        </div>
                    </section>
                )}

                {/* SUB ITEMS (Like MBus Reader) */}
                {service.subItems && (
                    <section className="pd-section">
                        <h2 className="section-title">Components</h2>
                        <div className="sub-items-accordion">
                            {service.subItems.map((sub, i) => (
                                <div key={i} className={`accordion-item ${openAccordion === i ? "active" : ""}`}>
                                    <div className="accordion-header" onClick={() => toggleAccordion(i)}>
                                        <h3 className="accordion-title">{sub.title}</h3>
                                        <span className="accordion-icon">{openAccordion === i ? "−" : "+"}</span>
                                    </div>
                                    <div className="accordion-body" style={{ maxHeight: openAccordion === i ? "1000px" : "0" }}>
                                        <div className="accordion-content">
                                            {sub.img && (
                                                <div className="sub-item-image-container">
                                                    <img src={sub.img} alt={sub.title} className={`sub-item-image ${sub.imgClass || ""}`} />
                                                </div>
                                            )}
                                            <p className="sub-item-desc">{sub.desc}</p>

                                            {/* Nested keyFeatures */}
                                            {sub.keyFeatures && (
                                                <div className="sub-item-list-container">
                                                    <h4 className="sub-item-list-title">Key Features</h4>
                                                    <ul className="sub-item-list">
                                                        {sub.keyFeatures.map((kf, k) => (
                                                            <li key={k}>{kf}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Nested technicalHighlights */}
                                            {sub.technicalHighlights && (
                                                <div className="sub-item-list-container">
                                                    <h4 className="sub-item-list-title">Technical Highlights</h4>
                                                    <ul className="sub-item-list">
                                                        {sub.technicalHighlights.map((th, k) => (
                                                            <li key={k}>{th}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Nested keyBenefits */}
                                            {sub.keyBenefits && (
                                                <div className="sub-item-list-container">
                                                    <h4 className="sub-item-list-title">Key Benefits</h4>
                                                    <ul className="sub-item-list">
                                                        {sub.keyBenefits.map((kb, k) => (
                                                            <li key={k}>{kb}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Nested multiLevelAlerts */}
                                            {sub.multiLevelAlerts && (
                                                <div className="sub-item-list-container">
                                                    {sub.multiLevelAlerts.map((alert, k) => (
                                                        <div key={k} className="alert-group">
                                                            <h5 className="alert-type">{alert.type}</h5>
                                                            <ul className="sub-item-list">
                                                                {alert.points.map((pt, p) => (
                                                                    <li key={p}>{pt}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* WHAT WE MONITOR (AQI specific) */}
                {service.whatWeMonitor && (
                    <section className="pd-section">
                        <h2 className="section-title">What We Monitor</h2>
                        <div className="where-grid">
                            {service.whatWeMonitor.map((item, i) => (
                                <div key={i} className="where-card">
                                    <h3 className="where-location">{item.param}</h3>
                                    <p className="where-benefit">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* HOW IT WORKS (AQI specific) */}
                {service.howItWorks && (
                    <section className="pd-section">
                        <h2 className="section-title">How Our System Works</h2>
                        <div className="how-it-works-grid">
                            {service.howItWorks.map((item, i) => (
                                <div key={i} className="how-card">
                                    <div className="how-number">{i + 1}</div>
                                    <div className="how-content">
                                        <h3 className="how-title">{item.title}</h3>
                                        <p className="how-desc">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* WHERE IT WORKS BEST (AQI specific) */}
                {service.whereItWorksBest && (
                    <section className="pd-section">
                        <h2 className="section-title">Where It Works Best</h2>
                        <div className="where-grid">
                            {service.whereItWorksBest.map((item, i) => (
                                <div key={i} className="where-card">
                                    <h3 className="where-location">{item.location}</h3>
                                    <p className="where-benefit">{item.benefit}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ORDER CODES TABLE */}
                {service.orderCodes && (
                    <section className="pd-section">
                        <h2 className="section-title">Order Information</h2>
                        <table className="pd-specs-table">
                            <thead>
                                <tr>
                                    <th className="spec-label">Product Name</th>
                                    <th className="spec-label">Order Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {service.orderCodes.map((code, i) => (
                                    <tr key={i}>
                                        <td className="spec-value">{code.title}</td>
                                        <td className="spec-value"><strong>{code.code}</strong></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

                {/* APPLICATIONS */}
                {service.applications && (
                    <section className="pd-section">
                        <h2 className="section-title">Applications</h2>
                        <div className="where-grid">
                            {service.applications.map((app, i) => (
                                <div key={i} className="where-card">
                                    <h3 className="where-location">{app}</h3>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* BENEFITS */}
                {service.benefits && (
                    <section className="pd-section">
                        <h2 className="section-title">Benefits</h2>
                        <ul className="pd-features-list benefits-list">
                            {service.benefits.map((b, i) => (
                                <li key={i}><FaCheckCircle className="feature-icon benefit-icon" /> {b}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* PARTNERS / EXTRA INFO */}
                {service.partners && (
                    <div className="service-partners">
                        <p><strong>Note:</strong> {service.partners}</p>
                    </div>
                )}

                {/* CONCLUSION SECTION */}
                {service.conclusion && (
                    <section className="pd-section conclusion-section">
                        <h2 className="section-title">Conclusion</h2>
                        <p className="conclusion-text">{service.conclusion}</p>
                    </section>
                )}

            </div>
        </div>
    );
}
