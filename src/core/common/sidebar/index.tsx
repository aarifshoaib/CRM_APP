import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import { SidebarData } from "../../data/json/sidebarData";
import ImageWithBasePath from "../imageWithBasePath";
import { useDispatch, useSelector } from "react-redux";
import { setExpandMenu } from "../../data/redux/commonSlice";

const Sidebar = () => {
  const Location = useLocation();
  const expandMenu = useSelector((state: any) => state.expandMenu);
  const dispatch = useDispatch();

  const [subOpen, setSubopen] = useState<any>('');
  const [subsidebar, setSubsidebar] = useState("");

  const toggleSidebar = (title: any) => {
    localStorage.setItem('menuOpened', title)
    if (title === subOpen) {
      setSubopen("");
    } else {
      setSubopen(title);
    }
  };

  const toggleSubsidebar = (subitem: any) => {
    if (subitem === subsidebar) {
      setSubsidebar("");
    } else {
      setSubsidebar(subitem);
    }
  };
  const toggle = () => {
    dispatch(setExpandMenu(true));
  };
  const toggle2 = () => {
    dispatch(setExpandMenu(false));
  };
 
  useEffect(() => {
    setSubopen(localStorage.getItem('menuOpened'))
    // Select all 'submenu' elements
    const submenus = document.querySelectorAll('.submenu')
    // Loop through each 'submenu'
    submenus.forEach((submenu) => {
      // Find all 'li' elements within the 'submenu'
      const listItems = submenu.querySelectorAll('li')
      submenu.classList.remove('active')
      // Check if any 'li' has the 'active' class
      listItems.forEach((item) => {
        if (item.classList.contains('active')) {
          // Add 'active' class to the 'submenu'
          submenu.classList.add('active')
          return
        }
      })
    })
    
  }, [Location.pathname])
 
  return (
    <>
      <div
        className="sidebar"
        id="sidebar"
        onMouseEnter={toggle}
        onMouseLeave={toggle2}
      >
        <Scrollbars>
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="clinicdropdown theme">
                  <Link to="/profile">
                    <ImageWithBasePath
                      src="assets/img/profiles/avatar-02.jpg"
                      className="img-fluid"
                      alt="Profile"
                    />
                    <div className="user-names">
                      <h5>Adrian Davies</h5>
                      <h6>Tech Lead</h6>
                    </div>
                  </Link>
                </li>
              </ul>

              <ul>
                {SidebarData?.map((mainLabel, index) => (
                  <li className="clinicdropdown" key={index}>
                    <h6 className="submenu-hdr">{mainLabel?.label}</h6>
                    <ul>
                      {mainLabel?.submenuItems?.map((title: any, i) => {
                        let link_array: any = [];
                        if ("submenuItems" in title) {
                          title.submenuItems?.forEach((link: any) => {
                            link_array.push(link?.link);
                            if (link?.submenu && "submenuItems" in link) {
                              link.submenuItems?.forEach((item: any) => {
                                link_array.push(item?.link);
                              });
                            }
                          });
                        }
                        title.links = link_array;

                        return (
                          <li className="submenu" key={title.label}>
                            <Link
                              to={title?.submenu ? "#" : title?.link}
                              onClick={() => toggleSidebar(title?.label)}
                              className={`${
                                subOpen === title?.label ? "subdrop" : ""
                              } ${
                                title?.links?.includes(Location.pathname)
                                  ? "active"
                                  : ""
                              } ${
                                title?.submenuItems
                                        ?.map((link: any) => link?.link)
                                        .includes(Location.pathname) ||
                                        title?.link === Location.pathname
                                        ? "active"
                                        : "" || 
                                        title?.subLink1 === Location.pathname
                                        ? "active"
                                        : "" || 
                                        title?.subLink2 === Location.pathname
                                        ? "active"
                                        : "" || 
                                        title?.subLink3 === Location.pathname
                                        ? "active"
                                        : "" || 
                                        title?.subLink4 === Location.pathname
                                        ? "active"
                                        : ""
                              }`}
                            >
                              <i className={title.icon}></i>
                              <span>{title?.label}</span>
                              <span
                                className={title?.submenu ? "menu-arrow" : ""}
                              />
                            </Link>
                            <ul
                              style={{
                                display:
                                  subOpen === title?.label ? "block" : "none",
                              }}
                            >
                              {title?.submenuItems?.map((item: any) => (
                                <li
                                  className="submenu submenu-two"
                                  key={item.label}
                                >
                                  <Link
                                    to={item?.link}
                                    className={
                                      `${item?.submenuItems
                                        ?.map((link: any) => link?.link)
                                        .includes(Location.pathname) ||
                                      item?.link === Location.pathname
                                        ? "active subdrop"
                                        : ""} `
                                    }
                                    onClick={() => {
                                      toggleSubsidebar(item?.label);
                                    }}
                                  >
                                    {item?.label}
                                    <span
                                      className={
                                        item?.submenu ? "menu-arrow" : ""
                                      }
                                    />
                                  </Link>
                                  <ul
                                    style={{
                                      display:
                                        subsidebar === item?.label
                                          ? "block"
                                          : "none",
                                    }}
                                  >
                                    {item?.submenuItems?.map(
                                      (items: any) => (
                                        <li key={items.label}>
                                          <Link
                                            to={items?.link}
                                            className={`${
                                              subsidebar === items?.label
                                                ? "submenu-two subdrop"
                                                : "submenu-two"
                                            } ${
                                              items?.submenuItems
                                                ?.map((link: any) => link.link)
                                                .includes(Location.pathname) ||
                                              items?.link === Location.pathname
                                                ? "active"
                                                : ""
                                            }`}
                                          >
                                            {items?.label}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};

export default Sidebar;
