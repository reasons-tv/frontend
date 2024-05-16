function Footer() {
    return (
        <footer style={{ float: 'right', 'marginRight': '5%' }}>
            <small>
                &copy; {new Date().getFullYear()} {' - '}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://reasons.tv/"
                >
                    reasons.tv
                </a>
            </small>
        </footer>
    );
}

export default Footer;
