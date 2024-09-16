import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./SideNav.scss";
import hspLogo from "../../assets/hsp-logo.svg";
import { Avatar } from "primereact/avatar";

export default function TemplateDemo({ isPanelCollapsed }) {
  const location = useLocation();
  const isPanelActive = location.pathname.split("/")[1];

  const itemRenderer = (item) => (
    <Link
      to={item.route}
      className={`${item.route === isPanelActive ? "active" : "inactive"} link flex align-items-center w-276px h-56px p-3 cursor-pointer`}
    >
      <span className={`${item.icon} `} />
      {!isPanelCollapsed && (
        <span className={`mx-2 ${item.items && "font-semibold"}`}>
          {item.label}
        </span>
      )}
    </Link>
  );

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-envelope",
      badge: 5,
      template: itemRenderer,
      route: "dashboard",
    },
    {
      label: "Global Entities",
      icon: "pi pi-sitemap",
      shortcut: "⌘+W",
      template: itemRenderer,
      route: "global-entities",
    },
    {
      label: "Services & Projects",
      icon: "pi pi-check-circle",
      shortcut: "⌘+R",
      template: itemRenderer,
      route: "services",
    },
    {
      label: "My Entities",
      icon: "pi pi-sitemap",
      shortcut: "⌘+W",
      template: itemRenderer,
      route: "entities",
    },
    {
      label: "Settings",
      icon: "pi pi-cog",
      shortcut: "⌘+W",
      template: itemRenderer,
      route: "settings",
    },
  ];

  return (
    <>
      <div>
        {!isPanelCollapsed && (
          <div
            className={`card flex justify-content-start mb-3 ${isPanelCollapsed ? "logo-display" : ""}`}
          >
            <img alt="logo" src={hspLogo} className="mr-2"></img>
          </div>
        )}
        <div className="card flex justify-content-center">
          <PanelMenu model={items} className="w-full bg-white md:w-20rem" />
        </div>
      </div>
      {!isPanelCollapsed && (
        <div
          className={`card flex justify-content-start align-items-end ${isPanelCollapsed ? "logo-display" : ""}`}
        >
          <Avatar
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            shape="circle"
          />
          <div className="profile-container ml-3">
            <p className="profile-name mb-1"> Desirae Herwitz </p>
            <p className="profile-email"> DesiraeH@customer.com </p>
          </div>
        </div>
      )}
    </>
  );
}
