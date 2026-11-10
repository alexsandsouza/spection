import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"SPECTION | AI-Guided Software Engineering",description:"Build verified software with specifications and responsible AI."};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
