import React from "react"
import { Link } from "react-router-dom"
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
            <Link
              to={link.path}
              className={`${mobile ? "sidebar-link" : "nav-link"} flex items-center gap-2`}
            >
              {mobile && <Icon className="size-4" />}
              {t(link.key)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}