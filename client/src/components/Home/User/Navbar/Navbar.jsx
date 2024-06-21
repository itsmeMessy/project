import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { MdOutlineSpaceDashboard, MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaChalkboardUser, FaCircle } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";

const panels = [
  {
    id: "Dashboard",
    icon: MdOutlineSpaceDashboard,
    name: "Browse Books",
    subpanels: ["All Books", "Available", "Unavailable"],
    links: ["/allbooks", "/available", "/unavailable"],
  },
  {
    id: "Profile",
    icon: CgProfile,
    name: "Profile",
    subpanels: ["Edit Profile", "Books", "History"],
    links: ["/editprofile", "/mybooks", "/history"],
  },
  {
    id: "Comments",
    icon: FaChalkboardUser,
    name: "Account Management",
    subpanels: ["Borrowed Books", "Renew Books", "Return Books"],
    links: ["/borrowedbooks", "/renewbooks", "/returnbooks"],
  },
];

function Navbar() {
  const location = useLocation();
  const [activePanel, setActivePanel] = useState(null);
  const [activeSubpanels, setActiveSubpanels] = useState({});
  const [id, setID] = useState("2020-00292-LQ-0");

  useEffect(() => {
    panels.forEach((panel) => {
      panel.links.forEach((link, index) => {
        if (location.pathname === link) {
          setActivePanel(panel.id);
          setActiveSubpanels((prev) => ({
            ...prev,
            [panel.id]: panel.subpanels[index],
          }));
        }
      });
    });
  }, [location.pathname]);

  const handleClick = (panelId) => {
    setActivePanel(panelId);
  };

  const handleSubpanelClick = (panelId, subpanel) => {
    setActiveSubpanels({
      ...activeSubpanels,
      [panelId]: subpanel,
    });
  };

  const isSubpanelActive = (panelId, subpanel) => {
    return activeSubpanels[panelId] === subpanel;
  };

  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60 border-none drop-shadow-2xl peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-3xl text-center cursor-pointer font-bold text-orange-400 border-b border-gray-100 pb-4 w-full">
              Epahiram
            </h1>
            <div className="my-4 border-b border-gray-100 pb-4">
              {panels.map((panel) => (
                <div
                  key={panel.id}
                  className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                    activePanel === panel.id ? "bg-orange-500 text-white" : ""
                  }`}
                  onClick={() => handleClick(panel.id)}
                >
                  <panel.icon className="text-2xl text-gray-600" />
                  <h3 className="text-base font-semibold">{panel.name}</h3>
                </div>
              ))}
            </div>

            {panels.map((panel) => (
              <div
                key={`${panel.id}-subpanels`}
                className={`${activePanel === panel.id ? "block" : "hidden"}`}
              >
                {panel.subpanels.map((subpanel, index) => (
                  <Link
                    to={panel.links[index]}
                    key={`${panel.id}-${subpanel}`}
                    className={`flex mb-2 justify-start items-center gap-4 pl-10 p-2 rounded-md group cursor-pointer hover:bg-gray-200 ${
                      isSubpanelActive(panel.id, subpanel) ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleSubpanelClick(panel.id, subpanel)}
                  >
                    <span className="text-lg text-gray-600">
                      <FaCircle />
                    </span>
                    <h3 className="text-base font-semibold">{subpanel}</h3>
                  </Link>
                ))}
              </div>
            ))}

            <div className="mt-auto my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 p-2">
                <span className="flex items-center text-s font-semibold text-orange-500">
                  <PiStudentFill className="mr-2" />
                  {id}
                </span>
              </div>

              <div className="flex mb-2 items-center gap-4 pl-9 border border-gray-200 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-3xl text-gray-600" />
                <h3 className="text-base font-semibold">Logout</h3>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default Navbar;
