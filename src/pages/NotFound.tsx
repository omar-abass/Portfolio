import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@utils/routes';
import { Button } from '@components/common/Button';

export interface NotFoundProps {
  className?: string;
}

const NotFound = ({ className }: NotFoundProps)=> {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center justify-center ${className || ''}`}
    >
      <div className="text-center">
        <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neural-glow to-accent-400 mb-4">
          404
        </h1>
        <p className="text-xl text-neutral-400 mb-8">Page not found. The AI could not locate this resource.</p>
        <Link to={ROUTES.HOME}>
          <Button variant="primary" size="lg">
            Return Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
