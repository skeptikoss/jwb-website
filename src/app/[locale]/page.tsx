import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-navy py-24 text-cream">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Welcome to the Jewish Community of Singapore
              </h1>
              <p className="mt-6 font-body text-lg text-cream/80 sm:text-xl">
                A warm haven for Jewish residents and visitors in the heart of
                Southeast Asia. Discover our rich heritage, join our vibrant
                community, and experience authentic Jewish life in Singapore.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-gold text-charcoal hover:bg-gold/90"
                >
                  <Link href="/events">
                    Upcoming Events
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-cream text-cream hover:bg-cream/10"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Cards */}
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Shabbat Times Card */}
              <Card className="border-t-[3px] border-t-gold bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg text-navy">
                    Shabbat Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 font-body text-sm text-charcoal">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gold" />
                      <span>Candle Lighting: 6:58 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gold" />
                      <span>Havdalah: 7:53 PM</span>
                    </div>
                  </div>
                  <Link
                    href="/services"
                    className="mt-4 inline-flex items-center font-ui text-sm font-medium text-navy hover:text-gold"
                  >
                    View Service Times
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Events Card */}
              <Card className="border-t-[3px] border-t-gold bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg text-navy">
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 font-body text-sm text-charcoal">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gold" />
                      <span>Shabbat Dinner</span>
                    </div>
                    <p className="text-warm-gray">Friday, Jan 10 - 7:00 PM</p>
                  </div>
                  <Link
                    href="/events"
                    className="mt-4 inline-flex items-center font-ui text-sm font-medium text-navy hover:text-gold"
                  >
                    All Events
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Shop Card */}
              <Card className="border-t-[3px] border-t-gold bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg text-navy">
                    Kosher Shop
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-sm text-charcoal">
                    Fresh kosher groceries, baked goods, wine, and Judaica items
                    available online.
                  </p>
                  <Link
                    href="/shop"
                    className="mt-4 inline-flex items-center font-ui text-sm font-medium text-navy hover:text-gold"
                  >
                    Browse Shop
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>

              {/* Donate Card */}
              <Card className="border-t-[3px] border-t-gold bg-white shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg text-navy">
                    Support Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-sm text-charcoal">
                    Help us maintain our synagogues and support community
                    programs.
                  </p>
                  <Link
                    href="/donate"
                    className="mt-4 inline-flex items-center font-ui text-sm font-medium text-navy hover:text-gold"
                  >
                    Make a Donation
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Synagogues Section */}
        <section className="bg-off-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
                Our Historic Synagogues
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-warm-gray">
                Two beautifully preserved synagogues in the heart of Singapore,
                each with their own unique character and history.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {/* Maghain Aboth */}
              <Card className="overflow-hidden bg-white shadow-sm">
                <div className="aspect-video bg-warm-gray/20">
                  {/* Placeholder for synagogue image */}
                  <div className="flex h-full items-center justify-center">
                    <span className="font-ui text-sm text-warm-gray">
                      Synagogue Image
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <Badge className="bg-sage text-white">Est. 1878</Badge>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-navy">
                    Maghain Aboth
                  </h3>
                  <p className="mt-2 font-body text-warm-gray">
                    &ldquo;Shield of our Fathers&rdquo; - Singapore&apos;s oldest
                    synagogue, built in the Baghdadi tradition.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-charcoal">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span>24 Waterloo Street</span>
                  </div>
                  <Button asChild className="mt-4 bg-navy text-cream">
                    <Link href="/synagogues/maghain-aboth">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Chesed El */}
              <Card className="overflow-hidden bg-white shadow-sm">
                <div className="aspect-video bg-warm-gray/20">
                  {/* Placeholder for synagogue image */}
                  <div className="flex h-full items-center justify-center">
                    <span className="font-ui text-sm text-warm-gray">
                      Synagogue Image
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <Badge className="bg-sage text-white">Est. 1905</Badge>
                  <h3 className="mt-3 font-heading text-2xl font-semibold text-navy">
                    Chesed El
                  </h3>
                  <p className="mt-2 font-body text-warm-gray">
                    &ldquo;God&apos;s Mercy&rdquo; - A grand synagogue known for
                    its impressive architecture.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-charcoal">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span>2 Oxley Rise</span>
                  </div>
                  <Button asChild className="mt-4 bg-navy text-cream">
                    <Link href="/synagogues/chesed-el">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gold py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-charcoal">
              Join Our Community
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-charcoal/80">
              Whether you&apos;re a Singapore resident or just visiting, we
              welcome you to join us for Shabbat services, community meals, and
              special events.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-navy text-cream hover:bg-navy/90"
              >
                <Link href="/events">RSVP for Shabbat</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-navy text-navy hover:bg-navy hover:text-cream"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
