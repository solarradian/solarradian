import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logoimg from "../assets/logopng.png";
import solarimg from "../assets/solarimg.png";
import offgridimg from "../assets/Offgridsolar.png";
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
    statesubsidy: "",
    centralsubsidy: "",
    maintenance: "",
    tataKit: "",
    battery: "",
    hour: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [unitRate, setUnitRate] = useState(0);
  const [logo] = useState(logoimg);
  const [solar] = useState(solarimg);
  const [offgrid] = useState(offgridimg);
  const [hybrid] = useState(hybridimg);
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    if (formData.quoteFor === "COMMERCIAL") {
      setUnitRate(12);
      setFormData((prev) => ({ ...prev, statesubsidy: "No", centralsubsidy: "No" }));
    } else if (formData.quoteFor === "RESIDENTIAL" || formData.quoteFor === "RWA") {
      setUnitRate(7);
    }
    if (formData.systemType === "Off-Grid" || formData.systemType === "Hybrid") {
      setFormData((prev) => ({ ...prev, tataKit: "No" }));
    }
  }, [formData.quoteFor, formData.systemType]);

  useEffect(() => {
    if (formData.systemType === "Off-Grid") {
      setFormData((prev) => ({ ...prev, subsidy: "No" }));
    }
  }, [formData.systemType, formData.state]);

    useEffect(() => {
    if (formData.state === "UP") {
      setFormData((prev) => ({ ...prev, statesubsidy: "Yes" , centralsubsidy: "Yes" }));
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.systemType === "On-Grid") {
      setFormData((prev) => ({ ...prev, battery: "No", hour: "" }));
    }
  }, [formData.systemType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      !formData.statesubsidy ||
      !formData.centralsubsidy
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
        statesubsidy,
        centralsubsidy,
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
      const energyGenerationPerMonth = parseFloat(capacity) * 120;
      const energyGenerationPerYear = energyGenerationPerMonth * 12;
      let centralSubsidy = 0;
      let stateSubsidy = 0;
      let incostumerAccount = 0;
      let fiveYearsGBI = 0;
      let subsidyNote = "";

      if (quoteFor === "RESIDENTIAL" && systemType === "On-Grid" && state === "Delhi" && statesubsidy === "Yes" && centralsubsidy === "Yes") {
        centralSubsidy = 78000;
        stateSubsidy = 30000;
        incostumerAccount = capacity <= 3 ? energyGenerationPerMonth * 3 : capacity <= 10 ? energyGenerationPerMonth * 2 : 0;

      } else if (quoteFor === "RESIDENTIAL" && systemType === "On-Grid" && state === "Delhi" && statesubsidy === "Yes" && centralsubsidy === "No") {
        centralSubsidy = 0;
        stateSubsidy = 30000;
        incostumerAccount = capacity <= 3 ? energyGenerationPerMonth * 3 : capacity <= 10 ? energyGenerationPerMonth * 2 : 0;

      } else if (quoteFor === "COMMERCIAL" && systemType === "On-Grid" && state === "Delhi") {
        centralSubsidy = 0;
        stateSubsidy = 0;
        incostumerAccount = capacity <= 200000 ? energyGenerationPerMonth * 1 : 0;
        // subsidyNote = "*No subsidy available for Commercial On-Grid projects in Delhi";

      } else if (quoteFor === "RWA" && systemType === "On-Grid" && state === "Delhi" && statesubsidy === "Yes" && centralsubsidy === "No") {
        centralSubsidy = capacity * 18000;
        stateSubsidy = capacity * 2000;
        incostumerAccount = capacity <= 3 ? energyGenerationPerMonth * 3 : capacity <= 10 ? energyGenerationPerMonth * 2 : 0;

      } else if (quoteFor === "RWA" && systemType === "On-Grid" && state === "Delhi" && statesubsidy === "Yes" && centralsubsidy === "No") {
        centralSubsidy = 0;
        stateSubsidy = capacity * 2000;
        incostumerAccount = capacity <= 3 ? energyGenerationPerMonth * 3 : capacity <= 10 ? energyGenerationPerMonth * 2 : 0;
      } else if (quoteFor === "RESIDENTIAL" && systemType === "Hybrid" && state === "Delhi" && subsidy === "Yes") {
        centralSubsidy = 78000;
        stateSubsidy = 30000;
        incostumerAccount = capacity <= 3 ? energyGenerationPerMonth * 3 : capacity <= 10 ? energyGenerationPerMonth * 2 : 0;
      }
      else if (quoteFor === "RESIDENTIAL" && systemType === "On-Grid" && state === "UP" && statesubsidy === "Yes" && centralsubsidy === "Yes") {
        centralSubsidy = 78000;
        stateSubsidy = 30000;


      } else if (quoteFor === "RESIDENTIAL" && systemType === "On-Grid" && state === "UP" && statesubsidy === "No" && centralsubsidy === "No") {
        centralSubsidy = 0;
        stateSubsidy = 0; // adjust if UP has different scheme

      } else if (quoteFor === "COMMERCIAL" && systemType === "On-Grid" && state === "UP") {
        incostumerAccount = capacity <= 200000
          ? energyGenerationPerMonth * 1
          : 0;
        subsidyNote = "*No subsidy available for Commercial On-Grid projects in Uttar Pradesh";

      } else if (quoteFor === "RWA" && systemType === "On-Grid" && state === "UP" && subsidy === "Yes") {
        centralSubsidy = capacity * 18000;
        stateSubsidy = capacity * 2000; // adjust if UP has different RWA scheme
        incostumerAccount = capacity <= 3
          ? energyGenerationPerMonth * 3
          : capacity <= 10
            ? energyGenerationPerMonth * 2
            : 0;

      } else if (quoteFor === "RWA" && systemType === "On-Grid" && state === "UP" && subsidy === "No") {
        stateSubsidy = capacity * 2000;
        incostumerAccount = capacity <= 3
          ? energyGenerationPerMonth * 3
          : capacity <= 10
            ? energyGenerationPerMonth * 2
            : 0;

      } else if (quoteFor === "RESIDENTIAL" && systemType === "Hybrid" && state === "UP" && subsidy === "Yes") {
        centralSubsidy = 78000;
        stateSubsidy = 30000; // adjust if UP Hybrid differs
        incostumerAccount = capacity <= 3
          ? energyGenerationPerMonth * 3
          : capacity <= 10
            ? energyGenerationPerMonth * 2
            : 0;
      }


      fiveYearsGBI = incostumerAccount * 60;
      const totalSubsidy = centralSubsidy + stateSubsidy;
      const effectiveCost = totalPrice - totalSubsidy;

      const imagePath = systemType === "On-Grid" ? solar : systemType === "Off-Grid" ? offgrid : hybrid;

      // Updated layout constants
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 25;
      const leftMargin = margin;
      const rightMargin = pageWidth - margin;
      const maxWidth = rightMargin - leftMargin;
      const headerHeight = 15;
      const footerHeight = 15; // Reduced footer height
      const contentStartY = 35; // Increased top margin
      const contentEndY = pageHeight - margin - footerHeight;
      const minSpaceRequired = 40; // Minimum space needed for new sections

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
        const footerTop = pageHeight - 15 - footerHeight; // Adjusted footer positioning
        doc.setLineWidth(0.1);
        doc.line(leftMargin, footerTop, rightMargin, footerTop);
        doc.setFontSize(10);
        doc.setTextColor(80);
        doc.setFont("helvetica", "bold");
        doc.text("WhatsApp: +91-9220337642", rightMargin, footerTop + 5, { align: "right" });
        doc.text("E-mail: contact@solarradian.com", rightMargin, footerTop + 10, { align: "right" });
        doc.text(
          "Address: S.N 4, 2nd Floor, Ashirwad Complex, Sector 53, Noida",
          rightMargin,
          footerTop + 15,
          { align: "right" }
        );
      };

      // Page 1: Cover Page
      const addCoverPage = () => {
        addHeader();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(50);
        // Increased spacing between customer details
        doc.text(`Name: ${name}`, leftMargin, margin + 10);
        doc.text(`Mobile: ${mobile}`, leftMargin, margin + 16);
        doc.text(`State: ${state}`, leftMargin, margin + 22);
        doc.text(`Capacity: ${parseFloat(capacity).toLocaleString("en-IN")}.00 KW`, leftMargin, margin + 28);
        doc.text(`Quotation created by: ${user?.uniqueId}, ${user?.name}, ${user?.mobile}`, leftMargin, margin + 34);
        doc.text(`Subject: Quotation of ${capacity} KW, ${systemType} Solar System`, leftMargin, margin + 40);
        doc.text(`Date: ${today}`, rightMargin, margin + 10, { align: "right" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const message = `Respected Sir/Mam,\n\nAt Solar Radian, a unit of SM Enterprises, we specialize in providing premium solar solutions backed by seamless maintenance services and advanced remote monitoring systems that ensure optimal performance and peace of mind. With our expertise, you invest in quality, reliability, and long-term savings.\n\nChoosing solar energy is not just an investment in sustainability; it is the smartest financial decision. By significantly reducing energy bills, protecting against rising electricity costs, and unlocking tax incentives, solar power offers unmatched monetary benefits. Our solutions deliver consistent energy savings year after year, transforming your operational expenses into long-term profitability.`;
        const messageLines = doc.splitTextToSize(message, maxWidth);
        doc.text(messageLines, leftMargin, contentStartY + 45); // Increased spacing

        try {
          if (imagePath) {
            doc.addImage(imagePath, "PNG", leftMargin, contentEndY - 100, 160, 90); // Adjusted image size and position
          }
        } catch (error) {
          console.warn("Failed to add system image:", error);
        }

        addFooter();
      };

      // Page 2: Technical Details
      const addTechnicalDetailsPage = () => {
        doc.addPage();
        addHeader();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(166, 28, 0);
        doc.text(`TECHNICAL DETAILS FOR ${capacity} KW SOLAR SYSTEM`, leftMargin, contentStartY - 5);

        autoTable(doc, {
          startY: contentStartY - 2,
          margin: { top: contentStartY - 15, bottom: footerHeight, left: leftMargin, right: margin }, // Increased bottom margin
          //   margin: { top: contentStartY, bottom: footerHeight + 10, left: leftMargin, right: margin },
          head: [["PACKAGE", "PREMIUM"]],
          body: [
            ["PV MODULES (Solar panels and their specifications)", `${tataKit?.toLowerCase() === "yes" ? "TATA" : "Adani/Vikram/Waaree/Equivalant"}, Wattage–520W-6400W (N-Type) Bi-Facial (25-year efficiency warranty)`],
            [`${systemType === "Hybrid" ? "HYBRID INVERTER" : systemType === "Off-Grid" ? "OFF-GRID INVERTER" : "INVERTER (DC to AC converter)"}`, `${systemType === "Hybrid" ? "Deye/Cellcronics/Lux Powertech/Equivalent" : systemType === "Off-Grid" ? "Luminous/UTL/Eastman/Equivalent" : tataKit?.toLowerCase() === "yes" ? "TATA" : "Sungrow/Luminious/Growatt/Equivalent"}, Type-String Inverter IEC Approved`],

            // [ `${systemType === "On-Grid" ? "INVERTER QUANTITY" : "BATTERY CAPACITY & QTY"}`, `${systemType === "On-Grid"  ? `INVERTER QUANTITY: ${capacity} KW * 1 Nos` : ` BATTERY CAPACITY & QTY: ${(capacity*3)/2.4} * 1 Nos`}`],
            [`${systemType === "On-Grid" ? "INVERTER QUANTITY" : "BATTERY CAPACITY & QTY"}`, `${systemType === "On-Grid" ? `${capacity} KW * 1 Nos` : battery == "VRLA" ? `12V 200AH ${Math.round((capacity * hour * 1.5) / 2.4)} Nos` : `48V 200AH ${Math.round((capacity * hour * 1.5) / 9.6)} Nos`}`],


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
          styles: { fontSize: 10, cellPadding: 2.7, halign: "left" },
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
      };

      // Page 3: Offer Details
      const addOfferDetailsPage = () => {
        doc.addPage();
        addHeader();
        const startY = contentStartY; // Adjusted startY for better spacing
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(166, 28, 0);
        doc.text(`${quoteFor} OFFER :`, leftMargin, startY - 5);

        autoTable(doc, {
          startY: startY - 2,
          margin: { left: leftMargin, right: margin, bottom: footerHeight + 15 }, // Increased bottom margin
          head: [["PACKAGE", "PREMIUM"]],
          body: [
            ["COST (including GST)", `INR ${totalPrice.toLocaleString("en-IN")}.00`],
           quoteFor !== "COMMERCIAL" && ["CENTRAL SUBSIDY", `INR ${centralSubsidy.toLocaleString("en-IN")}.00`],
           quoteFor !== "COMMERCIAL" && ["STATE SUBSIDY", `INR ${stateSubsidy.toLocaleString("en-IN")}.00`],
           quoteFor !== "COMMERCIAL" && ["TOTAL SUBSIDY", `INR ${totalSubsidy.toLocaleString("en-IN")}.00`],
           quoteFor !== "COMMERCIAL" && ["EFFECTIVE COST", `INR ${effectiveCost.toLocaleString("en-IN")}.00`],
          ].filter(Boolean),
          styles: { fontSize: 10, cellPadding: 3, lineHeight: 1.2 },
          headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
          didParseCell: (data) => {
            if (data.section === "body" && data.column.index === 0) {
              data.cell.styles.textColor = [0, 0, 0];
              data.cell.styles.fontStyle = "bold";
            }
            if (data.section === "body" && data.column.index === 1) {
              if (data.row.index === 0 || data.row.index === 4) {
                data.cell.styles.textColor = [166, 28, 0];
                data.cell.styles.fontStyle = "bold";
              }
              if ([1, 2, 3].includes(data.row.index)) {
                data.cell.styles.textColor = [0, 128, 0];
                data.cell.styles.fontStyle = "bold";
              }
            }
          },
          didDrawPage: () => {
            addHeader();
            addFooter();
          },


        });
      };

      // Page 4: Delhi Solar Policy (Conditional)
      const addDelhiPolicyPage = () => {
        if (state !== "Delhi") return;
        // doc.addPage();
        addHeader();
        const startY = contentStartY + 70; // Increased spacing
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(166, 28, 0);
        doc.text("Delhi Solar policy of generation Based Incentive GBI - for five years", leftMargin, startY - 5);

        autoTable(doc, {
          startY: startY - 2,
          margin: { top: contentStartY - 45, bottom: footerHeight + 15, left: leftMargin, right: margin },
          head: [["TYPE OF CONSUMER", "MONTHLY GBI (INR / KWh)"]],
          body: [
            ["Residential: Maximum up to 3kW", "3"],
            ["Residential: Above 3 kW, and up to 10kW", "2"],
            ["Group housing societies/ RWAs: Above 3 kW, and up to 10kW", "2"],
            ["Commercial and Industrial (for the first 200 MW deployed)", "1"],
          ],
          styles: { fontSize: 10, cellPadding: 3, lineHeight: 1.2 },
          headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
          didDrawPage: () => {
            addHeader();
            addFooter();
          },
        });
      };

      // Page 5: GBI and ROI Details (Conditional)
      const addGBIandROIPage = () => {
        if (state == "Delhi") {
          
           doc.addPage();
        addHeader();
        const startY = contentStartY;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(166, 28, 0);
        doc.text(`GBI for ${capacity} KW ${systemType} Solar System`, leftMargin, startY - 5);

        autoTable(doc, {
          startY,
          margin: { top: contentStartY, bottom: footerHeight + 15, left: leftMargin, right: margin },
          head: [["DESCRIPTION", "BENEFITS"]],
          body: [
            ["Solar Capacity", `${parseFloat(capacity).toLocaleString("en-IN")}.00 KW`],
            ["Energy Generation / Month", `${energyGenerationPerMonth.toLocaleString("en-IN")}.00 UNITS`],
            ["Every month, GBI Amount will credit into customer account", `INR ${incostumerAccount.toLocaleString("en-IN")}.00`],
            ["Total Five Years GBI Amount", `INR ${fiveYearsGBI.toLocaleString("en-IN")}.00`],
          ],
          styles: { fontSize: 10, cellPadding: 3, lineHeight: 1.2 },
          headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
          didParseCell: (data) => {
            if (data.section === "body" && data.column.index === 0) {
              data.cell.styles.textColor = [0, 0, 0];
              data.cell.styles.fontStyle = "bold";
            }
            if (data.section === "body" && data.column.index === 1) {
              if ([1, 2, 3].includes(data.row.index)) {
                data.cell.styles.textColor = [0, 128, 0];
                data.cell.styles.fontStyle = "bold";
              } else if (data.row.index === 0) {
                data.cell.styles.textColor = [0, 0, 0];
                data.cell.styles.fontStyle = "bold";
              }
            }
          },
          didDrawPage: () => {
            addHeader();
            addFooter();
          },
        });


        }
        

        let startY2 = (doc.lastAutoTable?.finalY || contentStartY) + 10; // Increased spacing between tables
        if (startY2 > contentEndY - minSpaceRequired) {
          doc.addPage();
          addHeader();
          addFooter();
          startY2 = contentStartY;
        }


        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(166, 28, 0);
        doc.text("Return of Investment - R.O.I", leftMargin, startY2 - 5);

        autoTable(doc, {
          startY: startY2,
          margin: { top: contentStartY, bottom: footerHeight + 15, left: leftMargin, right: margin },
          head: [["DESCRIPTION", "BENEFITS"]],
          body: [
            ["Energy Generation / Month", `${energyGenerationPerMonth.toLocaleString("en-IN")}.00 UNITS`],
            ["Energy Generation / Year", `${energyGenerationPerYear.toLocaleString("en-IN")}.00 UNITS`],
            ["Electricity Rate / Unit", `INR ${unitRate.toLocaleString("en-IN")}.00`],
            ["Total Electric Bill Savings / Year", `INR ${(energyGenerationPerYear * unitRate).toLocaleString("en-IN")}.00`],
            state === "Delhi" && ["Total Five Years GBI Amount", `INR ${fiveYearsGBI.toLocaleString("en-IN")}.00`],
            ["EFFECTIVE COST", `INR ${(totalPrice - totalSubsidy).toLocaleString("en-IN")}.00`],
            state === "Delhi" && ["EFFECTIVE COST AFTER GBI", `INR ${(totalPrice - totalSubsidy - fiveYearsGBI).toLocaleString("en-IN")}.00`],
            ["R.O.I", `${((totalPrice - totalSubsidy - fiveYearsGBI) / (energyGenerationPerYear * unitRate)).toFixed(1)} YEARS`],
          ].filter(Boolean),
          styles: { fontSize: 10, cellPadding: 3, lineHeight: 1.2 },
          headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
          didParseCell: (data) => {
            if (data.section === "body" && data.column.index === 0) {
              data.cell.styles.textColor = [0, 0, 0];
              data.cell.styles.fontStyle = "bold";
            }
            if (data.section === "body" && data.column.index === 1) {
              const row = data.row.index;
              if ([0, 1, 3, 4].includes(row)) {
                data.cell.styles.textColor = [0, 128, 0];
                data.cell.styles.fontStyle = "bold";
              } else if ([5, 6].includes(row)) {
                data.cell.styles.textColor = [166, 28, 0];
                data.cell.styles.fontStyle = "bold";
              } else if (row === 7) {
                data.cell.styles.textColor = [0, 102, 204];
                data.cell.styles.fontStyle = "bold";
              } else if (row === 2) {
                data.cell.styles.textColor = [0, 0, 0];
                data.cell.styles.fontStyle = "bold";
              }
            }
          },

          didDrawPage: () => {
            addHeader();
            addFooter();
          },

        });
      };

      // Page 6: Payment Schedules
      const addPaymentSchedulesPage = () => {
        let paymentPageY = state === "Delhi" ? contentStartY : (doc.lastAutoTable?.finalY || contentStartY) + 20; // Increased spacing
        if (state === "Delhi" || paymentPageY > contentEndY - minSpaceRequired) {
          doc.addPage();
          addHeader();
          paymentPageY = contentStartY;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(166, 28, 0);
        doc.text("Schedule of Payment - In case of Full Payment", leftMargin, paymentPageY - 5);

        autoTable(doc, {
          startY: paymentPageY,
          margin: { top: paymentPageY, bottom: footerHeight + 15, left: leftMargin, right: margin },
          head: [["SN", "PAYMENT TERMS"]],
          body: [
             quoteFor === "RESIDENTIAL" && ["1", "15% of advance at the time of Purchase Order (PO)."],
             quoteFor === "RESIDENTIAL" && ["2", "80% of supply & installation price before material dispatch."],
             quoteFor === "RESIDENTIAL" &&  ["3", "5% after completion of installation."],
             quoteFor === "COMMERCIAL" && ["1", "15% advance."],
             quoteFor === "COMMERCIAL" && ["2", "35% structure delivery."],
             quoteFor === "COMMERCIAL" && ["3", "40% installation start (inverter & module)."],
             quoteFor === "COMMERCIAL" && ["4", "10% after final commissioning."],
          ].filter(Boolean),
          styles: { fontSize: 10, cellPadding: 3, lineHeight: 1.2 },
          headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
          columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 140 } },


          didDrawPage: () => {
            addHeader();
            addFooter();
          },


        });

        let startY = (doc.lastAutoTable?.finalY || contentStartY) + 15; // Increased spacing
        if (startY > contentEndY - minSpaceRequired) {
          doc.addPage();
          addHeader();
          addFooter();
          startY = contentStartY;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(166, 28, 0);
        doc.text("Schedule of Payment - In case of Finance (20% Advance, 80% Loan)", leftMargin, startY - 5);

        autoTable(doc, {
          startY,
          margin: { top: startY, bottom: footerHeight + 15, left: leftMargin, right: margin },
          head: [["SN", "PAYMENT TERMS"]],
          body: [
            [
              "1",
              "20% Advance for Order Booking after getting the Feasibility letter, Subsidy Letter & Digital Bank Approval Letter",
            ],
          ],
          styles: { fontSize: 10, cellPadding: 3, lineHeight: 1.2 },
          headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
          columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 140 } },
          didDrawPage: () => {
            addHeader();
            addFooter();
          },
        });

        let noteY = headerHeight + 120;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(166, 28, 0);
        doc.text("PLEASE NOTE:", leftMargin, noteY);

        const noteBoxX = leftMargin;
        const noteBoxY = noteY + 3; // Slightly increased offset
        const noteBoxWidth = pageWidth - leftMargin * 2;
        const noteBoxHeight = 45; // Increased height for better fit
        doc.setLineWidth(0.1);
        doc.rect(noteBoxX, noteBoxY, noteBoxWidth, noteBoxHeight);

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
        doc.text(wrappedNote, noteBoxX + 5, noteBoxY + 10); // Adjusted text position
      };

      // Page 7: Notes, Terms, and Bank Details
      const addNotesAndTermsPage = () => {

        let startY = headerHeight + 20; // Increased spacing

        doc.addPage();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(166, 28, 0);
        doc.text("STANDARD TERMS & CONDITIONS", leftMargin, startY - 5);

        autoTable(doc, {
          startY,
          margin: { top: contentStartY, bottom: footerHeight + 15, left: leftMargin, right: margin },
          head: [["SN", "APPLICABLE HEADS", "TERMS"]],
          body: [
            [
              "1",
              "Taxes & Duties",
              "(a) GST council instructions: TAXES, DUTIES AND RATES: GST 12.0% on Solar products and 18.0% on services\n(b) Entry Tax, Octroi: Excluded (not applicable as of now)\n(c) Other any Taxes: Excluded",
            ],
            ["2", "Freight & Transit", "Included"],
            [
              "3",
              "Interest on Overdue Payment",
              "In case the Owner fails to make the due payment within the agreed stipulated time frame as per the purchase order, the Contractor shall be eligible to charge interest @ of 18% per annum on all overdue payments until the duration of the payments is received.",
            ],
            [
              "4",
              "Delivery / Completion Period",
              "Dispatch: As per PO and discussion. If payment is delayed, material delivery/execution may be delayed.\nDispatch of Goods: As per the terms of the PO and mutual discussion. If the client fails to make the payment as per the schedule of the purchase order, then the material delivery or execution of the project may delay. Discom Approval: 14 Days Material Supply: 10 Days Installation: 45 Days Max Net Metering: Discom standards",
            ],
            ["5", "Packing", "Packing as per Solar Radian"],
            ["6", "Warranty", "As Per Manufacturer"],
            [
              "7",
              "Right & Lien of Property",
              "We shall retain the right on equipment, materials, or parts supplied by us under this quotation until full value hereof as per our invoice has been fully paid to us.",
            ],
            [
              "8",
              "Acceptance",
              "Upon completion of the Scope of work, the Owner shall issue a Final Acceptance Certificate to the Contractor.",
            ],
            [
              "9",
              "Publicity Rights",
              "The Customer agrees and gives its irrevocable and unconditional consent to Solar Radian to issue any press release or announcement relating to this Proposal, or any resultant Agreement, or use the data, photographs, designs, etc. of the solar power plant for its publicity and/or marketing activities or use the same for publication anywhere.",
            ],
          ],
          styles: { fontSize: 9, cellPadding: 3, lineHeight: 1.2, valign: "top" },
          headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
          columnStyles: { 0: { cellWidth: 15 }, 1: { cellWidth: 35 }, 2: { cellWidth: 110 } },
          didDrawPage: (data) => {
            addHeader();
            addFooter();
            if (data.pageNumber > 1 && data.cursor.y < contentStartY) {
              data.cursor.y = contentStartY;
            }
          },
        });

        let startY2 = (doc.lastAutoTable?.finalY || contentStartY) + 20; // Increased spacing
        if (startY2 > contentEndY - minSpaceRequired) {
          doc.addPage();
          addHeader();
          addFooter();
          startY2 = contentStartY;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(166, 28, 0);
        doc.text("Bank Details - SM ENTERPRISES", leftMargin, startY2 - 5);

        autoTable(doc, {
          startY: startY2,
          margin: { top: contentStartY, bottom: footerHeight + 15, left: leftMargin, right: margin },
          head: [["Field", "Value"]],
          body: [
            ["A/C Name", "SM Enterprises"],
            ["A/C Number", "00131132000248"],
            ["Bank", "Punjab National Bank"],
            ["Bank IFSC", "PUNB0001310"],
          ],
          styles: { fontSize: 10, cellPadding: 3, lineHeight: 1.2 },
          headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
          columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 110 } },
          didDrawPage: (data) => {
            addHeader();
            addFooter();
            if (data.pageNumber > 1 && data.cursor.y < contentStartY) {
              data.cursor.y = contentStartY;
            }
          },
        });

        let closingY = (doc.lastAutoTable?.finalY || contentStartY) + 25; // Increased spacing
        if (closingY > contentEndY - minSpaceRequired) {
          doc.addPage();
          addHeader();
          addFooter();
          closingY = contentStartY;
        }

        const closingText = `We are honored to present this proposal to yourself and are confident that our premium solar solutions will deliver substantial financial benefits while advancing your sustainability goals.\n\nShould you have any questions or require further clarification, our team is ready to assist you at every step.\n\nWe look forward to the opportunity to work together and make this transformative investment a reality.\n\nRegards,\nSolar Radian - a unit of SM Enterprises\nEmpowering India with Solar Energy Solutions\nPhone: +91-9220337642`;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(33, 37, 41);
        const wrappedClosing = doc.splitTextToSize(closingText.trim(), pageWidth - leftMargin * 2);
        doc.text(wrappedClosing, leftMargin, closingY);
      };

      addCoverPage();
      addTechnicalDetailsPage();
      addOfferDetailsPage();
      addDelhiPolicyPage();
      addGBIandROIPage();
      addPaymentSchedulesPage();
      addNotesAndTermsPage();

      doc.save(`Solar_Radian_quotation_${name}.pdf`);
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
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="">Select State</option>
                <option value="Delhi">Delhi</option>
                <option value="UP">Utter Pradesh</option>

              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quote For *</label>
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
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">System Type *</label>
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Solar Capacity (kW) *</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                max="1000"
                required
                placeholder="eg. 22"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rate per KW (₹) *</label>
              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                min="1"
                max="1000000"
                required
                placeholder="eg. 561684"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">State Subsidy *</label>
              <select
                name="statesubsidy"
                value={formData.statesubsidy}
                onChange={handleChange}
                disabled={formData.quoteFor === "COMMERCIAL" || formData.systemType === "Off-Grid" || formData.state === "UP"}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:opacity-50"
              >
                <option value="">Select State Subsidy</option>
                <option value="Yes">Yes - Include Subsidy</option>
                <option value="No">No - Without Subsidy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Central Subsidy *</label>
              <select
                name="centralsubsidy"
                value={formData.centralsubsidy}
                onChange={handleChange}
                disabled={formData.quoteFor === "COMMERCIAL" || formData.systemType === "Off-Grid" || formData.state === "UP"}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:opacity-50"
              >
                <option value="">Select Central Subsidy</option>
                <option value="Yes">Yes - Include Subsidy</option>
                <option value="No">No - Without Subsidy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Maintenance Period *</label>
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tata Kit Required</label>
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Battery</label>
              <select
                name="battery"
                value={formData.battery}
                onChange={handleChange}
                disabled={formData.systemType === "On-Grid"}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:opacity-50"
              >
                <option value="">Select Option</option>
                <option value="VRLA">VRLA</option>
                <option value="Li-Ion">Li-Ion</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Battery Backup Time</label>
              <select
                name="hour"
                value={formData.hour}
                onChange={handleChange}
                disabled={formData.systemType === "On-Grid"}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:opacity-50"
              >
                <option value="">Select Option</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} hour</option>
                ))}
              </select>
            </div>
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
      <div style={{ display: "none" }}>
        <img id="logo" src={logo} alt="Logo" />
        <img id="solarimg" src={solar} alt="Solar" />
        <img id="offgridsolar" src={offgrid} alt="Offgrid Solar" />
        <img id="hybrid" src={hybrid} alt="Hybrid" />
      </div>
    </div>
  );
};

export default QuotationGenerator;