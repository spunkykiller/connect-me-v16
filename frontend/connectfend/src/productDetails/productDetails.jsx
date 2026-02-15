import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import productData from "../data/productData";
import SEO from "../components/SEO";
import "./productDetails.css";

import cloudgateImg from "../assets/products/Cloudgate mini.webp";
import wirnetIndoorImg from "../assets/products/Wirnet LoraWan indoor gateway.webp";
import wirnetOutdoorImg from "../assets/products/wirnet istation lorawan outdoor gateway.webp";
import tosiFavicon from "../assets/tosi_fevicon.png";

// --- TOSI SPECIFIC DATA (Parsed from Sheet Tab 55) ---
const TOSI_GENERAL_DESC = `Tosi has automated secure connectivity and made it simple. It is a standardized way of building VPN connections based on a patented connection method. The configuration-free Plug & Go™ implementation is easy and ready to use within minutes. The unique feature of Tosi technology is the two-way connectivity that brings the benefits of IP networking plus remote maintenance with one technology. Tosi is ISO27001 certified, underlining the importance we place on protecting customers´ data. Platform security is based on automated firewall settings and point-to-point VPN technology with 256 Bit AES data encryption. Tosi Platform supports Layer 2 and layer 3 routing functions and protocols.`;

const TOSI_VARIANTS = [
  {
    id: 'hub',
    name: 'Tosi Hub',
    overview: `Tosi HUB—your gateway to building scalable, secure, and centrally managed VPN networks with unparalleled flexibility and performance. Cut access management work time from days into minutes! Tosi HUB is the cornerstone of constructing professional and secure networks comprising a large number of sites and users. It is the VPN tunnel concentrator maintaining persistent connections to Tosi Nodes while enforcing fine grained access controls.`,
    specs: `• Enhanced cybersecurity through network segmentation
• Centralized user and access management
• Continuous 24/7 data collection and management
• Audit trail and network monitoring
• Data routing according to regulations and requirements`
  },
  {
    id: 'key',
    name: 'Tosi Key',
    overview: `Tosi Key is an intelligent cryptoprocessing device that enables a secure connection between your computer and one or more Tosi Node, giving you a full visibility and control over the network devices connected to the Node.`,
    specs: `Connections are established through a secure, encrypted VPN tunnel over the Internet or other common WANs and LANs, and permissions can be easily granted, revoked and configured in an unlimited number of ways. Tosi Key comes with a durable light metal alloy casing.`
  },
  {
    id: '175',
    name: 'Tosi 175',
    overview: `Tosi 175 is a cost-effective Plug & GoTM connectivity device and is ideal for demanding industry sectors that require an all-in-one solution that is compact, able to handle all environments and suited to global market usage. The 4G module and external 4G antenna provides stable Internet access, so the node can be easily configured anywhere`,
    specs: `Ports :
• 1 x RJ-45 WAN connection, 10/100 Mb/s, auto-negotiation (MDI / MDI-X)
• 1 x RJ-45 LAN connection, 10/100 Mb/s, auto-negotiation(MDI / MDI-X)
• LAN can be assigned as Service connection, 10/100 Mb/s, auto-negotiation (MDI / MDI-X)
• RS485 port is not supported in the software.
Connections :
• 9-35V DC
• 2 x WiFi antenna connector, RP-SMA Male
• 1 x LTE antenna connector, SMA Female
• DIN rail attachment (back)
• Maximum power consumption 10W`
  },
  {
    id: '350',
    name: 'Tosi 350',
    overview: `the Tosi 350: Tailored for businesses seeking a compact, all-encompassing solution that operates seamlessly across the globe. With its fixed ethernet interface and WiFi you can enjoy stable remote access wherever you are. No technical expertise is needed – just plug and play`,
    specs: `Ports :
• 1 x RJ-45 WAN connection, 10/100 Mbps, auto-negotiation (MDI / MDI-X)
• 4 x RJ-45 LAN connection, 10/100 Mbps, auto-negotiation (MDI / MDI-X)
• 1 x USB 2.0, type A
Connections :
• 2 pin industrial DC power socket
• 6-Pin 3.5mm Digital IO socket (6-Pin serial interface not supported in software)
• 5-35V DC, reverse polarity protection, voltage surge/transient protection
• 1 x RP-SMA for WiFi
• DIN rail mounting in the back
• Maximum power consumption 10W`
  },
  {
    id: '375',
    name: 'Tosi 375',
    overview: `Tosi 375 - Your workhorse for any industry. If you are in a business that needs a compact, allin-one solution that can work nearly anywhere in the world, Tosi 375 is for you! With its fixed ethernet interface, WiFi, or internal LTE module complemented with external antennas, you can enjoy stable remote access wherever you are.`,
    specs: `Ports :
• 1 x RJ-45 WAN connection, 10/100 Mbps, auto-negotiation (MDI / MDI-X)
• 4 x RJ-45 LAN connection, 10/100 Mbps, auto-negotiation (MDI / MDI-X)
• 1 x USB 2.0, type A
Connections :
• 2-pin industrial DC power socket
• 6-pin 3.5mm digital IO socket (6-pin serial interface not supported in software)
• 5-35V DC, reverse polarity protection, voltage surge/transient protection
• 1 x RP-SMA for WiFi
• 2 x SMA for LTE
• DIN rail mounting in the back
• Maximum power consumption 10W`
  },
  {
    id: '610',
    name: 'Tosi 610',
    overview: `Tosi 610 is a perfect choice for professional applications when wireless networking is not required. Leading edge cybersecurity technology from Tosi enable diverse application scenarios. The durable aluminium alloy shell and small form factor is ideal for rugged mounting conditions.`,
    specs: `Ports
• 1 x RJ-45 WAN connection, 10/100/1000 Mb/s, autonegotiation (MDI / MDI-X)
• 3 x RJ-45 LAN connection, 10/100/1000 Mb/s, autonegotiation (MDI / MDI-X)
• 1 x USB 2.0, type A
Connections
• 4 pin industrial DC power socket
• 9-50V DC, reverse polarity protection, voltage surge/
transient protection
• DIN rail mounting slot in the back
• Maximum power consumption 6W`
  },
  {
    id: '675',
    name: 'Tosi 675',
    overview: `Tosi 675 is a powerful device for high demanding application in demanding industrial environments. With a wide range of connectivity interfaces the demand for always on connectivity is guaranteed. This device can be used in power-hungry industrial applications where speed and robustness are at the heart of the solution.`,
    specs: `Ports
• 1 x RJ-45 WAN connection, 10/100/1000 Mb/s, autonegotiation (MDI / MDI-X)
• 3 x RJ-45 LAN connection, 10/100/1000 Mb/s, autonegotiation (MDI / MDI-X)
• 1 x USB 2.0, type A
Connections
• 4 pin industrial DC power socket
• 9-50V DC, reverse polarity protection,
voltage surge/transient protection
• 2 x RP-SMA for WiFi
• 2 x SMA for LTE
• 1 x GNSS
• DIN rail mounting slot in the back and on both sides
• Maximum power consumption 16W`
  },
  {
    id: '695',
    name: 'Tosi 695',
    overview: `Unleash the power of 5G cellular connectivity and LTE fallback with the Tosi 695 - a game-changer for networking professionals! Crafted with precision and engineered for toughness, the Tosi 695 boasts a robust metal alloy casing complemented by an extensive temperature range and an IP30 Ingress Protection Rating. It's built to thrive in challenging environmental conditions.`,
    specs: `Ports
• 1 x RJ-45 WAN connection, 10/100/1000 Mb/s, autonegotiation (MDI / MDI-X)
• 4 x RJ-45 LAN connection, 10/100/1000 Mb/s, autonegotiation (MDI / MDI-X)
• 1 x USB 2.0, type A
Connections
• 4 pin industrial DC power socket
• 9-50V DC, reverse polarity protection,
voltage surge/transient protection
• 2 x RP-SMA for WiFi
• 4 x SMA for 5G/LTE
• 1 x GNSS
• DIN rail mounting slot in the back and on both sides
• Maximum power consumption 18W`
  },
  {
    id: 'lock500',
    name: 'Tosi Lock 500',
    overview: `Tosi Lock 500 is a high-end connectivity device bringing unprecedented possibilities for customers to manage their operations and to build new IoT solutions. The Lock 500 is ideal for demanding industrial environments and opens up new opportunities in security and office networking sectors. The Lock 500 is compatible with all existing Tosi products.`,
    specs: `Ports
• 1 x USB 2.0, type A
• 1 x RJ-45 WAN connection, 10/100 Mb/s, auto-negotiation (MDI / MDI-X)
• 3 x RJ-45 LAN connection, 10/100 Mb/s, auto-negotiation (MDI / MDI-X)
• LAN3 can be assigned as Service connection, 10/100 Mb/s, auto-negotiation (MDI / MDI-X)
Connections
• 12-48V DC (+/-20%), reverse polarity protected
• Device frame connector
• 2 x WiFi antenna connector, RP-SMA Female
• (TBL5i*) 2 x LTE antenna connectors, SMA Female
• 2 x Digital Input, 2 x Digital Output, 24V DC out
• DIN rail attachment (back)
• Maximum power consumption 10W`
  }
];


export default function ProductDetails() {
  const { category, subcategory, productId, variantId } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [activeTab, setActiveTab] = useState('features');
  const [isVariantParentPage, setIsVariantParentPage] = useState(false);

  // For specialized views
  const [isTosiPage, setIsTosiPage] = useState(false);
  const [activeTosiVariant, setActiveTosiVariant] = useState(TOSI_VARIANTS[0]);



  useEffect(() => {
    // 1. Find Product & Context
    let foundProduct = null;
    let foundCat = null;
    let foundSub = null;
    let parentProduct = null; // To keep track of parent if we are in a variant

    // Reset special views
    setIsTosiPage(false);
    setIsVariantParentPage(false);

    if (productId) {
      // Check for specialized Tosibox ID
      if (productId === 'tosi-industrial-gateway' || productId === 'tosibox-industrial-gateway') {
        setIsTosiPage(true);
      }

      for (const cat of productData) {
        for (const sub of cat.subcategories) {
          const found = sub.products.find(p => p.id === productId);
          if (found) {
            foundProduct = found;
            foundCat = cat;
            foundSub = sub;

            // Check if this is a variant URL
            if (variantId && foundProduct.variants) {
              const variant = foundProduct.variants.find(v => v.id === variantId);
              if (variant) {
                parentProduct = foundProduct; // Store parent
                foundProduct = variant; // Set current product to variant
              }
            }
            // Check if parent product has variants (for parent page)
            else if (foundProduct.variants && !variantId) {
              setIsVariantParentPage(true);
            }

            break;
          }
        }
        if (foundProduct) break;
      }
    }

    if (!foundProduct) {
      setProduct(null);
    } else {
      setProduct(foundProduct);

      // 2. Set Breadcrumbs
      const crumbs = [
        { label: "Products", path: "/products" },
        { label: foundCat.category, path: `/products/${foundCat.slug}` },
        { label: foundSub.name, path: `/products/${foundCat.slug}/${foundSub.slug}` }
      ];

      // If it's a variant, add parent to breadcrumbs
      if (parentProduct) {
        crumbs.push({ label: parentProduct.name, path: `/products/${foundCat.slug}/${foundSub.slug}/${parentProduct.id}` });
      }

      crumbs.push({ label: foundProduct.name, path: "#" });
      setBreadcrumbs(crumbs);

      // 3. Set Related 
      if (parentProduct) {
        // If variant, show other variants from same parent
        setRelatedProducts(parentProduct.variants
          .filter(v => v.id !== foundProduct.id)
          .map(v => ({ ...v, isVariant: true, parentId: parentProduct.id }))
        );
      } else {
        // Generic: Same subcategory, exclude self
        setRelatedProducts(foundSub.products
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4)
          .map(p => ({ ...p, isVariant: false }))
        );
      }
    }
  }, [productId, variantId, category, subcategory]);

  if (!product) return <div className="pd-not-found">Loading or Product Not Found...</div>;

  // --- Helper to parse/render specs for Tosibox/LoRaWAN ---
  const renderSpecializedSpecs = (specsString) => {
    // ... (existing code)
  };

  const traverseBack = () => {
    // Navigate back to the subcategory list if possible, or main products page
    if (category && subcategory) {
      return `/products/${category}/${subcategory}`;
    }
    return "/products";
  };

  // --- SPECIALIZED VIEW FOR TOSI ---
  if (isTosiPage) {
    return (
      <div className="pd-page pd-tosi-theme">
        <SEO
          title={`${product.name} - ConnectME`}
          description={TOSI_GENERAL_DESC.substring(0, 160)}
        />

        {/* BACK BUTTON */}
        <div className="pd-back-wrapper">
          <Link to={traverseBack()} className="pd-back-btn" aria-label="Go Back">
            <FaArrowLeft />
          </Link>
        </div>

        {/* BREADCRUMBS */}
        <div className="pd-breadcrumb">
          {breadcrumbs.map((b, i) => (
            <span key={i}>
              {b.path !== "#" ? <Link to={b.path}>{b.label}</Link> : <span>{b.label}</span>}
              {i < breadcrumbs.length - 1 && " / "}
            </span>
          ))}
        </div>

        {/* HERO SECTION - Modified for Tosi */}
        <div className="pd-hero pd-tosi-hero">
          <div className="pd-hero-content">
            <h1 className="pd-title">{product.name}</h1>
            <div className="pd-overview pd-tosi-general-desc">
              <p>{TOSI_GENERAL_DESC}</p>
            </div>
            <div className="pd-actions">
              <Link to="/contact" className="btn-primary">Request a Quote</Link>
              {product.brochure && (
                <a href={product.brochure} target="_blank" rel="noreferrer" className="btn-secondary">
                  Download Sheet
                </a>
              )}
            </div>
          </div>
          <div className="pd-hero-image">
            <img src={product.image} alt={product.name} />
            <img src={tosiFavicon} alt="Tosi Overlay" className="tosi-hero-overlay" />
          </div>
        </div>

        {/* MAIN CONTENT AREA - VARIANT TABS */}
        <div className="pd-content pd-tosi-content">
          <h2 className="section-title">Product Variants</h2>

          <div className="pd-tabs pd-tosi-tabs">
            {TOSI_VARIANTS.map((variant) => (
              <button
                key={variant.id}
                className={`pd-tab-btn ${activeTosiVariant.id === variant.id ? 'active' : ''}`}
                onClick={() => setActiveTosiVariant(variant)}
              >
                {variant.name}
              </button>
            ))}
          </div>

          <div className="pd-tab-content pd-tosi-variant-panel">
            <h3 className="variant-title">{activeTosiVariant.name}</h3>

            <div className="variant-overview">
              <h4>Overview</h4>
              <p>{activeTosiVariant.overview}</p>
            </div>

            <div className="variant-specs">

              {renderSpecializedSpecs(activeTosiVariant.specs)}
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="pd-related-section">
              <h2 className="section-title">Related Products</h2>
              <div className="related-grid">
                {relatedProducts.map(rp => (
                  <Link to={`/products/${category}/${subcategory}/${rp.id}`} key={rp.id} className="related-card">
                    <div className="related-img">
                      <img src={rp.image} alt={rp.name} />
                    </div>
                    <h4 className="related-title">{rp.name}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- VARIANT PARENT PAGE VIEW ---
  if (isVariantParentPage && product.variants) {
    return (
      <div className="pd-page">
        <SEO
          title={`${product.name} - ConnectME`}
          description={product.description || "High-performance LoRaWAN gateways for industrial IoT connectivity."}
        />

        {/* BACK BUTTON */}
        <div className="pd-back-wrapper">
          <Link to={traverseBack()} className="pd-back-btn" aria-label="Go Back">
            <FaArrowLeft />
          </Link>
        </div>

        {/* BREADCRUMBS */}
        <div className="pd-breadcrumb">
          {breadcrumbs.map((b, i) => (
            <span key={i}>
              {b.path !== "#" ? <Link to={b.path}>{b.label}</Link> : <span>{b.label}</span>}
              {i < breadcrumbs.length - 1 && " / "}
            </span>
          ))}
        </div>
        {/* HERO SECTION */}
        <div className="pd-hero">
          <div className="pd-hero-content">
            <h1 className="pd-title">{product.name}</h1>
            <div className="pd-overview">
              <p>{product.overview || product.description}</p>
            </div>
            <div className="pd-actions">
              <Link to="/contact" className="btn-primary">Request a Quote</Link>
            </div>
          </div>
          <div className="pd-hero-image">
            <img src={product.image} alt={product.name} loading="lazy" />
          </div>
        </div>

        {/* VARIANT CARDS GRID */}
        <div className="pd-content">
          <h2 className="section-title">Product Variants</h2>

          <div className="unified-products-grid" style={{ marginTop: '40px' }}>
            {product.variants.map((variant) => (
              <div key={variant.id} className="premium-product-card">
                <div className="product-image-wrapper">
                  <img src={variant.image} alt={variant.name} className="product-image" loading="lazy" />
                </div>
                <div className="product-details">
                  <div className="product-subtitle">GATEWAYS & CONNECTIVITY</div>
                  <h3 className="product-title">{variant.name}</h3>

                  <p className="product-description">{variant.description}</p>

                  <div className="product-specs-preview">
                    {variant.specs && Object.entries(variant.specs).slice(0, 3).map(([key, val]) => (
                      <div className="spec-row" key={key}>
                        <span className="spec-key">{key}</span>
                        <span className="spec-val" title={val}>{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="product-tags">
                    {variant.tags && variant.tags.map((tag, idx) => (
                      <span key={idx} className="tag-badge">{tag}</span>
                    ))}
                  </div>

                  <Link
                    to={`/products/${category}/${subcategory}/${productId}/${variant.id}`}
                    className="view-more-link"
                  >
                    View Product →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }



  // --- GENERIC VIEW (Old Layout) ---
  return (
    <div className="pd-page">
      <SEO
        title={`${product.name} - ConnectME Product`}
        description={product.description ? product.description.substring(0, 160) : "ConnectME Industrial IoT Product"}
      />

      {/* BREADCRUMBS */}
      <div className="pd-breadcrumb">
        {breadcrumbs.map((b, i) => (
          <span key={i}>
            {b.path !== "#" ? <Link to={b.path}>{b.label}</Link> : <span>{b.label}</span>}
            {i < breadcrumbs.length - 1 && " / "}
          </span>
        ))}
      </div>

      {/* HERO SECTION */}
      <div className="pd-hero">
        <div className="pd-hero-content">
          <h1 className="pd-title">{product.name}</h1>
          {product.overview && (
            <div className="pd-overview">
              {product.overview.split('\n').map((para, i) => <p key={i}>{para}</p>)}
            </div>
          )}

          <div className="pd-actions">
            <Link to="/contact" className="btn-primary">Request a Quote</Link>
            {product.brochure ? (
              <a href={product.brochure} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Download Datasheet
              </a>
            ) : (
              <button className="btn-secondary" disabled>Download Datasheet (Coming Soon)</button>
            )}
          </div>
        </div>
        <div className="pd-hero-image">
          <img src={product.image} alt={product.name} />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="pd-content">

        {/* TABS NAVIGATION */}
        <div className="pd-tabs">
          <button
            className={`pd-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Key Features
          </button>
          {product.specs && (
            <button
              className={`pd-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
          )}
          {(product.dimensions || product.technicalFlow || product.dimensionsDescription) && (
            <button
              className={`pd-tab-btn ${activeTab === 'dimensions' ? 'active' : ''}`}
              onClick={() => setActiveTab('dimensions')}
            >
              Dimensions & Flow
            </button>
          )}
          {(product.orderCodes || product.orderCodesDescription) && (
            <button
              className={`pd-tab-btn ${activeTab === 'order' ? 'active' : ''}`}
              onClick={() => setActiveTab('order')}
            >
              Order Codes
            </button>
          )}
          {(product.application || product.applicationDescription) && (
            <button
              className={`pd-tab-btn ${activeTab === 'application' ? 'active' : ''}`}
              onClick={() => setActiveTab('application')}
            >
              Applications
            </button>
          )}
          {relatedProducts.length > 0 && (
            <button
              className={`pd-tab-btn ${activeTab === 'related' ? 'active' : ''}`}
              onClick={() => setActiveTab('related')}
            >
              Related Products
            </button>
          )}
        </div>

        {/* TAB CONTENT */}
        <div className="pd-tab-content">

          {/* FEATURES TAB */}
          {activeTab === 'features' && (
            <section className="pd-tab-panel">
              <h2 className="section-title">Key Features</h2>
              <ul className="pd-features-list">
                {product.features?.map((f, i) => (
                  <li key={i}>{f}</li>
                )) || <p>No specific features listed.</p>}
              </ul>
            </section>
          )}

          {/* SPECS TAB - With Optional 2-Column Controller Specs */}
          {activeTab === 'specs' && product.specs && (
            <section className="pd-tab-panel">
              <h2 className="section-title">Specifications</h2>
              {product.controllerSpecs ? (
                <div className="pd-dual-specs-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
                  <div className="specs-column">
                    <h3 className="specs-col-title" style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#0eb582', fontWeight: '600' }}>Valve Specification</h3>
                    <div className="pd-specs-table-wrapper">
                      <table className="pd-specs-table">
                        <tbody>
                          {Object.entries(product.specs).map(([key, val]) => (
                            <tr key={key}>
                              <td className="spec-label">{key}</td>
                              <td className="spec-value">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="specs-column">
                    <h3 className="specs-col-title" style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#262626', fontWeight: '600', backgroundColor: '#f5f5f5', padding: '5px 10px', borderRadius: '4px', display: 'inline-block' }}>Controller Unit (CU) Specification</h3>
                    <div className="pd-specs-table-wrapper">
                      <table className="pd-specs-table">
                        <tbody>
                          {Object.entries(product.controllerSpecs).map(([key, val]) => (
                            <tr key={key}>
                              <td className="spec-label">{key}</td>
                              <td className="spec-value">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                /* Default Single Spec Table */
                <div className="pd-specs-table-wrapper">
                  <table className="pd-specs-table">
                    <tbody>
                      {Object.entries(product.specs).map(([key, val]) => (
                        <tr key={key}>
                          <td className="spec-label">{key}</td>
                          <td className="spec-value">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* DIMENSIONS & FLOW TAB */}
          {activeTab === 'dimensions' && (
            <section className="pd-tab-panel">
              {product.technicalFlow && (
                <>
                  <h2 className="section-title">Technical Specifications - Flow</h2>
                  <div className="pd-specs-table-wrapper">
                    <table className="pd-data-table">
                      <thead>
                        <tr>
                          {product.technicalFlowColumns ? (
                            product.technicalFlowColumns.map((col, i) => <th key={i}>{col.label}</th>)
                          ) : (
                            <>
                              <th>Nominal Diameter (DN)</th>
                              <th>Minimum Flow qmin (m³/h)</th>
                              <th>Nominal Flow qp (m³/h)</th>
                              <th>Maximum Flow qmax (m³/h)</th>
                              <th>Length (mm)</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {product.technicalFlow.map((row, i) => (
                          <tr key={i}>
                            {product.technicalFlowColumns ? (
                              product.technicalFlowColumns.map((col, j) => <td key={j}>{row[col.key]}</td>)
                            ) : (
                              <>
                                <td>{row.dn}</td>
                                <td>{row.min}</td>
                                <td>{row.nominal}</td>
                                <td>{row.max}</td>
                                <td>{row.length}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {product.dimensionsDescription && (
                <div style={{ marginBottom: '20px', whiteSpace: 'pre-line', fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                  <h2 className="section-title">Dimensions</h2>
                  {product.dimensionsDescription}
                </div>
              )}

              {product.dimensions && (
                <>
                  <h2 className="section-title">Dimensions</h2>
                  <div className="pd-specs-table-wrapper">
                    <table className="pd-data-table">
                      <thead>
                        <tr>
                          {product.dimensionsColumns ? (
                            product.dimensionsColumns.map((col, i) => <th key={i}>{col.label}</th>)
                          ) : (
                            <>
                              <th>Nominal Diameter (DN)</th>
                              <th>Thread Size</th>
                              <th>Length (L)</th>
                              <th>Width (W)</th>
                              <th>Height (H)</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {product.dimensions.map((row, i) => (
                          <tr key={i}>
                            {product.dimensionsColumns ? (
                              product.dimensionsColumns.map((col, j) => <td key={j}>{row[col.key]}</td>)
                            ) : (
                              <>
                                <td>{row.dn}</td>
                                <td>{row.thread}</td>
                                <td>{row.length}</td>
                                <td>{row.width}</td>
                                <td>{row.height}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </section>
          )}

          {/* ORDER CODES TAB */}
          {activeTab === 'order' && (product.orderCodes || product.orderCodesDescription) && (
            <section className="pd-tab-panel">
              <h2 className="section-title">Order Code</h2>

              {product.orderCodesDescription && (
                <div style={{ marginBottom: '20px', whiteSpace: 'pre-line', fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                  {product.orderCodesDescription}
                </div>
              )}

              {product.orderCodes && (
                <div className="pd-specs-table-wrapper">
                  <table className="pd-data-table">
                    <thead>
                      <tr>
                        {product.orderCodeColumns ? (
                          product.orderCodeColumns.map((col, i) => (
                            <th key={i}>{col.label}</th>
                          ))
                        ) : (
                          // Fallback for existing U51 data if not updated
                          <>
                            <th>Size</th>
                            <th>Flow Rate (m³/h)</th>
                            <th>M-Bus (U5111)</th>
                            <th>wM-Bus (U5112)</th>
                            <th>Modbus RTU (U5114)</th>
                            <th>NB-IoT (U5116)</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {product.orderCodes.map((row, i) => (
                        <tr key={i}>
                          {product.orderCodeColumns ? (
                            product.orderCodeColumns.map((col, j) => (
                              <td key={j}>{row[col.key]}</td>
                            ))
                          ) : (
                            <>
                              <td>{row.dn}</td>
                              <td>{row.flow}</td>
                              <td>{row.mbus}</td>
                              <td>{row.wmbus}</td>
                              <td>{row.modbus}</td>
                              <td>{row.nbiot}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* APPLICATION TAB */}
          {activeTab === 'application' && (product.application || product.applicationDescription) && (
            <section className="pd-tab-panel">
              <h2 className="section-title">Applications</h2>

              {product.applicationDescription && (
                <div style={{ marginBottom: '20px', whiteSpace: 'pre-line', fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                  {product.applicationDescription}
                </div>
              )}

              {product.application && (
                Array.isArray(product.application) ? (
                  <ul className="pd-features-list">
                    {product.application.map((app, i) => (
                      <li key={i}>{app}</li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ whiteSpace: 'pre-line', fontSize: '15px', color: '#555', lineHeight: '1.6' }}>
                    {product.application}
                  </div>
                )
              )}
            </section>
          )}

          {/* RELATED TAB */}
          {activeTab === 'related' && relatedProducts.length > 0 && (
            <section className="pd-tab-panel pd-related">
              <h2 className="section-title">Related Products</h2>
              <div className="related-grid">
                {relatedProducts.map(rp => (
                  <Link
                    to={rp.isVariant
                      ? `/products/${category}/${subcategory}/${rp.parentId}/${rp.id}`
                      : `/products/${category}/${subcategory}/${rp.id}`
                    }
                    key={rp.id}
                    className="related-card"
                  >
                    <div className="related-img">
                      <img src={rp.image} alt={rp.name} />
                    </div>
                    <h4 className="related-title">{rp.name}</h4>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

    </div>
  );
}
