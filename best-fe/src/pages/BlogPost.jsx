import { useParams, Link, Navigate } from 'react-router-dom';
import { Phone, MessageCircle, Clock, Calendar, ArrowRight, ChevronRight, Compass, Car } from 'lucide-react';
import { CtaBand } from '../components/ui';
import { BLOG_POSTS } from '../data/blogData';
import { SITE, POPULAR_ROUTES } from '../data/site';
import { useBooking } from '../context/BookingContext';

const BlogPost = () => {
  const { slug } = useParams();
  const { openBooking } = useBooking();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id && (p.category === post.category || true)).slice(0, 3);
  const articleUrl = `https://www.maduraibesttravels.in/blog/${post.slug}`;

  // Structured Data Schema for BlogPosting and BreadcrumbList
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: `https://www.maduraibesttravels.in${post.heroImage}`,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: {
      '@type': 'Organization',
      name: 'Madurai Best Travels',
      url: 'https://www.maduraibesttravels.in/'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Madurai Best Travels',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.maduraibesttravels.in/logo.jpeg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.maduraibesttravels.in/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Travel Guides',
        item: 'https://www.maduraibesttravels.in/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: articleUrl
      }
    ]
  };

  return (
    <>
      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* FAQ Schema if present */}
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a }
              }))
            })
          }}
        />
      )}

      {/* Page Hero with Breadcrumb */}
      <section className="relative isolate overflow-hidden bg-forest-800 text-white py-14 sm:py-20">
        {post.heroImage && (
          <img
            src={post.heroImage}
            alt={post.title}
            className="absolute inset-0 -z-10 w-full h-full object-cover opacity-35 mix-blend-luminosity"
            fetchPriority="high"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-800/40" />

        <div className="container-x">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-forest-100">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden />
                <Link to="/blog" className="hover:text-white">Travel Guides</Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden />
                <span className="text-white font-semibold truncate max-w-xs">{post.title}</span>
              </li>
            </ol>
          </nav>

          <span className="inline-block px-3 py-1 bg-gold-400 text-forest-950 text-xs font-extrabold rounded-full mb-3">
            {post.category}
          </span>
          <h1 className="h-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-4xl leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs sm:text-sm text-forest-100/90">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold-300" /> {post.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gold-300" /> {post.readTime}
            </span>
            <span>•</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-12 sm:py-16 bg-sand-50">
        <div className="container-x grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
          <article className="max-w-3xl">
            {/* Summary Box */}
            <div className="p-6 rounded-2xl bg-forest-50 border border-forest-200 text-forest-950 mb-8 leading-relaxed font-medium text-sm sm:text-base">
              {post.summary}
            </div>

            {/* Main Body */}
            <div
              className="prose-site"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* FAQs Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12 pt-10 border-t border-sand-200">
                <h2 className="h-display text-2xl sm:text-3xl text-ink-950 mb-5">Frequently Asked Questions</h2>
                <div className="divide-y divide-sand-200 border-y border-sand-200">
                  {post.faqs.map((faq, idx) => (
                    <div key={idx} className="py-4">
                      <h3 className="font-bold text-ink-950 text-base mb-1.5">{faq.q}</h3>
                      <p className="text-sm text-ink-700 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Attribution Card */}
            <div className="mt-12 p-6 rounded-2xl bg-white border border-sand-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center font-bold text-lg shrink-0">
                MB
              </div>
              <div>
                <h4 className="font-bold text-ink-950 text-sm">{post.author}</h4>
                <p className="text-xs text-ink-600 mt-0.5">
                  Local travel experts and chauffeur coordinators at Madurai Best Travels, serving South India travellers since 2015.
                </p>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-6">
            {/* Quick Booking Card */}
            <div className="card !bg-forest-800 !border-forest-700 text-white p-6 shadow-xl">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-300">Fast Reservation</span>
              <h3 className="h-display text-2xl mt-1">Book Your Cab Today</h3>
              <p className="text-forest-100 text-xs sm:text-sm mt-1.5">
                Planning this trip? Book comfortable AC sedans, Innova Crysta, or Tempo Travellers at transparent rates.
              </p>
              <button
                type="button"
                onClick={() => openBooking({ destination: post.category })}
                className="btn btn-primary w-full mt-5"
              >
                Book Cab Now <ArrowRight className="w-4 h-4" />
              </button>
              <a href={SITE.whatsappHref} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full mt-2.5">
                <MessageCircle className="w-4 h-4" /> WhatsApp Enquiry
              </a>
              <a href={SITE.phoneHref} className="btn btn-ghost-light w-full mt-2.5">
                <Phone className="w-4 h-4" /> Call {SITE.phoneDisplay}
              </a>
            </div>

            {/* Related Travel Guides */}
            <div className="card p-6">
              <h3 className="font-bold text-ink-900 flex items-center gap-2 text-sm sm:text-base">
                <Compass className="w-4 h-4 text-forest-700" /> Related Travel Guides
              </h3>
              <ul className="mt-3 space-y-3">
                {relatedPosts.map((r) => (
                  <li key={r.id}>
                    <Link
                      to={`/blog/${r.slug}`}
                      className="group block text-xs sm:text-sm font-semibold text-ink-800 hover:text-forest-700 leading-snug"
                    >
                      {r.title}
                      <span className="block text-[11px] text-ink-500 font-normal mt-0.5">{r.readTime}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-sand-200">
                <Link to="/blog" className="text-xs font-bold text-forest-700 hover:underline flex items-center gap-1">
                  View All Guides &rarr;
                </Link>
              </div>
            </div>

            {/* Popular Route Links */}
            <div className="card p-6">
              <h3 className="font-bold text-ink-900 text-sm sm:text-base flex items-center gap-2">
                <Car className="w-4 h-4 text-forest-700" /> Popular Taxi Routes
              </h3>
              <ul className="mt-3 space-y-1">
                {POPULAR_ROUTES.slice(0, 6).map((r) => (
                  <li key={r.path}>
                    <Link to={r.path} className="flex items-center justify-between py-1.5 text-xs text-ink-700 hover:text-forest-600">
                      <span>{r.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-60" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand preset={{ destination: post.category }} />
    </>
  );
};

export default BlogPost;