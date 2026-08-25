import React from "react"
import { NavLink } from "react-router-dom"
import { navLinks } from "@/constants/navLinks"
import { useTranslation } from "react-i18next"

export default function Navlink({ mobile = false }) {

  const { t } = useTranslation("navLinks");

  return (
    <ul
      className={`
        ${mobile
          ? "stack w-full items-start gap-1"
          : "flex gap-6"
        }
      `}
    >
      {navLinks.map((link) => {
        const Icon = link.icon

        return (
          <li key={link.key} className={`${mobile ? "w-full" : ""}`}>
            <NavLink
              to={link.path}
              end
              className={({ isActive }) =>
                `${mobile ? "sidebar-link" : "nav-link"} ${isActive ? "active" : ""
                } flex items-center gap-2`
              }
            >
              {mobile && <Icon className="size-4" />}
              {t(link.key)}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}