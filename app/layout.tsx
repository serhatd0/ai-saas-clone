import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { ModalProvider } from '@/components/modal-provider'
import { ToasterProvider } from '@/components/toaster-provider'
import { CrispProvider } from '@/components/crisp-provider'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider/>
        <body>
          <ModalProvider/>
          <ToasterProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}