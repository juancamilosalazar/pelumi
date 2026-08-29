import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import CartDrawer from "@/components/cart/CartDrawer";
import PageViewTracker from "@/components/track/PageViewTracker";
import { CartProvider } from "@/lib/cart";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <PageViewTracker />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
      <CartDrawer />
    </CartProvider>
  );
}
