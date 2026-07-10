import { cn } from '@lib/cn';

export interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps)=> {
  return (
    <footer className={cn('relative border-t border-white/5 bg-neural-deep', className)}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-center">
          <p className="text-base font-semibold tracking-[0.1em] text-white drop-shadow-[0_0_18px_rgba(56,189,248,0.18)]">
            Omar Abass Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
