import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/report" className="site-title">
                Glassdoor Analysis
            </Link>
            <ul>
                <CustomLink to="/report">Report</CustomLink>
                <CustomLink to="/data">Data</CustomLink>
            </ul>
        </nav>
    );
}
