import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logoimg from "../assets/logopng.png";
import offgridimg from "../assets/Offgridsolar.png";
import solarimg from "../assets/solarimg.png";
import hybridimg from "../assets/hybrid.png";
import { useSelector } from "react-redux";

const QuotationGenerator = () => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        state: "",
        quoteFor: "",
        systemType: "",
        capacity: "",
        rate: "",
        subsidy: "",
        maintenance: "",
        tataKit: "",
        battery: "",
        hour:"",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [unitRate, setUnitRate] = useState(0);
    const [logo] = useState(logoimg);
    const [solar] = useState(solarimg);
    const [Offgridsolar] = useState(offgridimg);
    const [hybrid] = useState(hybridimg);
    const user = useSelector((state) => state?.user);

    // Subsidy calculation
    let centralSubsidy = 0;
    let stateSubsidy = 0;
    let totalSubsidy = centralSubsidy + stateSubsidy;

    useEffect(() => {
        // Update unit rate based on quoteFor
        if (formData.quoteFor === "COMMERCIAL") {
            setUnitRate(12);
            setFormData((prev) => ({ ...prev, subsidy: "No" }));
        }
        if (formData.quoteFor === "RESIDENTIAL") {
            setUnitRate(7);
        }
        if(formData.quoteFor === "RWA") {
            setUnitRate(7);
        }
        if(formData.systemType === "Off-Grid" || formData.systemType === "Hybrid") {
            setFormData((prev) => ({ ...prev, tataKit: "No" }));
        }

    }, [formData.quoteFor , formData.systemType]);

    useEffect(() => {
        // Disable subsidy for Off-Grid systems
        if (formData.systemType === "Off-Grid") {
            setFormData((prev) => ({ ...prev, subsidy: "No" }));
        }
    }, [formData.systemType]);

      useEffect(() => {
        // Disable subsidy for Off-Grid systems
        if (formData.systemType === "On-Grid") {
            setFormData((prev) => ({ ...prev, battery: "No" }));
            setFormData((prev) => ({ ...prev, hour: "" }));
            
        }
    }, [formData.systemType]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (
            !formData.name ||
            !formData.mobile ||
            !formData.state ||
            !formData.quoteFor ||
            !formData.systemType ||
            !formData.capacity ||
            !formData.rate ||
            !formData.maintenance ||
            !formData.subsidy 
        ) {
            setError("Please fill all required fields.");
            setSuccess("");
            return false;
        }

        if (!/^[0-9]{10}$/.test(formData.mobile)) {
            setError("Mobile number must be 10 digits.");
            setSuccess("");
            return false;
        }

        if (isNaN(parseFloat(formData.capacity)) || parseFloat(formData.capacity) <= 0) {
            setError("Please enter a valid capacity.");
            setSuccess("");
            return false;
        }

        if (isNaN(parseFloat(formData.rate)) || parseFloat(formData.rate) <= 0) {
            setError("Please enter a valid rate.");
            setSuccess("");
            return false;
        }

        setError("");
        return true;
    };

    const generatePDF = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setSuccess("");

        try {
            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const {
                name,
                mobile,
                state,
                tataKit,
                subsidy,
                maintenance,
                quoteFor,
                systemType,
                capacity,
                rate,
                battery,
                hour,
            } = formData;

            const totalPrice = parseFloat(capacity) * parseFloat(rate);
            const today = new Date().toLocaleDateString();
              // Calculate GBI values for ROI table
            let EnergyGenerationPerMonth = parseFloat(capacity) * 120; // 120 units per KW per month
            let EnergyGenerationPerYear = EnergyGenerationPerMonth * 12; // Yearly generation
            let incostumerAccount = 0 ; // Assuming 2 INR per unit
            let FiveYearsGBI = 0; // 5 years

            // Calculate subsidies
            if (quoteFor === "RESIDENTIAL" && systemType === "On-Grid" && state === "Delhi" && subsidy === "Yes" ) {
                centralSubsidy = 78000;
                stateSubsidy = 30000;
                
                incostumerAccount = capacity <= 3  ? EnergyGenerationPerMonth * 3  : capacity <= 10  ? EnergyGenerationPerMonth * 2  : 0;
                FiveYearsGBI = incostumerAccount*60;
                

            }
            if (quoteFor === "RESIDENTIAL" && systemType === "On-Grid" && state === "Delhi" && subsidy === "No" ) {
                centralSubsidy = 0;
                stateSubsidy = 0;
                
                incostumerAccount = capacity <= 3  ? EnergyGenerationPerMonth * 3  : capacity <= 10  ? EnergyGenerationPerMonth * 2  : 0;
                FiveYearsGBI = incostumerAccount*60;

            }
             if (quoteFor === "COMMERCIAL" && systemType === "On-Grid" && state === "Delhi"  ) {
                centralSubsidy = 0;
                stateSubsidy = 0;
                incostumerAccount = capacity <= 200000  ? EnergyGenerationPerMonth * 1  : capacity >= 1  ? EnergyGenerationPerMonth * 1  : 0;
                FiveYearsGBI = incostumerAccount*60;
            }

            if (quoteFor === "RWA" && systemType === "On-Grid" && state === "Delhi" && subsidy === "Yes" ) {
                centralSubsidy = capacity*18000;
                stateSubsidy = capacity*2000;
                
                incostumerAccount = capacity <= 3  ? EnergyGenerationPerMonth * 3  : capacity <= 10  ? EnergyGenerationPerMonth * 2  : 0;
                FiveYearsGBI = incostumerAccount*60;
            }

            if (quoteFor === "RWA" && systemType === "On-Grid" && state === "Delhi" && subsidy === "No" ) {
                centralSubsidy = 0;
                stateSubsidy = capacity*2000;

                incostumerAccount = capacity <= 3  ? EnergyGenerationPerMonth * 3  : capacity <= 10  ? EnergyGenerationPerMonth * 2  : 0;
                FiveYearsGBI = incostumerAccount*60;
            }

                // Calculate subsidies
            if (quoteFor === "RESIDENTIAL" && systemType === "Hybrid" && state === "Delhi" && subsidy === "Yes" ) {
                centralSubsidy = 78000;
                stateSubsidy = 30000;
                
                incostumerAccount = capacity <= 3  ? EnergyGenerationPerMonth * 3  : capacity <= 10  ? EnergyGenerationPerMonth * 2  : 0;
                FiveYearsGBI = incostumerAccount*60;
                

            }


            totalSubsidy = centralSubsidy + stateSubsidy;
            const effectiveCost = totalPrice - totalSubsidy;

          

            // Select image
            let imagePath = "";
            if (systemType === "On-Grid") {
                imagePath = solar;
            } else if (systemType === "Off-Grid") {
                imagePath = Offgridsolar;
            } else if (systemType === "Hybrid") {
                imagePath = hybrid;
            }

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 25;
            const leftMargin = margin;
            const rightMargin = pageWidth - margin;
            const maxWidth = rightMargin - leftMargin;
            const headerHeight = 15;
            const footerHeight = 15;
            const contentStartY = 35;
            const contentEndY = pageHeight - margin - footerHeight;

            const addHeader = () => {
                try {
                    if (logo) {
                        doc.addImage(logo, "PNG", rightMargin - 40, 7, 40, 13);
                    }
                } catch (error) {
                    console.warn("Failed to add logo:", error);
                }
                doc.setLineWidth(0.1);
                doc.line(leftMargin, 10 + headerHeight - 2, rightMargin, 10 + headerHeight - 2);
            };

            const addFooter = () => {
                const footerTop = pageHeight - 20 - footerHeight;
                doc.setLineWidth(0.1);
                doc.line(leftMargin, footerTop, rightMargin, footerTop);
                doc.setFontSize(10);
                doc.setTextColor(80);
                doc.setFont("helvetica", "bold");
                doc.text("WhatsApp: +91-9220337642", rightMargin, footerTop + 6, { align: "right" });
                doc.text("E-mail: contact@solarradian.com", rightMargin, footerTop + 12, { align: "right" });
                doc.text(
                    "Address: S.N 4, 2nd Floor, Ashirwad Complex, Sector 53, Noida",
                    rightMargin,
                    footerTop + 18,
                    { align: "right" }
                );
            };

            const addInitialPage = () => {
                addHeader();
                doc.setFont("helvetica", "bold");
                doc.setFontSize(10);
                doc.setTextColor(50);
                doc.text(`Name: ${name}`, leftMargin, margin + 10);
                doc.text(`Mobile: ${mobile}`, leftMargin, margin + 15);
                doc.text(`State: ${state}`, leftMargin, margin + 20);
                doc.text(
                    `Capacity: ${parseFloat(capacity).toLocaleString("en-IN")}.00 KW`,
                    leftMargin,
                    margin + 25
                );
                doc.text(
                    `Quotation created by : ${user?.uniqueId || "Unknown"}`,
                    leftMargin,
                    margin + 30
                );
                doc.text(
                    `Subject: Quotation of ${capacity} KW, ${systemType} Solar System`,
                    leftMargin,
                    margin + 35
                );
                doc.text(`Date: ${today}`, rightMargin, margin + 10, { align: "right" });

                doc.setFont("helvetica", "normal");
                doc.setFontSize(11);
                const message = `Respected Sir/Mam,\n\nAt Solar Radian, a unit of SM Enterprises, we specialize in providing premium solar solutions backed by seamless maintenance services and advanced remote monitoring systems that ensure optimal performance and peace of mind. With our expertise, you invest in quality, reliability, and long-term savings.\n\nChoosing solar energy is not just an investment in sustainability; it is the smartest financial decision. By significantly reducing energy bills, protecting against rising electricity costs, and unlocking tax incentives, solar power offers unmatched monetary benefits. Our solutions deliver consistent energy savings year after year, transforming your operational expenses into long-term profitability.`;

                const messageLines = doc.splitTextToSize(message, maxWidth);
                doc.text(messageLines, leftMargin, contentStartY + 40);
                
                if (imagePath) {
                    try {
                        doc.addImage(imagePath, "PNG", leftMargin, contentEndY - 110, 160, 100);
                    } catch (error) {
                        console.warn("Failed to add system image:", error);
                    }
                }

                addFooter();
            };

            // 1st page
            addInitialPage();
            
            // 2nd page - Technical Details
            doc.addPage();
            addHeader();

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(166, 28, 0);
            doc.text(
                `TECHNICAL DETAILS FOR ${capacity} KW SOLAR SYSTEM`,
                leftMargin,
                contentStartY - 5
            );

            autoTable(doc, {
                startY: contentStartY,
                margin: { top: contentStartY, bottom: footerHeight + 10, left: leftMargin, right: margin },
                head: [["PACKAGE", "PREMIUM"]],
                body: [
                    ["PV MODULES (Solar panels and their specifications)", `${tataKit?.toLowerCase() === "yes" ? "TATA" : "Adani/Vikram/Waaree/Equivalant"}, Wattage–520W-6400W (N-Type) Bi-Facial (25-year efficiency warranty)`],
                    [`${systemType === "Hybrid" ? "HYBRID INVERTER" : systemType === "Off-Grid" ? "OFF-GRID INVERTER" : "INVERTER (DC to AC converter)"}`, `${systemType === "Hybrid"? "Deye/Cellcronics/Lux Powertech/Equivalent" : systemType === "Off-Grid" ? "Luminous/UTL/Eastman/Equivalent" : tataKit?.toLowerCase() === "yes" ? "TATA" : "Sungrow/Luminious/Growatt/Equivalent"}, Type-String Inverter IEC Approved`],

                    // [ `${systemType === "On-Grid" ? "INVERTER QUANTITY" : "BATTERY CAPACITY & QTY"}`, `${systemType === "On-Grid"  ? `INVERTER QUANTITY: ${capacity} KW * 1 Nos` : ` BATTERY CAPACITY & QTY: ${(capacity*3)/2.4} * 1 Nos`}`],
                   [`${systemType === "On-Grid" ? "INVERTER QUANTITY" : "BATTERY CAPACITY & QTY"}`, `${systemType === "On-Grid" ? `${capacity} KW * 1 Nos` : battery == "VRLA" ? `12V 200AH ${Math.round((capacity * hour * 1.5) / 2.4)} Nos`: `48V 200AH ${Math.round((capacity * hour * 1.5) / 9.6)} Nos`}`],


                    ["MAINTENANCE (Plant Checkup)", `${maintenance}`],
                    ["MOUNTING STRUCTURE (Metal Structure for Solar Panels)",
                        "The mounting structure for the solar system with wind stability of 150 km/hr. Structural Type: A galvanized structure will be used.Specification: Installation over RCC roof. Structure: Solar Radian"
                    ],
                    ["ACDB / DCDB",
                        "IP 65 protected JB with SPD, Fuses, Breakers, Isolators, MCB, Phase indicator, MCCB's, etc."
                    ],
                    ["EARTHING KIT",
                        "As per IEEE Standards Copper Bonded Heavy Chemical Earthing. It will be made sure that the earthing resistance is below the permissible level. There are total 3 earthing AC/DC/LA"
                    ],
                    ["LIGHTNING ARRESTOR",
                        "Reputed ESE made with 108-meter protection radius x 1Nos. arrestors will be used to provide advanced lightning protection for the complete solar system."
                    ],
                    ["AC & DC CABLES",
                        "Solar and AC Cables with proper coating and standards. DC /AC wire: Make of Polycab / KEI / Havells. AC for interconnections: 2/4 core, Pure AL/Cu, Armourd / flexible wires with proper protections."
                    ],
                    ["REMOTE MONITORING",
                        "LIVE GENERATION VISUALS ON the INTERNET (LAPTOP / MOBILE, ETC) Note: Providing internet connectivity to the inverter via LAN/ Wi-Fi / GPRS, etc. (as per the monitoring device) is under client's scope. Included in the offer"
                    ],
                    ["METER",
                        "Net meter as per specification. It would be single phase or Three phase. Solar meter will also be provided by discom"
                    ],
                    ["LIAISONING", "DISCOM Approval - Included in the offer"],
                    ["TRANSPORTATION",
                        "Transportation of the material to the site of installation - Included in the offer"
                    ],
                    ["INSTALLATION",
                        "Unloading, Lifting, Installation, etc. - Included in the offer"
                    ],
                    ["CMC WARRANTY",
                        "Complete warranty of material designed, used, and installed at the site (by Solar Radian) - 1 Year"
                    ]
                ],
                styles: { fontSize: 10, cellPadding: 3, halign: "left" },
                headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
                columnStyles: {
                    0: {
                        cellWidth: 47
                    },
                    1: {
                        cellWidth: 113
                    }
                },
                didDrawPage: () => {
                    addHeader();
                    addFooter();
                },
            });

            // 3rd page - Offer Details
            doc.addPage();
            addHeader();

            const startY2 = contentStartY + 38;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(166, 28, 0);
            doc.text(`${quoteFor} OFFER :`, leftMargin, startY2 - 5);

            autoTable(doc, {
                startY: startY2,
                margin: { left: leftMargin, right: margin },
                head: [["PACKAGE", "PREMIUM"]],
                body: [
                    ["COST (including GST)", `INR ${totalPrice.toLocaleString("en-IN")}.00`],
                    ["CENTRAL SUBSIDY", `INR ${centralSubsidy.toLocaleString("en-IN")}.00`],
                    ["STATE SUBSIDY", `INR ${stateSubsidy.toLocaleString("en-IN")}.00`],
                    ["TOTAL SUBSIDY", `INR ${totalSubsidy.toLocaleString("en-IN")}.00`],
                    ["EFFECTIVE COST", `INR ${effectiveCost.toLocaleString("en-IN")}.00`],
                ],
                styles: { fontSize: 10, cellPadding: 3 },
                headStyles: {
                    fillColor: [22, 160, 133],
                    textColor: 255,
                    fontStyle: "bold",
                },
                didParseCell: function (data) {
                    if (data.section === "body" && data.column.index === 0) {
                        data.cell.styles.textColor = [0, 0, 0];
                        data.cell.styles.fontStyle = "bold";
                    }

                    if (data.section === "body" && data.column.index === 1) {
                        if (data.row.index === 0 || data.row.index === 4) {
                            data.cell.styles.textColor = [166, 28, 0]; // Red
                            data.cell.styles.fontStyle = "bold";
                        }
                        if ([1, 2, 3].includes(data.row.index)) {
                            data.cell.styles.textColor = [0, 128, 0]; // Green
                            data.cell.styles.fontStyle = "bold";
                        }
                    }
                },
                didDrawPage: () => {
                    addHeader();
                    addFooter();
                },
            });

            // 4th page - GBI Policy (only for Delhi)
            if (state === "Delhi") {
                doc.addPage();
                addHeader();
                
                const startY3 = contentStartY + 20;

                doc.setFont("helvetica", "bold");
                doc.setFontSize(12);
                doc.setTextColor(166, 28, 0);
                doc.text(
                    "Delhi Solar policy of generation Based Incentive GBI - for five years",
                    leftMargin,
                    startY3 - 3
                );

                autoTable(doc, {
                    startY: startY3,
                    margin: {
                        top: contentStartY,
                        bottom: footerHeight + 10,
                        left: leftMargin,
                        right: margin,
                    },
                    head: [["TYPE OF CONSUMER", "MONTHLY GBI (INR / KWh)"]],
                    body: [
                        ["Residential: Maximum up to 3kW", "3"],
                        ["Residential: Above 3 kW, and up to 10kW", "2"],
                        ["Group housing societies/ RWAs: Above 3 kW, and up to 10kW", "2"],
                        ["Commercial and Industrial (for the first 200 MW deployed)", "1"],
                    ],
                    styles: { fontSize: 10, cellPadding: 3 },
                    headStyles: {
                        fillColor: [22, 160, 133],
                        textColor: 255,
                        fontStyle: "bold",
                    },
                    didDrawPage: () => {
                        addHeader();
                        addFooter();
                    },
                });
            }

            // === TABLE 4: ROI Basic ===
            // Only add this table for Delhi customers with subsidy
            if (state === "Delhi") {
                doc.addPage();
                addHeader();
                
                const startY4 = contentStartY;

                doc.setFont("helvetica", "bold");
                doc.setFontSize(12);
                doc.setTextColor(166, 28, 0);
                doc.text(`GBI for ${capacity} KW ${systemType} Solar System`, leftMargin, startY4 - 3);

                autoTable(doc, {
                    startY: startY4,
                    margin: {
                        top: contentStartY,
                        bottom: footerHeight + 10,
                        left: leftMargin,
                        right: margin
                    },
                    head: [
                        ["DESCRIPTION", "BENEFITS"]
                    ],
                    body: [
                        ["Solar Capacity ", `${parseFloat(capacity).toLocaleString("en-IN")}.00 KW `],
                        ["Energy Generation / Month ",
                            `${EnergyGenerationPerMonth.toLocaleString('en-IN')}.00 UNITS`
                        ],
                        ["Every month, GBI Amount will credit into customer account",
                            `INR ${incostumerAccount.toLocaleString('en-IN')}.00`
                        ],
                        ["Total Five Years GBI Amount ", `INR ${FiveYearsGBI.toLocaleString("en-IN")}.00`]
                    ],
                    styles: {
                        fontSize: 10,
                        cellPadding: 3
                    },
                    headStyles: {
                        fillColor: [22, 160, 133],
                        textColor: 255,
                        fontStyle: "bold"
                    },
                    didParseCell: function(data) {
                        // === All left-column cells (keys) ===
                        if (data.section === 'body' && data.column.index === 0) {
                            data.cell.styles.textColor = [0, 0, 0]; // Black
                            data.cell.styles.fontStyle = 'bold'; // Bold
                        }

                        // === Right-column (values) ===
                        if (data.section === 'body' && data.column.index === 1) {
                            if (data.row.index === 1 || data.row.index === 2 || data.row.index === 3) {
                                data.cell.styles.textColor = [0, 128, 0]; // Green
                                data.cell.styles.fontStyle = 'bold'; // Bold
                            } else if (data.row.index === 0) {
                                data.cell.styles.textColor = [0, 0, 0]; // Black
                                data.cell.styles.fontStyle = 'bold'; // Bold
                            }
                        }
                    },
                    didDrawPage: () => {
                        addHeader();
                        addFooter();
                    }
                });

                // === TABLE 5: ROI Detailed ===
                const startY5 = (doc.lastAutoTable?.finalY || contentStartY) + 7;
                doc.setFont("helvetica", "bold");
                doc.setFontSize(12);
                doc.setTextColor(166, 28, 0);
                doc.text("Return of Investment - R.O.I", leftMargin, startY5 - 3);

                autoTable(doc, {
                    startY: startY5,
                    margin: {
                        top: contentStartY,
                        bottom: footerHeight + 10,
                        left: leftMargin,
                        right: margin
                    },
                    head: [
                        ["DESCRIPTION", "BENEFITS"]
                    ],
                    body: [
                        ["Energy Generation / Month",
                            `${EnergyGenerationPerMonth.toLocaleString('en-IN')}.00 UNITS`
                        ],
                        ["Energy Generation / Year",
                            `${EnergyGenerationPerYear.toLocaleString('en-IN')}.00 UNITS `
                        ],
                        ["Electricity Rate / Unit", `INR ${unitRate.toLocaleString('en-IN')}.00`],
                        ["Total Electric Bill Savings / Year",
                            `INR ${(EnergyGenerationPerYear * unitRate).toLocaleString('en-IN')}.00`
                        ],
                        ["Total Five Years GBI Amount",
                            `INR ${FiveYearsGBI.toLocaleString('en-IN')}.00`],
                        ["EFFECTIVE COST", `INR ${(totalPrice - 108000).toLocaleString('en-IN')}.00`],
                        ["EFFECTIVE COST AFTER GBI",
                            `INR ${((totalPrice - 108000) - FiveYearsGBI).toLocaleString('en-IN')}.00`
                        ],
                        ["R.O.I",
                            `${(((totalPrice - 108000) - FiveYearsGBI) / (EnergyGenerationPerYear * unitRate)).toFixed(1)} YEARS`
                        ]

                    ],
                    styles: {
                        fontSize: 10,
                        cellPadding: 3
                    },
                    headStyles: {
                        fillColor: [22, 160, 133],
                        textColor: 255,
                        fontStyle: "bold"
                    },
                    didParseCell: function(data) {
                        // All keys (left column)
                        if (data.section === 'body' && data.column.index === 0) {
                            data.cell.styles.textColor = [0, 0, 0]; // Black
                            data.cell.styles.fontStyle = 'bold';
                        }

                        // Values (right column)
                        if (data.section === 'body' && data.column.index === 1) {
                            const row = data.row.index;
                            if ([0, 1, 3, 4].includes(row)) {
                                data.cell.styles.textColor = [0, 128, 0]; // Green
                                data.cell.styles.fontStyle = 'bold';
                            } else if ([5, 6].includes(row)) {
                                data.cell.styles.textColor = [166, 28, 0]; // Red
                                data.cell.styles.fontStyle = 'bold';
                            } else if (row === 7) {
                                data.cell.styles.textColor = [0, 102, 204]; // Blue
                                data.cell.styles.fontStyle = 'bold';
                            } else if (row === 2) {
                                data.cell.styles.textColor = [0, 0, 0]; // Black
                                data.cell.styles.fontStyle = 'bold';
                            }
                        }
                    },
                    didDrawPage: () => {
                        addHeader();
                        addFooter();
                    }
                });
            }

            // === TABLE 6: Schedule of Payment - Full Payment ===
            // Add this table for all customers
            let paymentPageY = contentStartY;
            
            // If we're on a Delhi+subsidy case, we need to add a new page
            if (state === "Delhi" && subsidy === "Yes") {
                doc.addPage();
                addHeader();
            } else {
                // For other cases, we're still on the offer details page
                paymentPageY = (doc.lastAutoTable?.finalY || contentStartY) + 15;
            }
            
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(166, 28, 0);
            doc.text("Schedule of Payment - In case of Full Payment", leftMargin, paymentPageY - 3);

            autoTable(doc, {
                startY: paymentPageY,
                margin: {
                    top: paymentPageY,
                    bottom: footerHeight + 10,
                    left: leftMargin,
                    right: margin
                },
                head: [
                    ["SN", "PAYMENT TERMS"]
                ],
                body: [
                    ["1", "15% of advance at the time of Purchase Order (PO)."],
                    ["2", "80% of supply & installation price before material dispatch."],
                    ["3", "5% after completion of installation."]
                ],
                styles: {
                    fontSize: 10,
                    cellPadding: 3
                },
                headStyles: {
                    fillColor: [22, 160, 133],
                    textColor: 255,
                    fontStyle: "bold"
                },
                columnStyles: {
                    0: {
                        cellWidth: 20
                    },
                    1: {
                        cellWidth: 140
                    }
                },
                didDrawPage: () => {
                    addHeader();
                    addFooter();
                }


            });

            let startY7 = (doc.lastAutoTable?.finalY || contentStartY) + 12;
            if (startY7 > pageHeight - 50) {
                doc.addPage();
                startY7 = contentStartY;
            }


            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(166, 28, 0);
            doc.text("Schedule of Payment - In case of Finance (20% Advance, 80% Loan)", leftMargin, startY7 -
                3);

            autoTable(doc,{
                startY: startY7,
                margin: {
                    top: startY7,
                    bottom: footerHeight + 10,
                    left: leftMargin,
                    right: margin
                },

                body: [
                    ["1",
                        "20% Advance for Order Booking after getting the Feasibility letter, Subsidy Letter & Digital Bank Approval Letter"
                    ],
                ],
                styles: {
                    fontSize: 10,
                    cellPadding: 3
                },
                headStyles: {
                    fillColor: [22, 160, 133],
                    textColor: 255,
                    fontStyle: "bold"
                },
                columnStyles: {
                    0: {
                        cellWidth: 20
                    },
                    1: {
                        cellWidth: 140
                    }
                },
                didDrawPage: () => {
                    addHeader();
                    addFooter();
                }
            });

             // === NOTE BOX: PLEASE NOTE (after Table 7) ===
            let noteY = (doc.lastAutoTable?.finalY || contentStartY) + 17;

            // Check if the note box fits; if not, add new page
            if (noteY > pageHeight - 70) {
                doc.addPage();
                addHeader();
                addFooter();
                noteY = contentStartY - 5;
            }

            // Heading: "PLEASE NOTE:"
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(166, 28, 0);
            doc.text("PLEASE NOTE:", leftMargin, noteY);

            // Draw the red rectangle box
            const noteBoxX = leftMargin;
            const noteBoxY = noteY + 2;
            const noteBoxWidth = pageWidth - leftMargin * 2;
            const noteBoxHeight = 40;

            doc.setLineWidth(0.1);
            doc.rect(noteBoxX, noteBoxY, noteBoxWidth, noteBoxHeight);

            // Note content
            const noteText = `CUSTOMER SCOPE:
                a) WiFi Internet connectivity.
                b) Water and power during construction.
                c) Customers shall provide necessary storage space and material security.
                e) Net Meter charges
                f) Staircase/Lift/Ladder for rooftop access has to be provided.
                g) If required: Water tank & pressure pump for module cleaning.
                h) Sand, Cement, and Stone chips for any civil work in Structure`;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(0);

            const wrappedNote = doc.splitTextToSize(noteText, noteBoxWidth - 10);
            doc.text(wrappedNote, noteBoxX + 5, noteBoxY + 8);

            // === TABLE 8: Standard Terms & Conditions ===
            // Use Y below the bottom of the NOTE box, NOT from lastAutoTable
            let startY8 = noteBoxY + noteBoxHeight + 8;

            // If not enough space for heading + 1 table row, add page
            if (startY8 > pageHeight - 60) {
                doc.addPage();
                addHeader();
                addFooter();
                startY8 = contentStartY;
            }

            // Draw heading
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(166, 28, 0);
            doc.text("STANDARD TERMS & CONDITIONS", leftMargin, startY8 - 1);

            // Draw table
            autoTable(doc,{
                startY: startY8,
                margin: {
                    top: contentStartY,
                    bottom: footerHeight + 10,
                    left: leftMargin,
                    right: margin
                },
                head: [
                    ["SN", "APPLICABLE HEADS", "TERMS"]
                ],
                body: [
                    ["1", "Taxes & Duties",
                        "(a) GST council instructions: TAXES, DUTIES AND RATES: GST 12.0% on Solar products and 18.0% on services \n" +
                        "(b) Entry Tax, Octroi: Excluded (not applicable as of now)\n" +
                        "(c) Other any Taxes: Excluded"
                    ],
                    ["2", "Freight & Transit", "Included"],
                    ["3", "Interest on Overdue Payment",
                        "In case the Owner fails to make the due payment within the agreed stipulated time frame as per the purchase order, the Contractor shall be eligible to charge interest @ of 18% per annum on all overdue payments until the duration of the payments is received. "
                    ],
                    ["4", "Delivery / Completion Period",
                        "Dispatch: As per PO and discussion. If payment is delayed, material delivery/execution may be delayed.\n" +
                        "Dispatch of Goods: As per the terms of the PO and mutual discussion. If the client fails to make the payment as per the schedule of the purchase order, then the material delivery or execution of the project may delay. Discom Approval: 14 Days Material Supply: 10 Days Installation: 45 Days Max Net Metering: Discom standards "
                    ],
                    ["5", "Packing", "Packing as per Solar Radian"],
                    ["6", "Warranty", "As Per Manufacturer"],
                    ["7", "Right & Lien of Property",
                        "We shall retain the right on equipment, materials, or parts supplied by us under this quotation until full value hereof as per our invoice has been fully paid to us."
                    ],
                    ["8", "Right & Lien of Property",
                        "We shall retain the right to equipment, materials, or parts supplied by us under this quotation until full value hereof as per our invoice has been fully paid to us."
                    ],
                    ["9", "Acceptance",
                        "Upon completion of the Scope of work, the Owner shall issue a Final Acceptance Certificate to the Contractor."
                    ],
                    ["10", "Publicity Rights",
                        "The Customer agrees and gives its irrevocable and unconditional consent to Solar Radian. to issue any press release or announcement relating to this Proposal, or any resultant Agreement, or use the data, photographs, designs, etc. of the sola power plant for its publicity and/or marketing activities or use the same for publication anywhere. "
                    ]
                ],
                styles: {
                    fontSize: 9,
                    cellPadding: 3,
                    valign: "top"
                },
                headStyles: {
                    fillColor: [22, 160, 133],
                    textColor: 255,
                    fontStyle: "bold"
                },
                columnStyles: {
                    0: {
                        cellWidth: 12
                    },
                    1: {
                        cellWidth: 38
                    },
                    2: {
                        cellWidth: 110
                    }
                },
                didDrawPage: (data) => {
                    addHeader();
                    addFooter();

                    // If on new page, make sure it starts from top margin
                    if (data.pageNumber > 1 && data.cursor.y < contentStartY) {
                        data.cursor.y = contentStartY;
                    }
                }
            });

            
            // Step 1: Calculate Y position after the last table (Table 8)
            let startY9 = (doc.lastAutoTable?.finalY || contentStartY) + 17;

            // Step 2: If not enough space for heading + content, add a new page
            if (startY9 > pageHeight - 60) {
                doc.addPage();
                addHeader();
                addFooter();
                startY9 = contentStartY;
            }

            // Step 3: Draw heading
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(166, 28, 0);
            doc.text("Bank Details - SM ENTERPRISES", leftMargin, startY9 - 5);

            // Step 4: Create the bank details table
            autoTable(doc ,{
                startY: startY9,
                margin: {
                    top: contentStartY,
                    bottom: footerHeight + 10,
                    left: leftMargin,
                    right: margin
                },
                head: [
                    ["Field", "Value"]
                ],
                body: [
                    ["A/C Name", "SM Enterprises"],
                    ["A/C Number", "00131132000248"],
                    ["Bank", "Punjab National Bank"],
                    ["Bank IFSC", "PUNB0001310"]
                ],
                styles: {
                    fontSize: 10,
                    cellPadding: 3
                },
                headStyles: {
                    fillColor: [22, 160, 133],
                    textColor: 255,
                    fontStyle: "bold"
                },
                columnStyles: {
                    0: {
                        cellWidth: 50
                    },
                    1: {
                        cellWidth: 110
                    }
                },
                didDrawPage: (data) => {
                    addHeader();
                    addFooter();

                    // Ensure content starts from correct Y on new pages
                    if (data.pageNumber > 1 && data.cursor.y < contentStartY) {
                        data.cursor.y = contentStartY;
                    }
                }
            });

            // === FINAL CLOSING MESSAGE ===

            // Step 1: Calculate Y after Table 9
            let closingY = (doc.lastAutoTable?.finalY || contentStartY) + 20;

            // Step 2: If not enough space for message block, start on new page
            if (closingY > pageHeight - 70) {
                doc.addPage();
                addHeader();
                addFooter();
                closingY = contentStartY;
            }

            // Step 3: Add the closing message content

            const closingText = `We are honored to present this proposal to yourself and are confident that our premium solar solutions will deliver substantial financial benefits while advancing your sustainability goals.\n\nShould you have any questions or require further clarification, our team is ready to assist you at every step.\n\nWe look forward to the opportunity to work together and make this transformative investment a reality.\n\nRegards,\nMd Salman\n\nSolar Radian - a unit of SM Enterprises\nEmpowering India with Solar Energy Solutions\nPhone: +91-9220337642`;

            // Set font and styles
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(33, 37, 41); // Dark gray

            // Wrap and print the text
            const wrappedClosing = doc.splitTextToSize(closingText.trim(), pageWidth - leftMargin * 2);
            doc.text(wrappedClosing, leftMargin, closingY);

            
            doc.save(
                `Solar_Radian_quotation_${name.replace(/[^a-zA-Z0-9]/g, "_") || "Customer"}.pdf`
            );
            setSuccess("PDF Generated Successfully!");
        } catch (err) {
            console.error("PDF Generation Error:", err);
            setError("Failed to generate PDF. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Form */}
            <div className="flex-1 flex justify-center items-center py-8 px-4 mt-20">
                <div className="w-full max-w-4xl glass-effect shadow-2xl rounded-xl p-6 md:p-8 fade-in bg-white">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
                        <i className="fas fa-file-invoice text-green-600 mr-2"></i>
                        Quotation Generator
                    </h2>
                    <p className="text-center text-gray-600 mb-6 md:mb-8">
                        Generate professional solar installation quotes
                    </p>

                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-r">
                            <i className="fas fa-exclamation-triangle mr-2"></i>
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-r">
                            <i className="fas fa-check-circle mr-2"></i>
                            {success}
                        </div>
                    )}

                    <form className="grid md:grid-cols-2 gap-4">
                        {/* Customer Name */}
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Customer Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Mobile Number *
                            </label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                maxLength="10"
                                pattern="[0-9]{10}"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>

                        {/* State */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                State *
                            </label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            >
                                <option value="">Select State</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                {/* Add more states as needed */}
                            </select>
                        </div>

                        {/* Quote For */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Quote For *
                            </label>
                            <select
                                name="quoteFor"
                                value={formData.quoteFor}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            >
                                <option value="">Select Category</option>
                                <option value="RESIDENTIAL">RESIDENTIAL</option>
                                <option value="COMMERCIAL">COMMERCIAL</option>
                                <option value="RWA">RWA</option>
                                <option value="INDUSTRIAL">INDUSTRIAL</option>
                            </select>
                        </div>

                        {/* System Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                System Type *
                            </label>
                            <select
                                name="systemType"
                                value={formData.systemType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            >
                                <option value="">Select System Type</option>
                                <option value="On-Grid">On-Grid</option>
                                <option value="Off-Grid">Off-Grid</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        {/* Capacity */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Solar Capacity (kW) *
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                min="1"
                                max="1000"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>

                        {/* Rate */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Rate per KW (₹) *
                            </label>
                            <input
                                type="number"
                                name="rate"
                                value={formData.rate}
                                onChange={handleChange}
                                min="1"
                                max="1000000"
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>

                        {/* Subsidy */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Government Subsidy *
                            </label>
                            <select
                                name="subsidy"
                                value={formData.subsidy}
                                onChange={handleChange}
                                disabled={formData.quoteFor === "COMMERCIAL" || formData.systemType === "Off-Grid"}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:opacity-50"
                            >
                                <option value="">Select Subsidy</option>
                                <option value="Yes">Yes - Include Subsidy</option>
                                <option value="No">No - Without Subsidy</option>
                            </select>
                        </div>

                        {/* Maintenance */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Maintenance Period *
                            </label>
                            <select
                                name="maintenance"
                                value={formData.maintenance}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            >
                                <option value="">Select Period</option>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                            </select>
                        </div>

                        {/* Tata Kit */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Tata Kit Required
                            </label>
                            <select
                                name="tataKit"
                                value={formData.tataKit}
                                onChange={handleChange}
                                  disabled={formData.systemType === "Off-Grid" || formData.systemType === "Hybrid"}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:opacity-50"
                            >
                                <option value="">Select Option</option>
                                <option value="Yes">Yes - Include Tata Kit</option>
                                <option value="No">No - Standard Kit</option>
                            </select>
                        </div>
                        {/* batery */}
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Battery
                            </label>
                            <select
                                name="battery"
                                value={formData.battery}
                                onChange={handleChange}
                                disabled={formData.systemType === "On-Grid" }
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:opacity-50"
                            >
                                <option value="">Select Option</option>
                                <option value="Yes">VRLA</option>
                                <option value="No">Li-Ion</option>
                            </select>
                        </div>

                          {/* batery */}
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Battery Backup Time
                            </label>
                            <select
                                name="hour"
                                value={formData.hour}
                                onChange={handleChange}
                                disabled={formData.systemType === "On-Grid" }
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:opacity-50"
                            >
                                <option value="">Select Option</option>
                                <option value="1">1 hour</option>
                                <option value="2">2 hour</option>
                                <option value="3">3 hour</option>
                                <option value="4">4 hour</option>
                                <option value="5">5 hour</option>
                                <option value="6">6 hour</option>
                                <option value="7">7 hour</option>
                                <option value="8">8 hour</option>
                             
                              
                            </select>
                        </div>

                        {/* Button */}
                        <div className="col-span-2 flex justify-center mt-4">
                            <button
                                type="button"
                                onClick={generatePDF}
                                disabled={loading}
                                className="w-full md:w-3/4 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Generating PDF...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-download mr-2"></i>
                                        Generate & Download PDF
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

  
            {/* Hidden images for PDF generation */}
            <div style={{ display: 'none' }}>
                <img id="logo" src={logo} alt="Logo" />
                <img id="solarimg" src={solar} alt="Solar" />
                <img id="Offgridsolar" src={Offgridsolar} alt="Offgrid Solar" />
                <img id="hybrid" src={hybrid} alt="Hybrid" />
            </div>
        </div>
    );
};

export default QuotationGenerator;