/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
import Link from "./Link"
import PropTypes from "prop-types"

const Header = ({ siteTitle }) => (
  <header
    sx={{
      bg: "primary",
      marginBottom: "1.45rem",
    }}
  >
    <div
      sx={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "1.45rem 1.0875rem",
      }}
    >
      <Heading as="h1" margin={0}>
        <Link
          to="/"
          sx={{
            color: "white",
            textDecoration: "none",
          }}
        >
          {siteTitle}
        </Link>
      </Heading>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: "",
}

export default Header
