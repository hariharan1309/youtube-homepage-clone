type ButtonProps = {
    type?: "icon" | "default";
    vari?: "default" | "ghost" | "dark";
    children?: React.ReactNode; // Include children prop
    isSubmitting?: boolean;
    className?: string;
}

export default function Button({ type='default', vari="default",children,isSubmitting=false,className='' }: ButtonProps) {
    const variant={
        default: 'bg-secondary hover:bg-secondary-hover',
        ghost: 'hover:bg-gray-100',
        dark: 'bg-secondary-dark hover:bg-secondary-darker text-secondary'
    }
    const types={
        icon: 'rounded-full w-10 h-10 flex items-center justify-center p-2.5',
        default: 'rounded p-2'
    }
    // const btnStyle = type === 'icon' ? 'rounded-full w-10 h-10 flex items-center justify-center p-2.5' : 'rounded p-2';
    const buttonType = isSubmitting ? 'submit' : 'button';
    return (
        <button className={`${types[type]} ${variant[vari]} ${className}`} type={buttonType}>
            {children}
        </button>
    );
}
