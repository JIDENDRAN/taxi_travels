import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '../components/ui';
import Hero from '../assets/opt/kanyakumari.webp';

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Page not found"
      title="This road doesn't lead anywhere."
      intro="The page you were looking for may have moved. Let's get you back on route."
      image={Hero}
    >
      <div className="flex flex-wrap gap-3 mt-8">
        <Link to="/" className="btn btn-primary">Back to home <ArrowRight className="w-4 h-4" /></Link>
        <Link to="/packages" className="btn btn-ghost-light">See tour packages</Link>
      </div>
    </PageHero>
  );
}
