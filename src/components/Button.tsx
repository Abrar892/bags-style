'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'gold' | 'rose' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
    href?: string;
    external?: boolean;
    fullWidth?: boolean;
}

export default function Button({
    variant = 'gold',
    size = 'md',
    children,
    href,
    external = false,
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles =
        'inline-flex items-center justify-center rounded-full font-inter font-medium tracking-wider transition-all duration-300 ease-in-out cursor-pointer select-none';

    const sizeStyles = {
        sm: 'px-5 py-2 text-xs',
        md: 'px-8 py-3 text-sm',
        lg: 'px-10 py-4 text-sm',
    };

    const variantStyles = {
        gold: 'btn-gold text-white',
        rose: 'btn-rose text-white',
        ghost: 'bg-white/40 backdrop-blur-sm border border-rose-200 text-charcoal hover:bg-white/70',
        outline:
            'border-2 border-amber-gold text-amber-gold hover:bg-amber-gold hover:text-white bg-transparent',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthClass} ${className}`;

    const content = (
        <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={combinedStyles}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
            {children}
        </motion.span>
    );

    if (href) {
        if (external) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className={widthClass}>
                    {content}
                </a>
            );
        }
        return (
            <Link href={href} className={widthClass}>
                {content}
            </Link>
        );
    }

    return (
        <button {...props} className={widthClass}>
            {content}
        </button>
    );
}
