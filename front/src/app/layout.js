export const metadata = {
    title: "Session demo",
    description: "This is a session demo",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
