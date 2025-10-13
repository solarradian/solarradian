
import { createBrowserRouter } from "react-router-dom";
import App from './../App';
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Service";
import Contact from "../pages/Contact";
import RooftopSolar from "../pages/RooftopSolar";
import Partner from "../pages/Partner";
import ReferAndEarn from "../pages/ReferAndEarn";
import PmsuryaGhar from "../pages/PmsurayGhar";
import PagenotFound from "../pages/PagenotFound"
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from './../pages/ForgotPassword';
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from './../pages/ResetPassword';
import Dashboard from './../layout/Dashboard';
import Profile from './../pages/Profile';
import Address from "../pages/Address";
import AdminPermision from './../layout/AdminPermision';
// import EmployeePermision from './../layout/EmployeePermision';
 import Bothpermision from './../layout/Bothpermision';
import CreateProject from "../pages/CreateProject";
import GetProjects from "../pages/GetProjects";
import QuotationGenerator from "../pages/QuotationGenerator";
import Faq from "../pages/Faq";
import SolarCalculator from "../pages/SolarCalculator";
import Team from "../pages/Team";
import FreeQuote from "../pages/FreeQuote";
import BlogPage from "../pages/BlogPage/BlogPage";
import SolarinDelhi from "../statepages/SolarinDelhi";
import SolarinNoida from "../statepages/SolarinNoida";
import WhySolar from "../pages/WhySolar";
import DelhiSolarPolicy from "../pages/DelhiSolarPolicy";
import UpSolarPolicy from "../pages/UpSolarPolicy";
import DelhiSolarRegulationAndGuidlines from "../pages/DelhiSolarRegulationAndGuidlines";
import UpSolarRegulationAndGuidlines from "../pages/UpSolarRegulationAndGuidlines";



const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children: [

            {
                path: "",
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "service",
                element: <Service />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "rooftopsolar",
                element: <RooftopSolar />
            },
            {
                path: "partner",
                element: <Partner />
            },
             {
                path: "solar-in-delhi",
                element: <SolarinDelhi/>
            },
            {
                path: "solar-in-noida",
                element: <SolarinNoida/>
            },
            {
                path: "delhi-solar-policy",
                element: <DelhiSolarPolicy/>
            },
            {
                path: "up-solar-policy",
                element: <UpSolarPolicy/>
            },
            {
                path: "delhi-solar-guidelines",
                element: <DelhiSolarRegulationAndGuidlines/>
            },
            {
                path: "up-solar-guidelines",
                element: <UpSolarRegulationAndGuidlines/>
            },
            {
                path: "faq",
                element: <Faq/>
            },
            {
                path: "solar-calculator",
                element: <SolarCalculator/>
            },
              {
                path: "team",
                element: <Team/>
            },
            {
                path: "freequote",
                element: <FreeQuote/>
            },
            {
                path: "referandearn",
                element: <ReferAndEarn />
            },
             {
                path: "whysolar",
                element: <WhySolar/>
            },
            {
                path: "pmsurayghar",
                element: <PmsuryaGhar />
            },
            {
                path: "blog/*",
                element: <BlogPage />
            },
            {
                path: "*",
                element: <PagenotFound/>
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element:  <Register /> 
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "otp-verification",
                element: <OtpVerification />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
             {
                path: "dashboard",
                element:  <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />,

                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    ,
                    {
                        path: "register",
                        element: <AdminPermision><Register /></AdminPermision>
                    }
                    ,
                    {
                        path: "create-project",
                        element:  <AdminPermision> <CreateProject /> </AdminPermision>
                    },
                    {
                        path: "get-project",
                        element:  <GetProjects/>
                    },
                    {
                        path: "quotationgenerator",
                        element:  <Bothpermision> <QuotationGenerator/> </Bothpermision>
                    }

                ]
            },
        ]
    }
])


export default router;