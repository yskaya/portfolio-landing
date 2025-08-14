import "./globals.css";
import { DataProvider } from "./context/DataContext";
import { NavProvider } from "./components/Nav/NavContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <NavProvider>{children}</NavProvider>
        </DataProvider>
      </body>
    </html>
  );
}
