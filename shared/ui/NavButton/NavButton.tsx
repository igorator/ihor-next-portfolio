import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import styles from "./NavButton.module.css";

type NavButtonVariant = "previous" | "next" | "close";

type Props = {
  variant: NavButtonVariant;
  ariaLabel: string;
  onClick: (e: React.MouseEvent) => void;
  onPointerDown?: (e: React.PointerEvent) => void;
  className?: string;
};

const icons = {
  previous: BsArrowLeft,
  next: BsArrowRight,
  close: MdClose,
};

export const NavButton = ({
  variant,
  ariaLabel,
  onClick,
  onPointerDown,
  className,
}: Props) => {
  const Icon = icons[variant];
  return (
    <button
      type="button"
      className={`${styles.navButton}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerDown={onPointerDown}
    >
      <Icon size={16} />
    </button>
  );
};
