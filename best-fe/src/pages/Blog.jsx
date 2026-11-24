import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Search, Sparkles, Compass } from 'lucide-react';
import { PageHero, Reveal } from '../components/ui';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blogData';
import HeroBg from '../assets/opt/hero-south-india.webp';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <>
      <PageHero
        eyebrow="Madurai Best Travels"
        title="South India Travel Guides & Tips"
        intro="Authentic travel insights, route distances, temple guides, and road trip advice curated by our local travel experts in Madurai."
        image={HeroBg}
        crumbs={['Travel Guides']}
      />

      <section className="py-12 sm:py-16 bg-sand-50">
        <div className="container-x">
          {/* Featured Article Banner */}
          {featuredPost && (
            <div className="mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-gold-500" /> Featured Travel Guide
              </span>
              <div className="grid lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[16/10] bg-sand-100">
                  <img
                    src={featuredPost.heroImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-forest-50 text-forest-700 text-xs font-bold rounded-full mb-3">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-950 mb-3 hover:text-forest-700 transition-colors">
                      <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h2>
                    <p className="text-ink-700 text-sm sm:text-base leading-relaxed mb-4">
                      {featuredPost.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-sand-200 text-xs text-ink-600">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-forest-600" /> {featuredPost.readTime}
                    </span>
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="btn btn-primary !min-h-9 !text-xs font-bold flex items-center gap-1.5"
                    >
                      Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-sand-200">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-forest-800 text-white'
                      : 'bg-white text-ink-700 border border-sand-200 hover:bg-sand-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search travel guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full text-xs border border-sand-200 bg-white focus:outline-none focus:border-forest-600 text-ink-900"
              />
            </div>
          </div>

          {/* Grid of Articles */}
          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, idx) => (
                <Reveal key={post.id} delay={idx * 0.05} className="flex">
                  <article className="flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-sand-200 shadow-sm hover:shadow-lg hover:border-forest-400 transition-all w-full">
                    <div>
                      <Link to={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-sand-100">
                        <img
                          src={post.heroImage}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </Link>
                      <div className="p-6">
                        <div className="flex items-center justify-between text-xs text-ink-500 mb-2.5">
                          <span className="font-bold text-forest-700 bg-forest-50 px-2.5 py-0.5 rounded-full">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-bold text-ink-950 text-lg leading-snug hover:text-forest-700 transition-colors">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="mt-3 text-xs sm:text-sm text-ink-600 line-clamp-3 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>
                    <div className="p-6 pt-0 mt-auto">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-800 hover:text-forest-600 pt-3 border-t border-sand-100 w-full"
                      >
                        Read Travel Guide <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-sand-200">
              <Compass className="w-12 h-12 text-forest-600 mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-ink-900">No travel guides found</h3>
              <p className="text-sm text-ink-600 mt-1">Try searching for a different destination or keyword.</p>
              <button
                type="button"
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 btn btn-primary !min-h-9 !text-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;