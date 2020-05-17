/** @jsx jsx */
import { jsx, Link as ThemeLink } from "theme-ui"
import { Link as GatsbyLink } from "gatsby"

const Link = props => <ThemeLink as={GatsbyLink} {...props} />

export default Link
