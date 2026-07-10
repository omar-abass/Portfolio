import { SITE_CONFIG } from '@utils/constants';
import { cn } from '@lib/cn';

export interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps)=> {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('relative border-t border-white/5 bg-neural-deep', className)}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-neutral-400">
            &copy; {currentYear} {SITE_CONFIG.author}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-500">Designed & Built with AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
